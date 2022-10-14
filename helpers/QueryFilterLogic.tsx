import { Kelvin } from '../constants'
import { WeatherFilter } from '../types/LabsTypes'

const QueryFilterLogic = (type: WeatherFilter, value: string | number): string => {
  try {
    if (value && type) {
      if (type === WeatherFilter.max_temp || type === WeatherFilter.min_temp || type === WeatherFilter.temp) {
        value = Number(value) + Kelvin
        return `_filterType=${type}&` + `_filterValue=${value}`
      }
      if (type === WeatherFilter.city || type === WeatherFilter.country) {
        value = value.toString().toLocaleUpperCase()
        return `_filterType=${type}&` + `_filterValue=${value}`
      }
      return `_filterType=${type}&` + `_filterValue=${value}`
    } else {
      return ''
    }
  } catch (error) {
    alert(`Error in query filter: ${error}`)
    return ''
  }
}

export default QueryFilterLogic
