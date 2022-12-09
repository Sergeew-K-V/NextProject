import { URL_LABS } from "../../constants/URLS"
import { QueryRangesLogic } from "../../utils"

export { default } from "./Labs"

export async function getStaticProps() {
  const res = await fetch(`${URL_LABS}/weather?${QueryRangesLogic(0, 0)}`)
  const preloadWeatherData = await res.json()
  return {
    props: {
      preloadWeatherData,
    },
  }
}
