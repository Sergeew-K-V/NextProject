import { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'
import { Loader } from '../../components/elements'
import { useFetch } from '../../hooks/useFetch'

const JavaPage: NextPage = () => {
  const [lng, setLng] = useState(0)
  const [lat, setLat] = useState(0)

  const [list, setList] = useState<Array<any>>([])

  const submitHandler = async (event: any) => {
    event.preventDefault()
    const data = await request(`http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}.358&lng=${lng}.881&username=kirilltheframe`)

    if (data.geonames.length === 0) {
      return confirm(`By your request data wasn'listt find`)
    }
    const dataList = [...list]
    if (list && list.find((el: any) => el.geonameId === data.geonames[0].geonameId)) {
      return confirm(`Such example already contained in list`)
    }
    dataList.push(...data.geonames)
    setList(dataList)
  }

  const { request, loading } = useFetch()

  return (
    <Block flexDirection='column' display='flex' width='100%'>
      <Block display='flex' margin='3rem 0'>
        <Controlers>
          <Block display='flex' flexDirection='column'>
            <Title>Add latitude for request:</Title>
            <Input value={lat} onChange={(event) => setLat(event.target.value)} type='number' />

            <Title>Add longtitude for request:</Title>
            <Input value={lng} onChange={(event) => setLng(event.target.value)} type='number' />
            <Block>
              <Button onClick={submitHandler}>Make request</Button>
            </Block>
          </Block>
        </Controlers>{' '}
        <DashBoard>
          {loading ? (
            <Loader />
          ) : list?.length !== 0 ? (
            list.map((el, index) => {
              return <CustomElement key={index} element={el} />
            })
          ) : (
            `Data wasn't loaded`
          )}
        </DashBoard>
      </Block>
    </Block>
  )
}

export default JavaPage

const CustomElement = (element: any) => {
  const data = element.element
  return (
    <Container>
      <Flex>
        <DataInfo>
          <Title>Element ID: {data.geonameId}</Title>
          <div>Name: {data.name}</div>
          <div>Country: {data.countryName}</div>
          <div>Distance: {data.distance}</div>
          <div>Country Code: {data.countryCode}</div>
          <div>Region: {data.fclName}</div>
          <Title>Coord:</Title>
          <div>Latitude: {data.lat}</div>
          <div>Longtitude: {data.lng}</div>
        </DataInfo>
      </Flex>
    </Container>
  )
}

interface ColoredTextProps {
  color?: string
}

const ColoredText = styled.span<ColoredTextProps>`
  ${({ color }) => (color ? `color:${color}` : 'color:#1000ff')};
`

const Controlers = styled.div`
  justify-content: start;
  display: flex;
  border: 0.2rem solid #000;
  flex: 0 1 16.5%;
`

const Container = styled.div<ContainerProps>`
  position: relative;
  height: max-content;
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
      : ''};
`

interface ContainerProps {
  selected?: boolean
}

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
`

const DataInfo = styled.div`
  font-size: 1.2rem;
  padding: 0 0.5rem 1rem;
  color: #000;
`

const DashBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 560px;
  border: 0.2rem solid #000;
  flex: 0 1 82.5%;
`
interface BlockProps {
  flexDirection?: string
  display?: string
  justifyContent?: string
  margin?: string
  width?: string
  height?: string
  flex?: string
}

const Block = styled.div<BlockProps>`
  ${({ width }) => (width ? `width:${width}` : '')};
  ${({ margin }) => (margin ? `margin:${margin}` : 'margin: 0 0.5rem;')};
  ${({ display }) => (display ? `display:${display}` : '')};
  ${({ flexDirection }) => (flexDirection ? `flex-direction:${flexDirection}` : '')};
  ${({ justifyContent }) => (justifyContent ? `justify-content:${justifyContent}` : '')};
  ${({ height }) => (height ? `height:${height}` : `height:auto`)};
  ${({ flex }) => (flex ? `flex:${flex}` : '')};
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 0 1.5rem;
  align-items: flex-start;
`

const Title = styled.h3`
  margin: 1rem 0;
`

const Input = styled.input`
  padding: 0;
  width: 10rem;
  min-height: 25px;
`

const Select = styled.select`
  min-height: 25px;
  margin: 0 0.2rem 0 0;
`

const Option = styled.option``

interface ButtonProps {
  margin?: string
  padding?: string
  width?: string
}

const Button = styled.button<ButtonProps>`
  ${({ margin }) => (margin ? `margin: ${margin};` : `margin: 1rem 0;`)}
  ${({ padding }) => (padding ? `padding: ${padding};` : 'padding: 0.5rem 2rem;')}
  ${({ width }) => (width ? `width:${width};` : 'width:auto;')}
  color: white;
  background-color: #000;
  border: 1px solid #fff;
  cursor: pointer;
`
