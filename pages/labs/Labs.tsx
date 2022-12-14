import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { ContainerBig } from '../../components/Layouts'
import { Button, Heading } from '../../components/elements'
import { LabsProps, Pages } from '../../types/LabsTypes'
import styled from 'styled-components'
import DataBasePage from './dataBasePage'
import NeuralNetworkPage from './neuralNetworkPage'

const Labs: NextPage<LabsProps> = ({ preloadWeatherData }) => {
  const [activePage, setActivePage] = useState<Pages>(Pages.DataBasePage)

  const [weatherData, setWeatherData] = useState<any[] | string | null>(null)
  
  const DisplayActivePage = (page: Pages) => {
    switch (page) {
      case Pages.NeuralNetworkPage:
        return <NeuralNetworkPage weatherData={weatherData} />
      case Pages.DataBasePage:
        return <DataBasePage weatherData={weatherData} setWeatherData={setWeatherData} />
      default:
        return <h1>Select page</h1>
    }
  }

  useEffect(()=>{
    if(!Array.isArray(preloadWeatherData)){
      setWeatherData(preloadWeatherData.message)
    }else{
      setWeatherData(preloadWeatherData)
    }
  },[preloadWeatherData])

  return (
    <ContainerBig>
      <Heading>This page for labs works with databases and Neural Network</Heading>
      <NavigationBlock>
        <Button
          margin='0 1rem'
          onClick={() => {
            setActivePage(Pages.DataBasePage)
          }}
        >
          DataBase
        </Button>
        <Button
          margin='0 1rem'
          onClick={() => {
            setActivePage(Pages.NeuralNetworkPage)
          }}
        >
          Neural Network
        </Button>
      </NavigationBlock>
      {DisplayActivePage(activePage)}
    </ContainerBig>
  )
}

export default Labs

const NavigationBlock = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
`
