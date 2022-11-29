export const REQUEST_LIMIT = '?_limit=5'
export const DEFAULT_CATEGORY = 'sandwiches'
export const EMPTY_RANGE_LIMIT = 100
export const Kelvin = 273.15

export const WeatherRange = {
  tempMin: -17,
  tempMax: 42,
  pressureMax: 812.4,
  pressureMin: 652.5,
  humidityMin: 0,
  humidityMax: 100,
  lonMax: 180,
  lonMin: -180,
  latMax: 90,
  latMin: -90,
}

export const LocationNovocherkassk = {
  name: 'Novocherkassk',
  country: 'RU',
  coord: { lat: 47.4, lon: 40.04 },
}

const calculateId = () => {
  return setTimeout(() => {
    return Date.now()
  }, 100)
}

//https://www.yandex.ru/pogoda/month/november?lat=47.422052&lon=40.093725&via=cnav  - data of novocherkass pogoda
export const defaultStateOfNetworkPayload = [
  {
    _id: calculateId(),
    main: { pressure: 758, humidity: 75, temp: 5.5, temp_min: 3, temp_max: 8 },
    city: { ...LocationNovocherkassk },
  },
  { _id: calculateId(), main: { pressure: 757, humidity: 74, temp: 7, temp_min: 6, temp_max: 8 }, city: { ...LocationNovocherkassk } },
  { _id: calculateId(), main: { pressure: 757, humidity: 73, temp: 9, temp_min: 8, temp_max: 10 }, city: { ...LocationNovocherkassk } },
  { _id: calculateId(), main: { pressure: 757, humidity: 75, temp: 8, temp_min: 6, temp_max: 10 }, city: { ...LocationNovocherkassk } },
  { _id: calculateId(), main: { pressure: 759, humidity: 73, temp: 7.5, temp_min: 6, temp_max: 9 }, city: { ...LocationNovocherkassk } },
  { _id: calculateId(), main: { pressure: 758, humidity: 74, temp: 8.5, temp_min: 7, temp_max: 10 }, city: { ...LocationNovocherkassk } },
  { _id: calculateId(), main: { pressure: 759, humidity: 70, temp: 8, temp_min: 6, temp_max: 8 }, city: { ...LocationNovocherkassk } },
  { _id: calculateId(), main: { pressure: 757, humidity: 75, temp: 8.5, temp_min: 7, temp_max: 10 }, city: { ...LocationNovocherkassk } },
  { _id: calculateId(), main: { pressure: 757, humidity: 74, temp: 8.5, temp_min: 7, temp_max: 10 }, city: { ...LocationNovocherkassk } },
  { _id: calculateId(), main: { pressure: 755, humidity: 73, temp: 9.5, temp_min: 8, temp_max: 11 }, city: { ...LocationNovocherkassk } },
  { _id: calculateId(), main: { pressure: 757, humidity: 74, temp: 6.5, temp_min: 7, temp_max: 10 }, city: { ...LocationNovocherkassk } },
  { _id: calculateId(), main: { pressure: 758, humidity: 79, temp: 8, temp_min: 7, temp_max: 9 }, city: { ...LocationNovocherkassk } },
  { _id: calculateId(), main: { pressure: 758, humidity: 81, temp: 8, temp_min: 7, temp_max: 9 }, city: { ...LocationNovocherkassk } },
  { _id: calculateId(), main: { pressure: 757, humidity: 81, temp: 6.5, temp_min: 5, temp_max: 8 }, city: { ...LocationNovocherkassk } },
  { _id: calculateId(), main: { pressure: 758, humidity: 81, temp: 4, temp_min: 3, temp_max: 5 }, city: { ...LocationNovocherkassk } },
]
