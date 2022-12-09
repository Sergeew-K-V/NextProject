import { FC, useState } from 'react'
import styled from 'styled-components'

interface WeatherDataProps {
  city?: string
  country?: string
  lat?: number
  lon?: number
  temp?: number
  temp_min?: number
  temp_max?: number
  pressure?: number
  humidity?: number
  time?: number
}

const WeatherData: FC<WeatherDataProps> = ({ city, country, temp, temp_min, temp_max, pressure, humidity, lat, lon, time }) => {
  const date = time ? new Date(time * 1000).toString() : null

  return (
    <Container>
      <Flex>
        <Title>
          City: {city} || Country: {country}
        </Title>
        <DataInfo>
          <div>
            Latitude: {lat !== undefined || lat !== null ? <ColoredText>{lat}</ColoredText> : <ColoredText color='red'>No data</ColoredText>}
            &nbsp;|| Longitude:{lon !== undefined || lon !== null ? <ColoredText>{lon}</ColoredText> : <ColoredText color='red'>No data</ColoredText>}
          </div>
          <div>
            Average temp:{' '}
            {temp !== undefined || temp !== null ? <ColoredText>{temp} &deg;C</ColoredText> : <ColoredText color='red'>No data</ColoredText>}
          </div>
          <div>
            Min temp:{' '}
            {temp_min !== undefined || temp_min !== null ? (
              <ColoredText>{temp_min} &deg;C</ColoredText>
            ) : (
              <ColoredText color='red'>No data</ColoredText>
            )}
          </div>
          <div>
            Max_temp:{' '}
            {temp_max !== undefined || temp_max !== null ? (
              <ColoredText>{temp_max} &deg;C</ColoredText>
            ) : (
              <ColoredText color='red'>No data</ColoredText>
            )}
          </div>
          <div>
            Pressure:{' '}
            {pressure !== undefined || pressure !== null ? (
              <ColoredText>{pressure} мм рт. ст.</ColoredText>
            ) : (
              <ColoredText color='red'>No data</ColoredText>
            )}
          </div>
          <div>Time: {date !== undefined || date !== null ? <ColoredText>{date}</ColoredText> : <ColoredText color='red'>No data</ColoredText>}</div>
          <div>
            Humidity:{' '}
            {humidity !== undefined || humidity !== null ? <ColoredText>{humidity} %</ColoredText> : <ColoredText color='red'>No data</ColoredText>}
          </div>
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
