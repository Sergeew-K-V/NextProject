import { WeatherRange } from "../constants"

export const MakeNormalisation = (obj: any) => {
  // input: pressure:, humidity, output: temp
  const NORMAL_OBJ = {
    input: [
      obj.main.pressure / WeatherRange.pressureMax,
      obj.main.humidity / (WeatherRange.humidityMax - WeatherRange.humidityMin),
      obj.city.coord.lat / (WeatherRange.latMax - WeatherRange.latMin),
      obj.city.coord.lon / (WeatherRange.lonMax - WeatherRange.lonMin),
    ],
  }
  if (obj.main.temp !== undefined) {
    Object.assign(NORMAL_OBJ, {
      output: [obj.main.temp / (WeatherRange.tempMax - WeatherRange.tempMin)],
    })
  }

  return NORMAL_OBJ
}

export const MakeDeNormalisation = (arr: any) => {
  const normalArr = arr.map((el: number) => el * (WeatherRange.tempMax - WeatherRange.tempMin))
  return normalArr
}
