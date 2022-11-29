import { NextPage } from 'next'
import { ContainerBig } from '../../components/Layouts'
import { useFetch } from '../../hooks/useFetch'
import { URL_LABS } from '../../constants/URLS'
import { useEffect, useState } from 'react'
import { Loader, WeatherData } from '../../components/elements'
import { MaximalInput, MinimalInput, QueryFilterLogic, QueryRangesLogic } from '../../helpers'
import { LabsProps, Pages, PayloadWeatherDataProps, WeatherFilter } from '../../types/LabsTypes'
import { Architect, Trainer } from 'synaptic'
import { MakeNormalisation, MakeDeNormalisation } from '../../helpers'
import styled from 'styled-components'
import PayloadWeatherData from '../../components/elements/PayloadWeatherData'
import { defaultStateOfNetworkPayload } from '../../constants'

const Labs: NextPage<LabsProps> = ({ preloadWeatherData }) => {
  const [requestRangeBottom, setRequestRangeBottom] = useState<number>(0)
  const [requestRangeTop, setRequestRangeTop] = useState<number>(0)
  const [requestFilterType, setRequestFilterType] = useState<WeatherFilter>(WeatherFilter.city)
  const [requestFilterValue, setRequestFilterValue] = useState<string | number>('')

  const [activePage, setActivePage] = useState<Pages>(Pages.NeuralNetworkPage)

  const [neuralNetwork, setNeuralNetwork] = useState<any>()

  const [weatherData, setWeatherData] = useState<any[] | null>(preloadWeatherData)
  const [normalData, setNormalData] = useState<Array<any>>([])
  const [networkPayload, setNetworkPayload] = useState<Array<any>>(defaultStateOfNetworkPayload)
  const [networkNormalPayload, setNetworkNormalPayload] = useState<Array<any>>([])

  const [selectedAssets, setSelectedAssets] = useState<Array<any>>([])
  const [result, setResult] = useState<Array<any>>([])

  const { request, loading } = useFetch()

  const GeneratorHandlerWeatherData = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (requestRangeTop <= requestRangeBottom && requestRangeTop !== 0) {
      return alert('Bottom range can`t be more or equal than top range')
    }

    if (requestRangeBottom === 0 && requestRangeTop === 0 && requestFilterValue !== '') {
      const data = await request(`${URL_LABS}/weather?${QueryFilterLogic(requestFilterType, requestFilterValue)}`)
      setWeatherData(data)
    } else {
      const data = await request(`${URL_LABS}/weather?${QueryRangesLogic(requestRangeBottom, requestRangeTop)}${QueryFilterLogic(requestFilterType, requestFilterValue)}`)
      setWeatherData(data)
    }
  }

  const NetworkHandler = () => {
    setNeuralNetwork(new Architect.Perceptron(4, 3, 1))
    const trainer = new Trainer(neuralNetwork)

    const trainingOptions = {
      rate: 0.1,
      iterations: 20000,
      error: 0.005,
    }

    trainer.train(normalData, trainingOptions)
  }

  const UpdateHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const data = await request(`${URL_LABS}/weather`, 'PUT')
    console.log(data, 'put request')
  }

  const selectPayloadData = (selectedPayloadObject: PayloadWeatherDataProps) => {
    const existingAsset = selectedAssets.find((el) => el._id === selectedPayloadObject._id)
    if (!existingAsset) {
      selectedAssets.push(selectedPayloadObject)
      setSelectedAssets([...selectedAssets])
    } else {
      const filtredAssets = selectedAssets.filter((el) => el._id !== selectedPayloadObject._id)
      setSelectedAssets([...filtredAssets])
    }
  }

  const clearHandler = (event) => {
    event.preventDefault()
    setSelectedAssets([])
  }
  const selectAllHandler = (event) => {
    event.preventDefault()
    setSelectedAssets([])
    setSelectedAssets([...networkPayload])
  }
  useEffect(() => {
    console.log(selectedAssets, 'networkPayload')
  }, [selectedAssets])

  useEffect(() => {
    if (weatherData !== null) {
      const data = weatherData.map((el) => MakeNormalisation(el))
      setNormalData(data)
    }
  }, [weatherData])

  const DisplayActivePage = (page: Pages) => {
    switch (page) {
      case Pages.DataBasePage:
        return (
          <>
            <Block display='flex' flexDirection='row-reverse' justifyContent='space-between' width='100%'>
              <Controlers>
                <Block>
                  <Form>
                    <Block>
                      <Title>Determinate a range of data for request</Title>
                      <Block margin='0'>
                        <div>Bottom range</div>
                        <Input type='number' min={0} value={requestRangeBottom} onChange={(e) => setRequestRangeBottom(Number(e.target.value))} />
                      </Block>
                      <Block margin='0'>
                        <div>Top range</div>
                        <Input type='number' min={0} value={requestRangeTop} onChange={(e) => setRequestRangeTop(Number(e.target.value))} />
                      </Block>
                    </Block>
                    <Block>
                      <Title>Determinate a filter of data for request</Title>
                      <Block display='flex' justifyContent='space-between' margin='0'>
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
                          type={requestFilterType === WeatherFilter.city || requestFilterType === WeatherFilter.country ? 'text' : 'number'}
                          value={requestFilterValue}
                          onChange={(e) => setRequestFilterValue(e.target.value)}
                          min={MinimalInput(requestFilterType)}
                          max={MaximalInput(requestFilterType)}
                          placeholder='Write filter here'
                        />
                      </Block>
                    </Block>
                    <Block>
                      <Button type='submit' onClick={GeneratorHandlerWeatherData}>
                        Download weather data
                      </Button>
                    </Block>
                  </Form>
                </Block>
              </Controlers>
              <DashBoard>
                {loading ? (
                  <Loader />
                ) : weatherData ? (
                  weatherData.map((data, index) =>
                    index !== 100 && index < 100 ? (
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
                    ) : (
                      'No data'
                    )
                  )
                ) : (
                  "Weather data wasn't download"
                )}
              </DashBoard>
            </Block>
            <br />
            <Heading>Network payload</Heading>
            <Block display='flex' justifyContent='space-between' width='100%'>
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
                      />
                    ) : (
                      'No data'
                    )
                  )
                ) : (
                  "Weather data wasn't download"
                )}
              </DashBoard>
              <Controlers>
                <Block width='100%'>
                  <Form>
                    <Title>Network Controller</Title>
                    <Block margin='0'>
                      <Button onClick={NetworkHandler}>Train Network</Button>
                    </Block>
                    <Block justifyContent='space-between' display='flex' width='100%' margin='0'>
                      <Button onClick={selectAllHandler}>Select all</Button>
                      <Button onClick={clearHandler}>Clear </Button>
                    </Block>
                  </Form>
                </Block>
              </Controlers>
            </Block>
          </>
        )
      case Pages.NeuralNetworkPage:
        return <>Network Page</>
      default:
        return <h1>Select page</h1>
    }
  }

  return (
    <ContainerBig>
      <Heading>This page for labs works with databases and Neural Network</Heading>
      <NavigationBlock>
        <Button
          margin='0 1rem'
          onClick={() => {
            setActivePage(Pages.DataBasePage)
          }}
        >
          {/* <Link href='/labs'> */}
          {/* <a>Database</a> */}
          {/* </Link> */}
          DataBase
        </Button>
        <Button
          margin='0 1rem'
          onClick={() => {
            setActivePage(Pages.NeuralNetworkPage)
          }}
        >
          {/* <Link href='/labs/neural_network' > */}
          {/* <a>Neural Network</a> */}
          {/* </Link> */}
          Neural Network
        </Button>
      </NavigationBlock>
      {DisplayActivePage(activePage)}
    </ContainerBig>
  )
}

