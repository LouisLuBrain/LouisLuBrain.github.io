export interface WeatherData {
  app_temp: number;
  aqi: number;
  city_name: string;
  clouds: number;
  country_code: string;
  datetime: string;
  dewpt: number;
  dhi: number;
  dni: number;
  elev_angle: number;
  ghi: number;
  gust: number;
  h_angle: number;
  lat: number;
  lon: number;
  ob_time: string;
  pod: string;
  precip: number;
  pres: number;
  rh: number;
  slp: number;
  snow: number;
  solar_rad: number;
  sources: string[];
  state_code: string;
  station: string;
  sunrise: string;
  sunset: string;
  temp: number;
  timezone: string;
  ts: number;
  uv: number;
  vis: number;
  weather: {
    description: string;
    code: number;
    icon: string;
  };
  wind_cdir: string;
  wind_cdir_full: string;
  wind_dir: number;
  wind_spd: number;
}

export interface DailyWeather {
  dt?: number;
  temp?: {
    max?: number;
    min?: number;
  };
  weather?: Array<{
    icon?: string;
  }>;
}

export interface LocationResponse {
  results?: Array<{
    geometry: Location;
  }>;
}

export interface Location {
  name: string;
  state?: string;
  lat: number;
  lon: number;
  country?: string;
  local_names?: Record<string, string>;
}
