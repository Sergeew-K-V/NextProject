import { NextPage } from 'next'
import { ContainerBig } from '../../components/Layouts'
import { LabsProps } from '../../types/Labs'
import { useFetch } from '../../hooks/useFetch'
import { URL_LABS } from '../../constants/URLS'
import { useState } from 'react'
import styled from 'styled-components'

const Labs: NextPage<LabsProps> = () => {
  const { request } = useFetch()
  const [requestLimit, setRequestLimit] = useState<number>(0)
  const [weatherData, setWeatherData] = useState<any[] | null>(null)

  const GeneratorHandlerWeatherData = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const data = await request(`${URL_LABS}/weather?_limit=${requestLimit}`)
    setWeatherData(data)
    console.log(data)
  }

  return (
    <ContainerBig>
      <Heading>This page for labs works with databases</Heading>
      <Controlers>
        <Flex>
          <Form>
            <Title>Go to fetch</Title>
            <Input type='number' max={10000} min={0} value={requestLimit} onChange={(e) => setRequestLimit(Number(e.target.value))} />
            <Flex>
              <Button type='submit' onClick={GeneratorHandlerWeatherData}>
                Download weather data
              </Button>
            </Flex>
          </Form>
        </Flex>
      </Controlers>
      <span>
        {weatherData
          ? weatherData.map((data, index) => (
              <div key={index}>
                {JSON.stringify(data)} <br />
              </div>
            ))
          : "Weather data wasn't download"}
      </span>
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

const Flex = styled.div`
  flex: 0 1 50%;
`

const Form = styled.form``

const Title = styled.h3`
  margin: 1rem 0;
`

const Input = styled.input`
  width: 80%;
  max-width: 240px;
`

const Button = styled.button`
  padding: 0.5rem 2rem;
  margin: 1rem 0;
  color: white;
  background-color: #000;
  border: 1px solid #fff;
  cursor: pointer;
`
