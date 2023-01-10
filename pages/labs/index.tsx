import { URL_LABS_SERVER } from "../../constants/URLS"
import { QueryRangesLogic } from "../../utils"

export { default } from "./Labs"

export async function getStaticProps() {
  const url = `${URL_LABS_SERVER}/weather?${QueryRangesLogic(0, 0)}`
  const res = await fetch(url)
  const preloadWeatherData = await res.json()
  return {
    props: {
      preloadWeatherData,
    },
  }
}
