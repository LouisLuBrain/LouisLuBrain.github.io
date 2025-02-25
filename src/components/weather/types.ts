export interface WeatherData {
  temp?: number;
  feels_like?: number;
  humidity?: number;
  uvi?: number;
  sunrise?: number;
  sunset?: number;
  weather?: Array<{
    description?: string;
    icon?: string;
  }>;
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
  name?: string;
  lat: number;
  lng: number;
}
