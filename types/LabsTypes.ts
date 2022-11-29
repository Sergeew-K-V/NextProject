export enum WeatherFilter {
  city = 'city',
  country = 'country',
  temp = 'temp',
  temp_min = 'temp_min',
  temp_max = 'temp_max',
  humidity = 'humidity',
  pressure = 'pressure',
  lat = 'lat',
  lon = 'lon',
}

export interface LabsProps {
  preloadWeatherData: any
}

export enum Pages {
  DataBasePage = 'DataBasePage',
  NeuralNetworkPage = 'NeuralNetworkPage',
}

export interface PayloadWeatherDataProps {
  onSelect?: () => {}
  _id?: number
  lat?: number
  lon?: number
  city?: string
  country?: string
  temp?: number
  pressure?: number
  humidity?: number
}
