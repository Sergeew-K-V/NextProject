import { FC } from "react"
import styled from "styled-components"
import { PayloadWeatherDataProps } from "../types/LabsTypes"

const PayloadWeatherData: FC<PayloadWeatherDataProps> = ({ temp, city, country, pressure, humidity, lat, lon, onSelect, selected }) => {
  return (
    <Container selected={selected}>
      <Checkbox>
        <div className="label" />
        <input id="checkbox" type="checkbox" checked={selected} onChange={onSelect} />
      </Checkbox>
      <Flex>
        <Title>
          City: {city} || Country: {country}
        </Title>
        <DataInfo>
          <div>
            Latitude: {lat !== undefined || lat !== null ? <ColoredText>{lat}</ColoredText> : <ColoredText color="red">No data</ColoredText>}
            &nbsp;|| Longitude:{lon !== undefined || lon !== null ? <ColoredText>{lon}</ColoredText> : <ColoredText color="red">No data</ColoredText>}
          </div>
          <div>
            Average temp:{" "}
            {temp !== undefined || temp !== null ? <ColoredText>{temp} &deg;C</ColoredText> : <ColoredText color="red">No data</ColoredText>}
          </div>
          <div>
            Pressure:{" "}
            {pressure !== undefined || pressure !== null ? (
              <ColoredText>{pressure} мм рт. ст.</ColoredText>
            ) : (
              <ColoredText color="red">No data</ColoredText>
            )}
          </div>
          <div>
            Humidity:{" "}
            {humidity !== undefined || humidity !== null ? <ColoredText>{humidity} %</ColoredText> : <ColoredText color="red">No data</ColoredText>}
          </div>
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
  ${({ color }) => (color ? `color:${color}` : "color:#1000ff")};
`
const Checkbox = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  height: 1.5rem;
  width: 1.5rem;
  margin: 0.25rem;

  .label {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #145f69;
    border: 1px solid #000;
    border-radius: 50%;
    height: 1.5rem;
    width: 1.5rem;
  }

  .label:after {
    position: absolute;
    border: 2px solid #000;
    border-top: none;
    border-right: none;
    content: "";
    height: 0.5rem;
    opacity: 0;
    transform: translate(25%, 50%) rotate(-45deg);
    width: 0.8rem;
  }

  input[type="checkbox"] {
    opacity: 0;
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    margin: 0;
  }
`

const Container = styled.div<ContainerProps>`
  position: relative;
  flex: 0 0 480px;
  border: 0.2rem solid #000;
  margin: 0.5rem;
  color: #fff;
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
      }
      .label:after {
        opacity:1;
      }
      .label {
        background-color: #fff;
        border-color: #000;
      }`
      : ""};
`

interface ContainerProps {
  selected?: boolean
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
    content: "";
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
