export interface WeatherData {
  coord?: {
    lon?: number;
    lat?: number;
  };
  weather?: Array<{
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
  }>;
  base?: string;
  main?: {
    temp?: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
    humidity?: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility?: number;
  wind?: {
    speed?: number;
    deg?: number;
    gust?: number;
  };
  clouds?: {
    all?: number;
  };
  dt?: number;
  sys?: {
    sunrise?: number;
    sunset?: number;
  };
  timezone?: number;
  id?: number;
  name?: string;
  cod?: number;
}

// ...existing code...

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
