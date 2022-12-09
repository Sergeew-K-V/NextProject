import { NextPage } from "next"
import { useState } from "react"
import { PayloadWeatherData } from "../../../components"
import { Block, Button, Controlers, DashBoard, Form, Heading, Input, Loader, Title } from "../../../components/elements"
import { defaultStateOfNetworkPayload } from "../../../constants"
import { PayloadWeatherDataProps } from "../../../types/LabsTypes"
import { MakeNormalisation } from "../../../utils"

interface NeuralNetworkPageProps {
  weatherData: any[] | null
}

const NeuralNetworkPage: NextPage<NeuralNetworkPageProps> = ({ weatherData }) => {
  const [neuralNetwork, setNeuralNetwork] = useState<any>()
  const [networkPayload, setNetworkPayload] = useState<Array<any>>(defaultStateOfNetworkPayload)

  const [selectedAssets, setSelectedAssets] = useState<Array<any>>([])
  const [normalisedSelectedAssets, setNormalisedSelectedAssets] = useState<Array<any>>([])

  const [trainingSet, setTrainingSet] = useState({
    rate: 0.1,
    iterations: 20000,
    error: 0.0003,
  })
  const [trainerResult, setTrainerResult] = useState<{ error: number; iterations: number; time: number } | null>(null)

  const NetworkHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const neuralNetwork = new Architect.Perceptron(4, 3, 1)
    const trainer = new Trainer(neuralNetwork)

    const normalisatedData = weatherData?.map((el) => {
      return MakeNormalisation(el)
    })
    if (!normalisatedData) return ""
    const result = trainer.train(normalisatedData, trainingSet)
    setNeuralNetwork({ ...neuralNetwork })
    setTrainerResult({ ...result })
  }

  const handleNormalisation = (event: any) => {
    event?.preventDefault()
    const data = selectedAssets.map((el) => MakeNormalisation(el))
    setNormalisedSelectedAssets(data)
  }

  const selectPayloadData = (selectedPayloadObject: PayloadWeatherDataProps) => {
    const existingAsset = selectedAssets.find((el: any) => el._id === selectedPayloadObject._id)
    if (!existingAsset) {
      networkPayload.find((el: any) => {
        if (el._id === selectedPayloadObject._id) {
          el.selected = true
        }
      })
      selectedAssets.push(selectedPayloadObject)
      setSelectedAssets([...selectedAssets])
    } else {
      const filtredAssets = selectedAssets.filter((el: any) => el._id !== selectedPayloadObject._id)
      networkPayload.find((el) => {
        if (el._id === selectedPayloadObject._id) {
          el.selected = false
        }
      })
      setSelectedAssets([...filtredAssets])
    }
  }

  const clearHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setSelectedAssets([])
    networkPayload.forEach((el) => (el.selected = false))
  }

  const selectAllHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    networkPayload.forEach((el: any) => (el.selected = true))
    setSelectedAssets([...networkPayload])
  }

  const activateNetwork = (event: React.MouseEvent<HTMLElement>) => {
    neuralNetwork.activate()
  }
  return (
    <>
      <Heading>Network page</Heading>
      <Block display="flex" justifyContent="space-between" width="100%" margin="0 0 3rem">
        <DashBoard height="740px">
          {networkPayload
            ? networkPayload.map((data, index) =>
                index !== 100 && index < 100 ? (
                  <PayloadWeatherData
                    onSelect={async () => selectPayloadData(data)}
                    key={data._id}
                    city={data.city.name}
                    country={data.city.country}
                    temp={data.main.temp}
                    pressure={data.main.pressure}
                    humidity={data.main.humidity}
                    lat={data.city.coord.lat}
                    lon={data.city.coord.lon}
                    selected={data.selected}
                  />
                ) : (
                  "No data"
                )
              )
            : "Weather data wasn't download"}
        </DashBoard>
        <Controlers>
          <Block width="100%">
            <Form>
              <Title>Network Controller</Title>
              <Block justifyContent="space-between" display="flex" width="100%" margin="0">
                <Button onClick={selectAllHandler}>Select all</Button>
                <Button onClick={clearHandler}>Clear choses</Button>
              </Block>
              <hr style={{ width: "100%" }} />
              <Block>
                <Title>Training options</Title>
                <Block>
                  <div>Insert rate:</div>
                  <Input value={trainingSet.rate} onChange={(event) => setTrainingSet({ ...trainingSet, rate: Number(event.target.value) })} />
                </Block>
                <Block>
                  <div>Number of iterations:</div>
                  <Input
                    value={trainingSet.iterations}
                    onChange={(event) => setTrainingSet({ ...trainingSet, iterations: Number(event.target.value) })}
                  />
                </Block>
                <Block>
                  <div> Approximate error:</div>
                  <Input value={trainingSet.error} onChange={(event) => setTrainingSet({ ...trainingSet, error: Number(event.target.value) })} />
                </Block>
              </Block>
              <hr style={{ width: "100%" }} />
              <Block margin="0" width="100%">
                <Button onClick={NetworkHandler} width="100%">
                  Train Network
                </Button>
              </Block>
              <hr style={{ width: "100%" }} />
              <Block margin="0" width="100%">
                <Button onClick={(event) => handleNormalisation(event)} width="100%">
                  Normalisation
                </Button>
              </Block>
              <hr style={{ width: "100%" }} />
              <Block margin="0" width="100%">
                <Button onClick={activateNetwork} width="100%">
                  Use neural network
                </Button>
              </Block>
              <Block>
                <Title>Training results</Title>
                <Block margin="0.5rem ">Result error: {trainerResult?.error}</Block>
                <Block margin="0.5rem ">Result iterations: {trainerResult?.iterations}</Block>
                <Block margin="0.5rem ">Result time: {trainerResult?.time}</Block>
              </Block>
            </Form>
          </Block>
        </Controlers>
      </Block>
    </>
  )
}

export default NeuralNetworkPage
