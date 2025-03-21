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

export const weatherIcon = {
  // Clear sky
  c01d: Sun,
  c01n: Moon,

  // Few/Scattered clouds (801-802)
  c02d: CloudySun,
  c02n: CloudyMoon,

  // Broken clouds (803)
  c03d: Cloud,
  c03n: Cloud,

  // Overcast clouds (804)
  c04d: Cloudy,
  c04n: Cloudy,

  // Shower rain (520-522)
  r04d: ShowerRain,
  r04n: ShowerRain,
  r05d: ShowerRain,
  r05n: ShowerRain,
  r06d: ShowerRain,
  r06n: ShowerRain,

  // Rain (500-502)
  r01d: Rain,
  r01n: Rain,
  r02d: Rain,
  r02n: Rain,

  // Heavy rain (502)
  r03d: HeavyRain,
  r03n: HeavyRain,

  // Snow (600-602, 621-622)
  s01d: Snow,
  s01n: Snow,
  s02d: Snow,
  s02n: Snow,
  s03d: Snow,
  s03n: Snow,

  // Fog/Mist (700, 741)
  a01d: Foggy,
  a01n: Foggy,
  a05d: Foggy,
  a05n: Foggy,
  Celcius: Celcius,
  Humidity: Humidity,
  SunRise: SunRise,
  Sunset: Sunset,
  uvi: Uvi,
} as const;
