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

export enum Pages{
  DataBasePage = "DataBasePage" ,
  NeuralNetworkPage = "NeuralNetworkPage",
}
