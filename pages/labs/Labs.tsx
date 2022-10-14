import { NextPage } from 'next'
import { ContainerBig } from '../../components/Layouts'
import { useFetch } from '../../hooks/useFetch'
import { URL_LABS } from '../../constants/URLS'
import { ChangeEvent, useState } from 'react'
import { Loader, WeatherData } from '../../components/elements'
import { MaximalInput, MinimalInput, QueryFilterLogic, QueryRangesLogic } from '../../helpers'
import { WeatherFilter } from '../../types/LabsTypes'
import { Architect, Layer, Network } from 'synaptic'
import styled from 'styled-components'

interface LabsProps {
  preloadWeatherData: any
}

const Labs: NextPage<LabsProps> = ({ preloadWeatherData }) => {
  const { request, loading } = useFetch()
  const [requestRangeBottom, setRequestRangeBottom] = useState<number>(0)
  const [requestRangeTop, setRequestRangeTop] = useState<number>(0)
  const [weatherData, setWeatherData] = useState<any[] | null>(preloadWeatherData)
  const [requestFilterType, setRequestFilterType] = useState<WeatherFilter>(WeatherFilter.city)
  const [requestFilterValue, setRequestFilterValue] = useState<string | number>('')

  const GeneratorHandlerWeatherData = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (requestRangeTop <= requestRangeBottom && requestRangeTop !== 0) {
      return alert('Bottom range can`t be more or equal than top range')
    }

    const data = await request(
      `${URL_LABS}/weather?${QueryRangesLogic(requestRangeBottom, requestRangeTop)}${QueryFilterLogic(requestFilterType, requestFilterValue)}`
    )

    setWeatherData(data)
    console.log(data)
  }

  const NetworkHandler = () => {
    var inputLayer = new Layer(4)
    var hiddenLayer = new Layer(6)
    var outputLayer = new Layer(2)

    inputLayer.project(hiddenLayer)
    hiddenLayer.project(outputLayer)

    var myNetwork = new Network({
      input: inputLayer,
      hidden: [hiddenLayer],
      output: outputLayer,
    })

    const NN = myNetwork.activate([1, 0, 1, 0])
  }

  return (
    <ContainerBig>
      <Heading>This page for labs works with databases</Heading>
      <Controlers>
        <Block>
          {/* <button onClick={NetworkHandler}>NN</button> */}
          <Form>
            <Block>
              <Title>Determinate a range of data for request</Title>
              <Block margin='0'>
                <span>Bottom range</span>
                <Input type='number' min={0} value={requestRangeBottom} onChange={(e) => setRequestRangeBottom(Number(e.target.value))} />
              </Block>
              <Block margin='0'>
                <span>Top range</span>
                <Input type='number' min={0} value={requestRangeTop} onChange={(e) => setRequestRangeTop(Number(e.target.value))} />
              </Block>
            </Block>
            <Block>
              <Title>Determinate a filter of data for request</Title>
              <Block display='flex' justifyContent='space-between' margin='0'>
                <Select value={requestFilterType} onChange={(e) => setRequestFilterType(e.target.value as WeatherFilter)}>
                  <Option value={WeatherFilter.city}>City</Option>
                  <Option value={WeatherFilter.country}>Country</Option>
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
          weatherData.map((data) => (
            <WeatherData
              key={data._id}
              city={data.city.name}
              country={data.city.country}
              temp={data.main.temp}
              temp_min={data.main.temp_min}
              temp_max={data.main.temp_max}
              pressure={data.main.pressure}
              humidity={data.main.humidity}
            />
          ))
        ) : (
          "Weather data wasn't download"
        )}
      </DashBoard>
    </ContainerBig>
  )
}

export default Labs

const Heading = styled.h2`
  font-size: 2rem;
  text-transform: uppercase;
`

const Controlers = styled.div`
  display: flex;
`
const DashBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 500px;
  overflow-y: scroll;
  border: 0.2rem solid #000;
  width: 81.5%;
`
interface BlockProps {
  flexDirection?: string
  display?: string
  justifyContent?: string
  margin?: string
}

const Block = styled.div<BlockProps>`
  flex: 0 1 50%;
  ${({ margin }) => (margin ? `margin:${margin}` : 'margin: 0 0.5rem;')};
  ${({ display }) => (display ? `display:${display}` : '')};
  ${({ flexDirection }) => (flexDirection ? `flexDirection:${flexDirection}` : '')};
  ${({ justifyContent }) => (justifyContent ? `justify-content:${justifyContent}` : '')};
`

const Form = styled.form`
  display: flex;
  margin: 0 0 1.5rem;
  align-items: flex-start;
`

const Title = styled.h3`
  margin: 1rem 0;
`

const Input = styled.input`
  width: 80%;
  max-width: 240px;
  min-height: 25px;
`

const Select = styled.select`
  min-height: 25px;
  margin: 0 0.2rem 0 0;
`

const Option = styled.option``

const Button = styled.button`
  padding: 0.5rem 2rem;
  margin: 1rem 0;
  color: white;
  background-color: #000;
  border: 1px solid #fff;
  cursor: pointer;
`
