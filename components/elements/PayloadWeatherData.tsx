import { FC, useState } from 'react'
import styled from 'styled-components'

interface PayloadWeatherDataProps {
  lat?: number
  lon?: number
  temp?: number
  pressure?: number
  humidity?: number
}

const PayloadWeatherData: FC<PayloadWeatherDataProps> = ({ temp, pressure, humidity, lat, lon }) => {
  return (
    <Container>
      <Flex>
        <Title>City: Novocherkassk || Country: RU</Title>
        <DataInfo>
          <div>
            Latitude: {lat !== undefined || lat !== null ? <ColoredText>{lat}</ColoredText> : <ColoredText color='red'>No data</ColoredText>}
            &nbsp;|| Longitude:{lon !== undefined || lon !== null ? <ColoredText>{lon}</ColoredText> : <ColoredText color='red'>No data</ColoredText>}
          </div>
          <div>Average temp: {temp !== undefined || temp !== null ? <ColoredText>{temp} &deg;C</ColoredText> : <ColoredText color='red'>No data</ColoredText>}</div>
          <div>Pressure: {pressure !== undefined || pressure !== null ? <ColoredText>{pressure} мм рт. ст.</ColoredText> : <ColoredText color='red'>No data</ColoredText>}</div>
          <div>Humidity: {humidity !== undefined || humidity !== null ? <ColoredText>{humidity} %</ColoredText> : <ColoredText color='red'>No data</ColoredText>}</div>
        </DataInfo>
      </Flex>
    </Container>
  )
}

export default PayloadWeatherData

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
