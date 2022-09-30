import { NextPage } from 'next'
import { ContainerBig } from '../../components/Layouts'
import styled from 'styled-components'
import { useState } from 'react'
import { useGenerator } from '../../hooks/useGenerator'
import { LabsProps, WeatherData } from '../../types/Labs'

const Labs: NextPage<LabsProps> = () => {
  const [howManyToGen, setHowManyToGen] = useState<number>(0)
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 0,
    pressure: 0,
    windSpeed: 0,
  })

  const {
    // GenaratorWeather,
    GeneratorWeatherData,
  } = useGenerator()

  const GeneratorHandlerWeatherData = () => {
    GeneratorWeatherData(howManyToGen, weatherData, setWeatherData)
  }

  return (
    <ContainerBig>
      <Heading>This page for labs works with databases</Heading>
      <Controlers>
        <Flex>
          <Form>
            <Title>Generate weather data</Title>
            <Input type='number' value={howManyToGen} onChange={(e) => setHowManyToGen(Number(e.target.value))} min={0} />
            <Flex>
              <Button type='submit' onClick={GeneratorHandlerWeatherData}>
                Generate
              </Button>
            </Flex>
          </Form>
        </Flex>
      </Controlers>
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
