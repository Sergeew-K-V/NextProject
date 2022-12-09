import { EMPTY_RANGE_LIMIT } from '../constants'

const QueryRangesLogic = (bottom: number, top: number): string => {
  if (bottom === 0 && top === 0) {
    return `_limit=${EMPTY_RANGE_LIMIT}&`
  }
  if (bottom === 0 && top) {
    return `_limit=${top}&`
  }
  if (bottom && top) {
    return `_bottomRange=${bottom}&` + `_topRange=${top}&`
  }

  return ''
}

export default QueryRangesLogic
