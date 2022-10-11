import { NextPage } from 'next'
import { ContainerBig } from '../../components/Layouts'
import { LabsProps } from '../../types/Labs'
import { useFetch } from '../../hooks/useFetch'
import { URL_LABS } from '../../constants/URLS'
import { useState } from 'react'
import styled from 'styled-components'
import WeatherData from '../../components/elements/WeatherData'

const Labs: NextPage<LabsProps> = () => {
  const { request } = useFetch()
  const [requestLimit, setRequestLimit] = useState<number>(0)
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
              <Input
                type='number'
                max={10000}
                min={0}
                value={requestLimit}
                onChange={(e) => setRequestLimit(Number(e.target.value))}
                placeholder='Max limit is 10000'
              />
            </Block>
            <Block>
              <Block>
                <Title>Determinate a filter of data for request</Title>
                <Select>
                  <Option value='main'>Main</Option>
                  <Option value='wind'>Wind</Option>
                </Select>
              </Block>
              <Block>
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
        {weatherData
          ? weatherData.map((data, index) => (
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
          : "Weather data wasn't download"}
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
  margin: 0 0 5rem;
`
interface BlockProps {
  flexDirection?: string
  display?: string
}

const Block = styled.div<BlockProps>`
  flex: 0 1 50%;
  ${({ display }) => (display ? display : '')};
  ${({ flexDirection }) => (flexDirection ? flexDirection : '')};
`

const Form = styled.form``

const Title = styled.h3`
  margin: 1rem 0;
`

const Input = styled.input`
  width: 80%;
  max-width: 240px;
`

const Select = styled.select``

const Option = styled.option``

const Button = styled.button`
  padding: 0.5rem 2rem;
  margin: 1rem 0;
  color: white;
  background-color: #000;
  border: 1px solid #fff;
  cursor: pointer;
`
