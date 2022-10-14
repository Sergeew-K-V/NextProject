import { WeatherRange } from '../constants'

export const Normalisation = (obj: any) => {
  const NORMAL_OBJ = {
    ...obj,
  }
  console.log(NORMAL_OBJ.main.pressure)
  NORMAL_OBJ.main.temp = obj.main.temp / (WeatherRange.tempMax - WeatherRange.tempMin)
  NORMAL_OBJ.main.temp_min = obj.main.temp_min / (WeatherRange.tempMax - WeatherRange.tempMin)
  NORMAL_OBJ.main.temp_max = obj.main.temp_max / (WeatherRange.tempMax - WeatherRange.tempMin)
  NORMAL_OBJ.main.pressure = obj.main.pressure / WeatherRange.pressureMax
  NORMAL_OBJ.main.humidity = obj.main.humidity / (WeatherRange.humidityMax - WeatherRange.humidityMin)
  console.log(NORMAL_OBJ.main.pressure)
  return NORMAL_OBJ
}
