import { WeatherRange } from "../../constants"
import { MakeNormalisation } from "../../utils"

const Normalisation = MakeNormalisation

const PRESSURE = 750
const HUMIDITY = 100
const LAT = 27
const LON = 31
const MAIN = {
  pressure: PRESSURE,
  humidity: HUMIDITY,
}
const CITY = {
  coord: { lat: LAT, lon: LON },
}

test("Make normalisation should ", () => {
  expect(Normalisation({ main: MAIN, city: CITY })).toStrictEqual({
    input: [
      PRESSURE / WeatherRange.pressureMax,
      HUMIDITY / (WeatherRange.humidityMax - WeatherRange.humidityMin),
      LAT / (WeatherRange.latMax - WeatherRange.latMin),
      LON / (WeatherRange.lonMax - WeatherRange.lonMin),
    ],
  })
})
