import { FC } from 'react'
import styled from 'styled-components'

interface WeatherDataProps {
  city?: string
  country?: string
  temp?: number
  temp_min?: number
  temp_max?: number
  pressure?: number
  humidity?: number
}

const WeatherData: FC<WeatherDataProps> = ({ city, country, temp, temp_min, temp_max, pressure, humidity }) => {
  return (
    <Container>
      <Flex>
        <Title>
          City: {city} || Country: {country}
        </Title>
        <DataInfo>
          <div>Average temp: {temp ? <ColoredText>{temp} &deg;C</ColoredText> : <ColoredText color='red'>No data</ColoredText>}</div>
          <div>Min temp: {temp_min ? <ColoredText>{temp_min} &deg;C</ColoredText> : <ColoredText color='red'>No data</ColoredText>}</div>
          <div>Max_temp: {temp_max ? <ColoredText>{temp_max} &deg;C</ColoredText> : <ColoredText color='red'>No data</ColoredText>}</div>
          <div>Pressure: {pressure ? <ColoredText>{pressure} мм рт. ст.</ColoredText> : <ColoredText color='red'>No data</ColoredText>}</div>
          <div>Humidity: {humidity ? <ColoredText>{humidity} %</ColoredText> : <ColoredText color='red'>No data</ColoredText>}</div>
        </DataInfo>
      </Flex>
    </Container>
  )
}

export default WeatherData

interface ColoredTextProps {
  color?: string
}

const ColoredText = styled.span<ColoredTextProps>`
  ${({ color }) => (color ? `color:${color}` : 'color:#1000ff')};
`

const Container = styled.div`
  flex: 0 0 480px;
  border: 0.2rem solid #000;
  margin: 0.5rem;
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
`

const Title = styled.h3`
  font-size: 1.2rem;
  text-transform: uppercase;
  position: relative;
  ::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #000;
  }
`
const DataInfo = styled.div`
  font-size: 1.2rem;
  padding: 0 0.5rem 1rem;
`
