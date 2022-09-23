import { NextPage } from 'next'
import { ContainerBig } from '../../components/Layouts'
import styled from 'styled-components'

interface LabsProps {}

const Labs: NextPage<LabsProps> = () => {
  return (
    <ContainerBig>
      <Heading>This page for labs works with databases</Heading>
    </ContainerBig>
  )
}

export default Labs

const Heading = styled.h2`
  font-size: 2rem;
  text-transform: uppercase;
`
