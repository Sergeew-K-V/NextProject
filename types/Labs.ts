import { Dispatch, SetStateAction } from 'react'

export interface WeatherDataGenerator {
  minTemp: number
  maxTemp: number
  minPres: number
  maxPres: number
  minWindSpeed: number
  maxWindSpeed: number
  amountOfData: number
  weatherData: WeatherData
  setWeatherData: Dispatch<SetStateAction<WeatherData>>
}
export type WeatherData = {
  temperature: number
  pressure: number
  windSpeed: number
}
export interface WeatherGenerator {
  minYear: number
  maxYear: number
  minMonth: number
  maxMonth: number
  amountOfData: number
}

export interface LabsProps {}

export type Weather = {
  year: number
  month: Months
  weatherDataId: string | null
}
export enum Months {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}
