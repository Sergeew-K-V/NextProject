import { URL_LABS } from '../constants/URLS'
import { useFetch } from './useFetch'

export const useGenerator = () => {
  const { request } = useFetch()

  //   const GenaratorWeather = ({ howManyToGen, minYear = 2000, maxYear = 3000, minMonth = 0, maxMonth = 11 }: WeatherGenerator) => {}

  const GeneratorWeatherData = (
    howManyToGen = 0,
    minTemp = -50,
    maxTemp = 60,
    minPres = 652.5,
    maxPres = 798,
    maxWindSpeed = 25,
    minWindSpeed = 0
  ) => {
    try {
      for (let i = 0; i < howManyToGen; i++) {
        // const genTemperature = Math.random() * (maxTemp - minTemp) + minTemp
        // const genPressure = Math.random() * (maxPres - minPres) + minPres
        // const genWindSpeed = Math.random() * (maxWindSpeed - minWindSpeed) + minWindSpeed
        const Obj = {
          temperature: Math.random() * (maxTemp - minTemp) + minTemp,
          pressure: Math.random() * (maxPres - minPres) + minPres,
          windSpeed: Math.random() * (maxWindSpeed - minWindSpeed) + minWindSpeed,
        }
        request(`${URL_LABS}/weatherdata`, 'POST', Obj)
      }
    } catch (error) {}
  }

  return {
    // GenaratorWeather,
    GeneratorWeatherData,
  }
}
