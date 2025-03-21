import { WeatherData, Location } from "./types";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const GEOCODE_API_KEY = import.meta.env.VITE_GEOCODE_API_KEY;
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
  longitude: number
): Promise<{
  count: number;
  data: WeatherData[];
}> {
  const url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}&lang=zh`;
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
