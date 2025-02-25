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

export function Weather() {
  const [location, setLocation] = useState(getLocation().name);
  const [currentWeather, setCurrentWeather] = useState<WeatherData>(
    {} as WeatherData
  );
  const [dailyWeather, setDailyWeather] = useState<DailyWeather[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async (lat: number, lng: number) => {
    console.log("=> ~ fetchWeatherData ~ lat:", lat);
    console.log("=> ~ fetchWeatherData ~ lng:", lng);
    try {
      setLoading(true);
      const res = await getWeatherData(lat, lng, "minutely,hourly");
      setDailyWeather(get(res, "daily", []));
      setCurrentWeather(get(res, "current", {}));
    } catch (err) {
      console.error(err);
      // 添加错误提示
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { lat, lng } = getLocation();
    fetchWeatherData(lat, lng);
  }, []);

  const handleRefresh = () => {
    const { lat, lng } = getLocation();
    fetchWeatherData(lat, lng);
  };

  const handleLocationChange = async () => {
    if (!location) {
      // 添加错误提示
      return;
    }

    try {
      setLoading(true);
      const res = await getLocationData(location);
      const data = get(res, "results[0]");
      if (data) {
        const { lat, lng } = data.geometry;
        await fetchWeatherData(lat, lng);
        storeLocation({ name: location, lat, lng });
      } else {
        // 添加错误提示
      }
    } catch (err) {
      console.error(err);
      // 添加错误提示
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
          <span
            className={`shuaxin cursor-pointer text-gray-600 hover:text-blue-main text-lg ${
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
              {get(currentWeather, "weather[0].description", "未知")}
            </div>
          </div>

          <div>
            <div className="flex items-start h-16">
              <span className="font-bold text-5xl" style={{ color: "#309FFB" }}>
                {temp(currentWeather.temp)}
              </span>
              <img
                className="w-6 h-6 inline-block"
                src={weatherIcon.Celcius}
                alt="celcius"
              />
            </div>
            <div className="text-sm text-gray-500 pl-1">
              体感温度：{temp(currentWeather.feels_like)}
              <img
                className="w-2 h-2 inline-block align-top"
                src={weatherIcon.Celcius}
                alt="celcius"
              />
            </div>
          </div>
        </div>

        {!loading ? (
          <div className="flex justify-between pt-4 pb-2 sm:text-xs text-base text-gray-500">
            <WeatherInfo
              icon={weatherIcon.Humidity}
              value={`${currentWeather.humidity ?? 0}%`}
              label="湿度"
            />
            <WeatherInfo
              icon={weatherIcon.uvi}
              value={currentWeather.uvi ?? "0"}
              label="紫外线"
            />
            <WeatherInfo
              icon={weatherIcon.SunRise}
              value={
                currentWeather.sunrise
                  ? moment.unix(currentWeather.sunrise).format("HH:MM")
                  : "??:??"
              }
              label="日出"
            />
            <WeatherInfo
              icon={weatherIcon.Sunset}
              value={
                currentWeather.sunset
                  ? moment.unix(currentWeather.sunset).format("HH:MM")
                  : "??:??"
              }
              label="日落"
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
