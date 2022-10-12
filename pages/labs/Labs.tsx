import { NextPage } from 'next'
import { ContainerBig } from '../../components/Layouts'
import { LabsProps } from '../../types/Labs'
import { useFetch } from '../../hooks/useFetch'
import { URL_LABS } from '../../constants/URLS'
import { useState } from 'react'
import { Loader, WeatherData } from '../../components/elements'
import styled from 'styled-components'

const Labs: NextPage<LabsProps> = () => {
  const { request, loading } = useFetch()
  const [requestLimit, setRequestLimit] = useState<number>(0)
  const [requestRangeBottom, setRequestRangeBottom] = useState<number>(0)
  const [requestRangeTop, setRequestRangeTop] = useState<number>(0)
  const [requestFilter, setRequestFilter] = useState<string>('')
  const [weatherData, setWeatherData] = useState<any[] | null>(null)

  const GeneratorHandlerWeatherData = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const data = await request(`${URL_LABS}/weather?_limit=${requestLimit}&_filter=${requestFilter}`)
    setWeatherData(data)
    console.log(data)
  }

  return (
    <ContainerBig>
      <Heading>This page for labs works with databases</Heading>
      <Controlers>
        <Block>
          <Form>
            <Block>
              <Title>Determinate a limit of data for request</Title>
              <Input type='number' max={10000} min={0} value={requestLimit} onChange={(e) => setRequestLimit(Number(e.target.value))} />
            </Block>
            <Block>
              <Title>Determinate a range of data for request</Title>
              <span>Bottom range</span>
              <Input type='number' max={250000} min={0} value={requestRangeBottom} onChange={(e) => setRequestRangeBottom(Number(e.target.value))} />
              <span>Top range</span>
              <Input type='number' max={250000} min={0} value={requestRangeTop} onChange={(e) => setRequestRangeTop(Number(e.target.value))} />
            </Block>
            <Block>
              <Title>Determinate a filter of data for request</Title>
              <Block display='flex' justifyContent='space-between' margin='0'>
                <Select>
                  <Option value='main'>Main</Option>
                  <Option value='wind'>Wind</Option>
                </Select>
                <Input type='text' value={requestFilter} onChange={(e) => setRequestFilter(e.target.value)} placeholder='Write filter here' />
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
          weatherData.map((data, index) => (
            <WeatherData
              key={index}
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
  align-items: center;
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
