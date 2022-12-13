import { WeatherRange } from "../constants"

export const MakeNormalisation = (obj: any) => {
  // input: pressure:, humidity, output: temp
  const NORMAL_OBJ = {
    // temp_max: obj.main.temp_min / (WeatherRange.tempMax - WeatherRange.tempMin),
    // temp_min: obj.main.temp_max / (WeatherRange.tempMax - WeatherRange.tempMin),
    input: [
      obj.main.pressure / WeatherRange.pressureMax,
      obj.main.humidity / (WeatherRange.humidityMax - WeatherRange.humidityMin),
      obj.city.coord.lat / (WeatherRange.latMax - WeatherRange.latMin),
      obj.city.coord.lon / (WeatherRange.lonMax - WeatherRange.lonMin),
    ],
    output: [obj.main.temp / (WeatherRange.tempMax - WeatherRange.tempMin)],
  }

  return NORMAL_OBJ
}

export const MakeNormalisationForActivate = (obj: any) => {
  const NORMAL_OBJ = {
    input: [
      obj.pressure / WeatherRange.pressureMax,
      obj.humidity / (WeatherRange.humidityMax - WeatherRange.humidityMin),
      obj.lat / (WeatherRange.latMax - WeatherRange.latMin),
      obj.lon / (WeatherRange.lonMax - WeatherRange.lonMin),
    ],
  }

  return NORMAL_OBJ
}

export const MakeDeNormalisation = (obj: any) => {
  const NORMAL_OBJ = {
    input: [
      obj.main.pressure * WeatherRange.pressureMax,
      obj.main.humidity * (WeatherRange.humidityMax - WeatherRange.humidityMin),
      obj.city.coord.lat * (WeatherRange.latMax - WeatherRange.latMin),
      obj.city.coord.lon * (WeatherRange.lonMax - WeatherRange.lonMin),
    ],
    output: [obj.main.temp * (WeatherRange.tempMax - WeatherRange.tempMin)],
  }

  return NORMAL_OBJ
}
