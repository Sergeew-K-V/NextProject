import { NextPage } from 'next'
import { ContainerBig } from '../../components/Layouts'
import styled from 'styled-components'
import { LabsProps } from '../../types/Labs'
import { useFetch } from '../../hooks/useFetch'
import { URL_LABS } from '../../constants/URLS'

const Labs: NextPage<LabsProps> = () => {
  const { request } = useFetch()

  const GeneratorHandlerWeatherData = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const data = await request(`${URL_LABS}/weather?_limit=1000`)
    console.log(data)
  }

  return (
    <ContainerBig>
      <Heading>This page for labs works with databases</Heading>
      <Controlers>
        <Flex>
          <Form>
            <Title>Go to fetch</Title>
            <Flex>
              <Button type='submit' onClick={GeneratorHandlerWeatherData}>
                FETCH
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
