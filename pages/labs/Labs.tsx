import { NextPage } from "next"
import { ContainerBig } from "../../components/Layouts"
import { useFetch } from "../../hooks/useFetch"
import { URL_LABS } from "../../constants/URLS"
import React, { useMemo, useState } from "react"
import { Block, Button, Controlers, DashBoard, Form, Heading, Input, Loader, Title } from "../../components/elements"
import { MaximalInput, MinimalInput, QueryFilterLogic, QueryRangesLogic, MakeNormalisation, MakeDeNormalisation } from "../../utils"
import { LabsProps, Pages, PayloadWeatherDataProps, WeatherFilter } from "../../types/LabsTypes"
import { Architect, Trainer } from "synaptic"
import { defaultStateOfNetworkPayload } from "../../constants"
import { Doughnut } from "react-chartjs-2"
import { DoughnutDiagram, PayloadWeatherData, WeatherData } from "../../components"
import styled from "styled-components"
import GetColors from "../../utils/GetColors"
import GetArrayForDoughnut from "../../utils/GetArrayForDoughnut"

const Labs: NextPage<LabsProps> = ({ preloadWeatherData }) => {
  const [requestRangeBottom, setRequestRangeBottom] = useState<number>(0)
  const [requestRangeTop, setRequestRangeTop] = useState<number>(0)
  const [requestFilterType, setRequestFilterType] = useState<WeatherFilter>(WeatherFilter.city)
  const [requestFilterValue, setRequestFilterValue] = useState<string | number>("")

  const [activePage, setActivePage] = useState<Pages>(Pages.DataBasePage)

  const [neuralNetwork, setNeuralNetwork] = useState<any>()

  const [weatherData, setWeatherData] = useState<any[] | null>(preloadWeatherData)
  const [normalData, setNormalData] = useState<Array<any>>([])
  const [networkPayload, setNetworkPayload] = useState<Array<any>>(defaultStateOfNetworkPayload)
  const [networkNormalPayload, setNetworkNormalPayload] = useState<Array<any>>([])

  const [selectedAssets, setSelectedAssets] = useState<Array<any>>([])
  const [errorNetwork, setErrorNetwork] = useState<Array<any>>([])
  const [trainerResult, setTrainerResult] = useState<{ error: number; iterations: number; time: number } | null>(null)

  const [trainingSet, setTrainingSet] = useState({
    rate: 0.1,
    iterations: 20000,
    error: 0.0003,
  })

  const getCountriesForDoughnut = () => {
    const arrCountry: any[] = []
    if (weatherData?.length !== 0) {
      weatherData?.map((el) => {
        const existElement = arrCountry.find((obj) => obj.type === el.city.country)

        if (existElement) {
          existElement.entries++
        } else {
          arrCountry.push({ type: el.city.country, entries: 1 })
        }
      })
    }
    return arrCountry
  }

  const doughnut = useMemo(() => {
    if (weatherData)
      return {
        data: { coutries: GetArrayForDoughnut(weatherData, "city.country"), cities: GetArrayForDoughnut(weatherData, "city.name") },
        colors: weatherData ? GetColors(weatherData) : [],
      }
  }, [weatherData])

  const { request, loading } = useFetch()

  const getWeatherData = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (requestRangeTop <= requestRangeBottom && requestRangeTop !== 0) {
      return alert("Bottom range can`t be more or equal than top range")
    }

    if (requestRangeBottom === 0 && requestRangeTop === 0 && requestFilterValue !== "") {
      const data = await request(`${URL_LABS}/weather?${QueryFilterLogic(requestFilterType, requestFilterValue)}`)
      setWeatherData(data)
    } else {
      const data = await request(
        `${URL_LABS}/weather?${QueryRangesLogic(requestRangeBottom, requestRangeTop)}${QueryFilterLogic(requestFilterType, requestFilterValue)}`
      )
      setWeatherData(data)
    }
  }

  const downloadAllData = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const data = await request(`${URL_LABS}/weather?_limit=All`)
    setWeatherData(data)
  }

  const NetworkHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const neuralNetwork = new Architect.Perceptron(4, 3, 1)
    const trainer = new Trainer(neuralNetwork)

    const normalisatedData = weatherData?.map((el) => {
      return MakeNormalisation(el)
    })
    const result = trainer.train(normalisatedData, trainingSet)
    setNeuralNetwork({ ...neuralNetwork })
    setTrainerResult({ ...result })
  }

  const handleNormalisation = (event: any) => {
    event?.preventDefault()
    const data = selectedAssets.map((el) => MakeNormalisation(el))
    setNormalData(data)
  }

  const selectPayloadData = (selectedPayloadObject: PayloadWeatherDataProps) => {
    const existingAsset = selectedAssets.find((el) => el._id === selectedPayloadObject._id)
    if (!existingAsset) {
      networkPayload.find((el) => {
        if (el._id === selectedPayloadObject._id) {
          el.selected = true
        }
      })
      selectedAssets.push(selectedPayloadObject)
      setSelectedAssets([...selectedAssets])
    } else {
      const filtredAssets = selectedAssets.filter((el) => el._id !== selectedPayloadObject._id)
      networkPayload.find((el) => {
        if (el._id === selectedPayloadObject._id) {
          el.selected = false
        }
      })
      setSelectedAssets([...filtredAssets])
    }
  }

  const clearHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setSelectedAssets([])
    networkPayload.forEach((el) => (el.selected = false))
  }

  const selectAllHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    networkPayload.forEach((el) => (el.selected = true))
    setSelectedAssets([...networkPayload])
  }

  const activateNetwork = (event: React.MouseEvent<HTMLElement>) => {
    neuralNetwork.activate()
  }

  const DisplayActivePage = (page: Pages) => {
    switch (page) {
      case Pages.NeuralNetworkPage:
        return (
          <>
            <Heading>Network page</Heading>
            <Block display="flex" justifyContent="space-between" width="100%">
              <DashBoard>
                {loading ? (
                  <Loader />
                ) : networkPayload ? (
                  networkPayload.map((data, index) =>
                    index !== 100 && index < 100 ? (
                      <PayloadWeatherData
                        onSelect={async () => selectPayloadData(data)}
                        key={data._id}
                        city={data.city.name}
                        country={data.city.country}
                        temp={data.main.temp}
                        pressure={data.main.pressure}
                        humidity={data.main.humidity}
                        lat={data.city.coord.lat}
                        lon={data.city.coord.lon}
                        selected={data.selected}
                      />
                    ) : (
                      "No data"
                    )
                  )
                ) : (
                  "Weather data wasn't download"
                )}
              </DashBoard>
              <Controlers>
                <Block width="100%">
                  <Form>
                    <Title>Network Controller</Title>
                    <Block justifyContent="space-between" display="flex" width="100%" margin="0">
                      <Button onClick={selectAllHandler}>Select all</Button>
                      <Button onClick={clearHandler}>Clear choses</Button>
                    </Block>
                    <hr style={{ width: "100%" }} />
                    <Block>
                      <Title>Training options</Title>
                      <Block>
                        <div>Insert rate:</div>
                        <Input value={trainingSet.rate} onChange={(event) => setTrainingSet({ ...trainingSet, rate: Number(event.target.value) })} />
                      </Block>
                      <Block>
                        <div>Number of iterations:</div>
                        <Input
                          value={trainingSet.iterations}
                          onChange={(event) => setTrainingSet({ ...trainingSet, iterations: Number(event.target.value) })}
                        />
                      </Block>
                      <Block>
                        <div> Approximate error:</div>
                        <Input
                          value={trainingSet.error}
                          onChange={(event) => setTrainingSet({ ...trainingSet, error: Number(event.target.value) })}
                        />
                      </Block>
                    </Block>
                    <hr style={{ width: "100%" }} />
                    <Block margin="0" width="100%">
                      <Button onClick={NetworkHandler} width="100%">
                        Train Network
                      </Button>
                    </Block>
                    <hr style={{ width: "100%" }} />
                    <Block margin="0" width="100%">
                      <Button onClick={(event) => handleNormalisation(event)} width="100%">
                        Normalisation
                      </Button>
                    </Block>
                    <hr style={{ width: "100%" }} />
                    <Block margin="0" width="100%">
                      <Button onClick={activateNetwork} width="100%">
                        Use neural network
                      </Button>
                    </Block>
                    <Block>
                      <Title>Training results</Title>
                      <Block margin="0.5rem ">Result error: {trainerResult?.error}</Block>
                      <Block margin="0.5rem ">Result iterations: {trainerResult?.iterations}</Block>
                      <Block margin="0.5rem ">Result time: {trainerResult?.time}</Block>
                    </Block>
                  </Form>
                </Block>
              </Controlers>
            </Block>
          </>
        )
      case Pages.DataBasePage:
        return (
          <>
            <Heading>Database page</Heading>
            <Block width="100%" margin="0 0 3rem" display="flex">
              <Block flex="0 1 25%">
                <DoughnutDiagram label="Country" labelList={doughnut ? doughnut.data.coutries : []} colors={doughnut ? doughnut.colors : []} />
              </Block>
              <Block flex="0 1 25%">
                <DoughnutDiagram label="City" labelList={doughnut ? doughnut.data.cities : []} colors={doughnut ? doughnut.colors : []} />
              </Block>
            </Block>
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
                ) : weatherData?.length !== 0 ? (
                  weatherData?.map((data, index) => {
                    if (index < 100 && index !== 100) {
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
                    } else {
                      return
                    }
                  })
                ) : (
                  "Data don`t downloaded!"
                )}
              </DashBoard>
            </Block>
          </>
        )
      default:
        return <h1>Select page</h1>
    }
  }

  return (
    <ContainerBig>
      <Heading>This page for labs works with databases and Neural Network</Heading>
      <NavigationBlock>
        <Button
          margin="0 1rem"
          onClick={() => {
            setActivePage(Pages.DataBasePage)
          }}
        >
          DataBase
        </Button>
        <Button
          margin="0 1rem"
          onClick={() => {
            setActivePage(Pages.NeuralNetworkPage)
          }}
        >
          Neural Network
        </Button>
      </NavigationBlock>
      {DisplayActivePage(activePage)}
      <StatusBar></StatusBar>
    </ContainerBig>
  )
}

export default Labs

const NavigationBlock = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
`

const Select = styled.select`
  min-height: 25px;
  margin: 0 0.2rem 0 0;
`

const Option = styled.option``

const StatusBar = styled.div``
