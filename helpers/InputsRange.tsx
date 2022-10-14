import { WeatherRange } from '../constants'
import { WeatherFilter } from '../types/LabsTypes'

export const MinimalInput = (type: string | number) => {
  if (type === WeatherFilter.temp || type === WeatherFilter.temp_min || type === WeatherFilter.temp_max) {
    return WeatherRange.tempMin
  }
  if (type === WeatherFilter.pressure) {
    return WeatherRange.pressureMin
  }
  if (type === WeatherFilter.humidity) {
    return WeatherRange.humidityMin
  }
  return ''
}
export const MaximalInput = (type: string | number) => {
  if (type === WeatherFilter.temp || type === WeatherFilter.temp_min || type === WeatherFilter.temp_max) {
    return WeatherRange.tempMax
  }
  if (type === WeatherFilter.pressure) {
    return WeatherRange.pressureMax
  }
  if (type === WeatherFilter.humidity) {
    return WeatherRange.humidityMax
  }
  return ''
}
