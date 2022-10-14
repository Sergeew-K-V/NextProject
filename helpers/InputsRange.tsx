import { weatherRange } from '../constants'
import { WeatherFilter } from '../types/LabsTypes'

export const MinimalInput = (type: string | number) => {
  if (type === WeatherFilter.temp || type === WeatherFilter.temp_min || type === WeatherFilter.temp_max) {
    return weatherRange.tempMin
  }
  if (type === WeatherFilter.pressure) {
    return weatherRange.pressureMin
  }
  if (type === WeatherFilter.humidity) {
    return weatherRange.humidityMin
  }
  return ''
}
export const MaximalInput = (type: string | number) => {
  if (type === WeatherFilter.temp || type === WeatherFilter.temp_min || type === WeatherFilter.temp_max) {
    return weatherRange.tempMax
  }
  if (type === WeatherFilter.pressure) {
    return weatherRange.pressureMax
  }
  if (type === WeatherFilter.humidity) {
    return weatherRange.humidityMax
  }
  return ''
}
