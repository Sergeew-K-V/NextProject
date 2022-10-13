import { WeatherFilter } from '../types/LabsTypes'

const QueryFilterLogic = (type: WeatherFilter, value: string): string => {
  try {
    if (value && type) {
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
