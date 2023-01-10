import { NextPage } from "next"
import { useEffect, useMemo, useState } from "react"
import { DoughnutDiagram, WeatherData } from "../../../components"
import { Block, Controlers, DashBoard, Form, Heading, Input, Loader, Title, Option, Select, Button } from "../../../components/elements"
import { URL_LABS_SERVER } from "../../../constants/URLS"
import { useFetch } from "../../../hooks/useFetch"
import { WeatherFilter } from "../../../types/LabsTypes"
import { GetArrayForDoughnut, GetColors, MaximalInput, MinimalInput, QueryFilterLogic, QueryRangesLogic } from "../../../utils"

interface DataBasePageProps {
  weatherData: any[] | string | null
  setWeatherData: React.Dispatch<React.SetStateAction<any[] | string | null>>
}

const DataBasePage: NextPage<DataBasePageProps> = ({ weatherData, setWeatherData }) => {
  const { request, loading } = useFetch()

  const [requestRangeBottom, setRequestRangeBottom] = useState<number>(0)
  const [requestRangeTop, setRequestRangeTop] = useState<number>(0)
  const [requestFilterType, setRequestFilterType] = useState<WeatherFilter>(WeatherFilter.city)
  const [requestFilterValue, setRequestFilterValue] = useState<string | number>("")

  const diagramData: any = useMemo(() => {
    if (Array.isArray(weatherData)) {
      const data = weatherData.slice(0, 100)
      return data
    } else {
      return []
    }
  }, [weatherData])

  const doughnut = useMemo(() => {
    if (weatherData)
      return {
        data: { coutries: GetArrayForDoughnut(diagramData, "city.country"), cities: GetArrayForDoughnut(diagramData, "city.name") },
        colors: diagramData ? GetColors(diagramData) : [],
      }
  }, [weatherData, diagramData])

  const getWeatherData = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (requestRangeTop <= requestRangeBottom && requestRangeTop !== 0) {
      return alert("Bottom range can`t be more or equal than top range")
    }

    if (requestRangeBottom === 0 && requestRangeTop === 0 && requestFilterValue !== "") {
      const data = await request(`${URL_LABS_SERVER}/weather?${QueryFilterLogic(requestFilterType, requestFilterValue)}`)
      setWeatherData(data)
    } else {
      const data = await request(
        `${URL_LABS_SERVER}/weather?${QueryRangesLogic(requestRangeBottom, requestRangeTop)}${QueryFilterLogic(
          requestFilterType,
          requestFilterValue
        )}`
      )
      setWeatherData(data)
    }
  }

  const downloadAllData = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const data = await request(`${URL_LABS_SERVER}/weather?_limit=All`)
    setWeatherData(data)
  }

  return (
    <>
      <Heading>Database page</Heading>
      <Block width="100%" margin="0 0 3rem" display="flex">
        <Block flex="0 1 25%">
          <DoughnutDiagram
            title="Country"
            label="Country"
            labelList={doughnut ? doughnut.data.coutries : []}
            colors={doughnut?.colors ? doughnut.colors : []}
          />
        </Block>
        <Block flex="0 1 25%">
          <DoughnutDiagram
            title="City"
            label="City"
            labelList={doughnut ? doughnut.data.cities : []}
            colors={doughnut?.colors ? doughnut.colors : []}
          />
        </Block>
      </Block>
      <Title style={{ margin: "1rem" }}>Total count of data: {loading ? "loading..." : weatherData?.length}</Title>
      <Block display="flex" margin="0 0 3rem" flexDirection="row-reverse" justifyContent="space-between" width="100%">
        <Controlers>
          <Block>
            <Form>
              <Block>
                <Title>Determinate a range of data for request</Title>
                <Block margin="0">
                  <div>Bottom range</div>
                  <Input type="number" min={0} value={requestRangeBottom} onChange={(e) => setRequestRangeBottom(Number(e.target.value))} />
                </Block>
                <Block margin="0">
                  <div>Top range</div>
                  <Input type="number" min={0} value={requestRangeTop} onChange={(e) => setRequestRangeTop(Number(e.target.value))} />
                </Block>
              </Block>
              <Block>
                <Title>Determinate a filter of data for request</Title>
                <Block display="flex" justifyContent="space-between" margin="0">
                  <Select value={requestFilterType} onChange={(e) => setRequestFilterType(e.target.value as WeatherFilter)}>
                    <Option value={WeatherFilter.city}>City</Option>
                    <Option value={WeatherFilter.country}>Country</Option>
                    <Option value={WeatherFilter.lat}>Latitude</Option>
                    <Option value={WeatherFilter.lon}>Longitude</Option>
                    <Option value={WeatherFilter.temp}>Temp</Option>
                    <Option value={WeatherFilter.temp_max}>Temp Max</Option>
                    <Option value={WeatherFilter.temp_min}>Temp Min</Option>
                    <Option value={WeatherFilter.pressure}>Pressure</Option>
                    <Option value={WeatherFilter.humidity}>Humidity</Option>
                  </Select>
                  <Input
                    type={requestFilterType === WeatherFilter.city || requestFilterType === WeatherFilter.country ? "text" : "number"}
                    value={requestFilterValue}
                    onChange={(e) => setRequestFilterValue(e.target.value)}
                    min={MinimalInput(requestFilterType)}
                    max={MaximalInput(requestFilterType)}
                    placeholder="Write filter here"
                  />
                </Block>
              </Block>
              <Block width="100%" margin="0">
                <Button type="submit" width="100%" onClick={getWeatherData}>
                  Download weather data
                </Button>
              </Block>
              <Block width="100%" margin="0">
                <Button type="submit" width="100%" onClick={downloadAllData}>
                  Download all weather
                </Button>
              </Block>
            </Form>
          </Block>
        </Controlers>
        <DashBoard>
          {loading ? (
            <Loader />
          ) : diagramData?.length !== 0 ? (
            diagramData?.map((data: any) => {
              return (
                <WeatherData
                  key={data._id}
                  city={data.city.name}
                  country={data.city.country}
                  temp={data.main.temp}
                  temp_min={data.main.temp_min}
                  temp_max={data.main.temp_max}
                  pressure={data.main.pressure}
                  humidity={data.main.humidity}
                  lat={data.city.coord.lat}
                  lon={data.city.coord.lon}
                  time={data.time}
                />
              )
            })
          ) : (
            "Data don`t downloaded!"
          )}
        </DashBoard>
      </Block>
    </>
  )
}

export default DataBasePage
