import { useEffect, useState } from "react";
import moment from "moment";
import get from "lodash/get";
import { WeatherData, DailyWeather } from "./types";
import {
  getWeatherData,
  weatherIcon,
  getLocationData,
  storeLocation,
  getLocation,
} from "./weatherAPI";
import { IconRefresh } from "@tabler/icons-react";

export function Weather() {
  const [location, setLocation] = useState(getLocation().name);
  const [currentWeather, setCurrentWeather] = useState<WeatherData>(
    {} as WeatherData
  );
  const [dailyWeather, setDailyWeather] = useState<DailyWeather[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const res = await getWeatherData(lat, lon, "minutely,hourly");
      setDailyWeather(get(res, "daily", []));
      setCurrentWeather(res);
    } catch (err) {
      console.error(err);
      // Add error notification
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPosition = () => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    });
  };

  useEffect(() => {
    const initLocation = async () => {
      try {
        setLoading(true);
        const position = await getCurrentPosition();
        const { latitude: lat, longitude: lon } = position.coords;
        storeLocation({ name: "Current Location", lat, lon });
        await fetchWeatherData(lat, lon);
      } catch (error) {
        console.error("Failed to get location:", error);
        // If location access fails, use stored location or default
        const { lat, lon } = getLocation();
        await fetchWeatherData(lat, lon);
      } finally {
        setLoading(false);
      }
    };

    initLocation();
  }, []);

  const handleRefresh = () => {
    const { lat, lon } = getLocation();
    fetchWeatherData(lat, lon);
  };

  const handleLocationChange = async () => {
    if (!location) {
      // 添加错误提示
      return;
    }

    try {
      setLoading(true);
      const res = await getLocationData(location);
      const data = res[0];
      if (data) {
        const { lat, lon } = data;
        await fetchWeatherData(lat, lon);
        storeLocation({ name: location, lat, lon });
      }
    } catch (err) {
      console.error(err);
      // 添加错误提示
    } finally {
      setLoading(false);
    }
  };

  const temp = (t: number = 0) => (isNaN(t) ? "0" : t.toFixed(1));
  const getDate = (d: DailyWeather) =>
    moment.unix(get(d, "dt", 0)).format("MM/DD");
  const icon = (item: DailyWeather): keyof typeof weatherIcon =>
    get(item, "weather[0].icon", "01d") as keyof typeof weatherIcon;

  return (
    <div className="rounded-lg w-full bg-slate-50 shadow-md border-2 p-4 space-y-4 flex flex-col">
      <div className="flex flex-col">
        <div className="flex justify-between items-baseline">
          <input
            className="font-bold text-xl ml-3 cursor-text hover:bg-gray-100 focus:bg-gray-100 px-1 rounded"
            style={{ color: "#309FFB" }}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onBlur={handleLocationChange}
          />
          <IconRefresh
            className={`cursor-pointer text-gray-600 hover:text-blue-main text-lg ${
              loading ? "animate-spin" : ""
            }`}
            onClick={handleRefresh}
          />
        </div>

        <div className="flex w-full justify-between px-2">
          <div className="flex-1">
            <img
              className="w-16 h-16"
              src={
                weatherIcon[
                  get(
                    currentWeather,
                    "weather[0].icon",
                    "01d"
                  ) as keyof typeof weatherIcon
                ]
              }
              alt="weather"
            />
            <div className="text-sm text-gray-500 px-2">
              {get(currentWeather, "weather[0].description", "Unknown")}
            </div>
          </div>

          <div>
            <div className="flex items-start h-16">
              <span className="font-bold text-5xl" style={{ color: "#309FFB" }}>
                {temp(currentWeather?.main?.temp)}
              </span>
              <img
                className="w-6 h-6 inline-block"
                src={weatherIcon.Celcius}
                alt="celcius"
              />
            </div>
            <div className="text-sm text-gray-500 pl-1">
              Feels like: {temp(currentWeather?.main?.feels_like)}
              <img
                className="w-2 h-2 inline-block align-top"
                src={weatherIcon.Celcius}
                alt="celsius"
              />
            </div>
          </div>
        </div>

        {!loading ? (
          <div className="flex justify-between pt-4 pb-2 sm:text-xs text-base text-gray-500">
            <WeatherInfo
              icon={weatherIcon.Humidity}
              value={`${currentWeather?.main?.humidity ?? 0}%`}
              label="Humidity"
            />
            {/* <WeatherInfo
              icon={weatherIcon.uvi}
              value={currentWeather?.main?.uvi ?? "0"}
              label="UV Index"
            /> */}
            <WeatherInfo
              icon={weatherIcon.SunRise}
              value={
                currentWeather?.sys?.sunrise
                  ? moment.unix(currentWeather?.sys?.sunrise).format("HH:MM")
                  : "??:??"
              }
              label="Sunrise"
            />
            <WeatherInfo
              icon={weatherIcon.Sunset}
              value={
                currentWeather?.sys?.sunset
                  ? moment.unix(currentWeather?.sys?.sunset).format("HH:MM")
                  : "??:??"
              }
              label="Sunset"
            />
          </div>
        ) : null}

        {!loading ? (
          <div className="flex justify-between sm:text-xs text-base text-gray-500 flex-wrap">
            {dailyWeather.map((item) => (
              <DailyWeatherCard
                key={item.dt}
                item={item}
                temp={temp}
                getDate={getDate}
                icon={icon}
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-12 h-0 mx-4" />
            ))}
          </div>
        ) : null}

        {loading && <div className="mx-auto">Loading...</div>}
      </div>
    </div>
  );
}

function WeatherInfo({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex items-center sm:flex-row flex-col transition-all duration-200 hover:bg-gray-100 hover:shadow-md rounded-md p-1 flex-1 justify-center">
      <img
        className="sm:w-6 w-8 sm:h-6 h-8 inline-block"
        src={icon}
        alt={label}
      />
      <span className="px-1 align-middle whitespace-nowrap">
        <span className="sm:hidden text-xs text-gray-600 mr-1">{label}</span>
        {value}
      </span>
    </div>
  );
}

function DailyWeatherCard({
  item,
  temp,
  getDate,
  icon,
}: {
  item: DailyWeather;
  temp: (t: number) => string;
  getDate: (d: DailyWeather) => string;
  icon: (item: DailyWeather) => keyof typeof weatherIcon;
}) {
  return (
    <div className="flex items-center flex-col my-1 py-1 px-2 mx-2 hoverCard">
      <span className="px-2 inline-block bg-gray-100 rounded">
        {getDate(item)}
      </span>
      <img className="w-12 h-12" src={weatherIcon[icon(item)]} alt="weather" />
      <div className="w-full flex justify-center">
        <span className="inline-block w-6 text-right">
          {temp(item.temp?.max ?? 0)}
        </span>
        <img
          className="w-3 h-3 inline-block align-top ml-1"
          src={weatherIcon.Celcius}
          alt="celcius"
        />
      </div>
      <div className="w-full flex justify-center">
        <span className="inline-block w-6 text-right">
          {temp(item.temp?.min ?? 0)}
        </span>
        <img
          className="w-3 h-3 inline-block align-top ml-1"
          src={weatherIcon.Celcius}
          alt="celcius"
        />
      </div>
    </div>
  );
}
