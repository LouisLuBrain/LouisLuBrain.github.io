const WEATHER_API_KEY =
  import.meta.env.VITE_WEATHER_API_KEY || "5bb78a279194bfba9581c079c91d4793";
const GEOCODE_API_KEY =
  import.meta.env.VITE_GEOCODE_API_KEY || "6a2e2f5f670c46acab14925be9933712";
const TIMEOUT = 10000;

// 通用请求处理函数
async function fetchWithTimeout(
  url: string,
  timeout = TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export async function getWeatherData(
  latitude: number,
  longitude: number,
  exPart: string = ""
): Promise<WeatherData> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=${exPart}&appid=${WEATHER_API_KEY}&lang=zh_cn&units=metric`;

  try {
    const response = await fetchWithTimeout(url);
    if (!response.ok) {
      throw new Error("获取天气数据失败");
    }
    return await response.json();
  } catch (error) {
    console.error("天气数据请求错误:", error);
    throw error;
  }
}

export async function getLocationData(name: string): Promise<Location[]> {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(
    name
  )}&appid=${GEOCODE_API_KEY}&limit=1`;

  try {
    const response = await fetchWithTimeout(url);
    if (!response.ok) {
      throw new Error("获取位置数据失败");
    }
    return await response.json();
  } catch (error) {
    console.error("位置数据请求错误:", error);
    throw error;
  }
}

export function storeLocation({ name, lat, lon }: Location): void {
  localStorage.setItem("location", name || "location");
  localStorage.setItem("lat", lat.toString());
  localStorage.setItem("lon", lon.toString());
}

export function getLocation(): Location {
  const lat = Number(localStorage.getItem("lat")) || 39.9042; // 默认北京位置
  const lon = Number(localStorage.getItem("lon")) || 116.4074;
  const name = localStorage.getItem("location") || "北京";

  return { name, lat, lon };
}

// 导入图标资源
import Celcius from "../../assets/weather/Celcius.svg";
import Cloud from "../../assets/weather/Cloud.svg";
import Cloudy from "../../assets/weather/Cloudy.svg";
import CloudyMoon from "../../assets/weather/Cloudy-Moon.svg";
import CloudySun from "../../assets/weather/Cloudy-Sun.svg";
import Foggy from "../../assets/weather/foggy.png";
import HeavyRain from "../../assets/weather/Heavy Rain.svg";
import Humidity from "../../assets/weather/Humidity.svg";
import Moon from "../../assets/weather/Moon.svg";
import Rain from "../../assets/weather/Rain.svg";
import ShowerRain from "../../assets/weather/ShowerRain.svg";
import Snow from "../../assets/weather/Snow.svg";
import Sun from "../../assets/weather/Sun.svg";
import SunRise from "../../assets/weather/Sunrise.svg";
import Sunset from "../../assets/weather/Sunset.svg";
import Uvi from "../../assets/weather/uvi.svg";
import { WeatherData, Location } from "./types";

export const weatherIcon = {
  "01d": Sun,
  "01n": Moon,
  "02d": CloudySun,
  "02n": CloudyMoon,
  "03d": Cloud,
  "03n": Cloud,
  "04d": Cloudy,
  "04n": Cloudy,
  "09d": ShowerRain,
  "09n": ShowerRain,
  "10d": Rain,
  "10n": Rain,
  "11d": HeavyRain,
  "11n": HeavyRain,
  "13d": Snow,
  "13n": Snow,
  "50d": Foggy,
  "50n": Foggy,
  Celcius: Celcius,
  Humidity: Humidity,
  SunRise: SunRise,
  Sunset: Sunset,
  uvi: Uvi,
} as const;
