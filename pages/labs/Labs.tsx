import { NextPage } from "next"
import { ContainerBig } from "../../components/Layouts"
import React, { useState } from "react"
import { Button, Heading } from "../../components/elements"
import { LabsProps, Pages, WeatherFilter } from "../../types/LabsTypes"
import { defaultStateOfNetworkPayload } from "../../constants"
import styled from "styled-components"
import DataBasePage from "./databasePage"
import NeuralNetworkPage from "./NeuralNetworkPage"

const Labs: NextPage<LabsProps> = ({ preloadWeatherData }) => {
  const [activePage, setActivePage] = useState<Pages>(Pages.DataBasePage)

  const [requestRangeBottom, setRequestRangeBottom] = useState<number>(0)
  const [requestRangeTop, setRequestRangeTop] = useState<number>(0)
  const [requestFilterType, setRequestFilterType] = useState<WeatherFilter>(WeatherFilter.city)
  const [requestFilterValue, setRequestFilterValue] = useState<string | number>("")

  const [neuralNetwork, setNeuralNetwork] = useState<any>()

  const [weatherData, setWeatherData] = useState<any[] | null>(preloadWeatherData)
  const [normalData, setNormalData] = useState<Array<any>>([])
  const [networkPayload, setNetworkPayload] = useState<Array<any>>(defaultStateOfNetworkPayload)
  const [networkNormalPayload, setNetworkNormalPayload] = useState<Array<any>>([])

  const [selectedAssets, setSelectedAssets] = useState<Array<any>>([])
  const [errorNetwork, setErrorNetwork] = useState<Array<any>>([])
  const [trainerResult, setTrainerResult] = useState<{ error: number; iterations: number; time: number } | null>(null)

  const [trainingSet, setTrainingSet] = useState({
    rate: 0.1,
    iterations: 20000,
    error: 0.0003,
  })

  const DisplayActivePage = (page: Pages) => {
    switch (page) {
      case Pages.NeuralNetworkPage:
        return <NeuralNetworkPage />
      case Pages.DataBasePage:
        return <DataBasePage />
      default:
        return <h1>Select page</h1>
    }
  }

  return (
    <ContainerBig>
      <Heading>This page for labs works with databases and Neural Network</Heading>
      <NavigationBlock>
        <Button
          margin="0 1rem"
          onClick={() => {
            setActivePage(Pages.DataBasePage)
          }}
        >
          DataBase
        </Button>
        <Button
          margin="0 1rem"
          onClick={() => {
            setActivePage(Pages.NeuralNetworkPage)
          }}
        >
          Neural Network
        </Button>
      </NavigationBlock>
      {DisplayActivePage(activePage)}
      <StatusBar></StatusBar>
    </ContainerBig>
  )
}

export default Labs

const NavigationBlock = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
`
const StatusBar = styled.div``