export default Labs

const NavigationBlock = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
`

const Heading = styled.h2`
  font-size: 2rem;
  text-transform: uppercase;
`

const Controlers = styled.div`
  justify-content: start;
  display: flex;
  border: 0.2rem solid #000;
  flex: 0 1 16.5%;
`
const DashBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 560px;
  overflow-y: scroll;
  border: 0.2rem solid #000;
  flex: 0 1 82.5%;
`
interface BlockProps {
  flexDirection?: string
  display?: string
  justifyContent?: string
  margin?: string
  width?: string
}

const Block = styled.div<BlockProps>`
  ${({ width }) => (width ? `width:${width}` : '')};
  ${({ margin }) => (margin ? `margin:${margin}` : 'margin: 0 0.5rem;')};
  ${({ display }) => (display ? `display:${display}` : '')};
  ${({ flexDirection }) => (flexDirection ? `flex-direction:${flexDirection}` : '')};
  ${({ justifyContent }) => (justifyContent ? `justify-content:${justifyContent}` : '')};
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 0 1.5rem;
  align-items: flex-start;
`

const Title = styled.h3`
  margin: 1rem 0;
`

const Input = styled.input`
  padding: 0;
  width: 10rem;
  min-height: 25px;
`

const Select = styled.select`
  min-height: 25px;
  margin: 0 0.2rem 0 0;
`

const Option = styled.option``

interface ButtonProps {
  margin?: string
  padding?: string
}

const Button = styled.button<ButtonProps>`
  ${({ margin }) => (margin ? `margin: ${margin};` : `margin: 1rem 0;`)}
  ${({ padding }) => (padding ? `padding: ${padding};` : 'padding: 0.5rem 2rem;')}
  color: white;
  background-color: #000;
  border: 1px solid #fff;
  cursor: pointer;
`
