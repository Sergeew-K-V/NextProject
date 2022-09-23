import { NextPage } from 'next'
import { ContainerBig } from '../../components/Layouts'
import styled from 'styled-components'

interface LabsProps {}

const Labs: NextPage<LabsProps> = () => {
  return (
    <ContainerBig>
      <Heading>This page for labs works with databases</Heading>
      <Controlers>
        <Flex>
          <Form>
            <Title>Title 1</Title>
            <Input type='text' />
            <Title>Title 2</Title>
            <Input type='text' />
            <Flex>
              <Button type='submit'>Send</Button>
            </Flex>
          </Form>
        </Flex>
        <Flex>
          <Form>
            <Title>Title 1</Title>
            <Input type='' />
            <Title>Title 2</Title>
            <Input type='text' />
            <Flex>
              <Button type='submit'>Send</Button>
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

interface InputProps {}

const Input = styled.input<InputProps>`
  width: 80%;
  max-width: 240px;
`

const Button = styled.button`
  padding: 0.5rem 2rem;
  margin: 1rem 0;
  color: white;
  background-color: #000;
  border: 1px solid #fff;
`
