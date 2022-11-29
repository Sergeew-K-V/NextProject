import { FC, useState } from 'react'
import styled from 'styled-components'
import { PayloadWeatherDataProps } from '../../types/LabsTypes'

const PayloadWeatherData: FC<PayloadWeatherDataProps> = ({ temp, city, country, pressure, humidity, lat, lon, onSelect }) => {
  const [selected, setSelected] = useState(false)

  const handleChange = () => {
    setSelected(!selected)
    if (onSelect) {
      onSelect()
    }
  }

  return (
    <Container selected={selected}>
      <Flex>
        <Title>
          City: {city} || Country: {country}
          <input type='checkbox' onChange={handleChange} checked={selected} />
        </Title>
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

const Container = styled.div<ContainerProps>`
  flex: 0 0 480px;
  border: 0.2rem solid #000;
  margin: 0.5rem;
  ${({ selected }) =>
    selected
      ? `
      border:3px solid #2DD700;
      background-color:#0c260e;
      h3::after {
        background-color: #fff;
      }
      span {
        color: #27ff00;
      }`
      : ''}
`

interface ContainerProps {
  selected: boolean
}

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
