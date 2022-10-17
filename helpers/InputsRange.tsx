import { WeatherRange } from '../constants'
import { WeatherFilter } from '../types/LabsTypes'

export const MinimalInput = (type: string | number) => {
  switch (type) {
    case WeatherFilter.temp || WeatherFilter.temp_max || WeatherFilter.temp_min:
      return WeatherRange.tempMin
    case WeatherFilter.pressure:
      return WeatherRange.pressureMin
    case WeatherFilter.humidity:
      return WeatherRange.humidityMin
    case WeatherFilter.lon:
      return WeatherRange.lonMin
    case WeatherFilter.lat:
      return WeatherRange.latMin
    default:
      return ''
  }
}
export const MaximalInput = (type: string | number) => {
  switch (type) {
    case WeatherFilter.temp || WeatherFilter.temp_max || WeatherFilter.temp_min:
      return WeatherRange.tempMax
    case WeatherFilter.pressure:
      return WeatherRange.pressureMax
    case WeatherFilter.humidity:
      return WeatherRange.humidityMax
    case WeatherFilter.lon:
      return WeatherRange.lonMax
    case WeatherFilter.lat:
      return WeatherRange.latMax
    default:
      return ''
  }
}
