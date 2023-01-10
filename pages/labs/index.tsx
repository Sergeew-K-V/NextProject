import { URL_LABS_SERVER } from "../../constants/URLS"
import { QueryRangesLogic } from "../../utils"

export { default } from "./Labs"

export async function getStaticProps() {
  const url = process.env.NEXT_PUBLIC_SERVER_URL
  const res = await fetch(`${url}/weather?${QueryRangesLogic(0, 0)}`)
  const preloadWeatherData = await res.json()
  return {
    props: {
      preloadWeatherData,
    },
  }
}
