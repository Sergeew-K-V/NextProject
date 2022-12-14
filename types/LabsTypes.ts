export enum WeatherFilter {
  city = "city",
  country = "country",
  temp = "temp",
  temp_min = "temp_min",
  temp_max = "temp_max",
  humidity = "humidity",
  pressure = "pressure",
  lat = "lat",
  lon = "lon",
}

export interface LabsProps {
  preloadWeatherData: any
}

export enum Pages {
  DataBasePage = "DataBasePage",
  NeuralNetworkPage = "NeuralNetworkPage",
}

export interface PayloadWeatherDataProps {
  onSelect?: any
  _id?: number
  lat?: number
  lon?: number
  city?: string
  country?: string
  temp?: number
  pressure?: number
  humidity?: number
  selected?: boolean
}

export interface Weather {
  _id: string
  city: {
    coord: {
      lat: number
      lon: number
    }
    country: string
    findname: string
    id: number
    name: string
    zoom: number
  }
  clouds: {
    all: number
  }
  main: {
    humidity: number
    pressure: string
    temp: number
    temp_min: number
    temp_max: number
    time: number
  }
  weather: [
    {
      description: string
      icon: string
      id: number
      main: string
    }
  ]
  wind: {
    deg: number
    speed: number
  }
}
