import { NextPage } from "next"
import { useEffect, useState } from "react"
import { PayloadWeatherData } from "../../../components"
import { Block, Button, Controlers, DashBoard, Form, Heading, Input, Title, StatusBar, Status } from "../../../components/elements"
import { defaultStateOfNetworkPayload } from "../../../constants"
import { PayloadWeatherDataProps } from "../../../types/LabsTypes"
import { MakeNormalisation, MakeNormalisationForActivate } from "../../../utils"
import { Architect, Trainer } from "synaptic"
import styled from "styled-components"

interface NeuralNetworkPageProps {
  weatherData: any[] | null
}

const NeuralNetworkPage: NextPage<NeuralNetworkPageProps> = ({ weatherData }) => {
  const [isShowForm, setIsShowForm] = useState<boolean>(true)

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

  const [status, setStatus] = useState({
    trained: false,

    selected: false,
    normalised: false,

    filled: false,
  })

  const [form, setForm] = useState({
    lat: 0,
    lon: 0,
    pressure: 0,
    humidity: 0,
  })

  const changeForm = (event: any, name: string) => {
    setForm({ ...form, [name]: Number(event.target.value) })
  }

  const [normalForm, setNormalForm] = useState()

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
    setStatus({ ...status, trained: true })
  }

  const handleNormalisation = (event: any) => {
    event?.preventDefault()
    if (isShowForm) {
      const normalObj = MakeNormalisationForActivate(form)
      setNormalForm(normalObj)
      setStatus({ ...status, normalised: true })
    } else {
      if (selectedAssets.length !== 0) {
        const data = selectedAssets.map((el) => MakeNormalisation(el))
        setNormalisedSelectedAssets(data)
        setStatus({ ...status, normalised: true })
      } else {
        alert("You didn`t select any assets")
      }
    }
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
    event.preventDefault()
    const activatedData = normalisedSelectedAssets.map((el) => {
      return neuralNetwork.activate(el.input)
    })
    console.log(activatedData)
  }

  useEffect(() => {
    if (isShowForm) {
      if (form.humidity && form.lat && form.lon && form.pressure) {
        setStatus({ ...status, filled: true })
      } else {
        setStatus({ ...status, filled: false })
      }
    } else {
      if (selectedAssets.length !== 0) {
        setStatus({ ...status, selected: true })
      } else {
        setStatus({ ...status, selected: false })
      }
    }
  }, [selectedAssets, form])

  return (
    <>
      <Block display="flex">
        <Block>
          <Heading>Network page</Heading>
          <Title style={{ margin: "1rem" }}>Total count of data for trainer: {weatherData?.length}</Title>
        </Block>
        <Block display="flex" border="2px solid black" height="70px" width="270px" justifyContent="center" alignItems="center">
          {!isShowForm && (
            <Block display="flex" justifyContent="center" flexDirection="column" alignItems="center">
              <Status completed={status.selected} />
              <span>Selected data</span>
            </Block>
          )}
          {isShowForm && (
            <Block display="flex" justifyContent="center" flexDirection="column" alignItems="center">
              <Status completed={status.filled} />
              <span>Filled</span>
            </Block>
          )}
          <Block display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Status completed={status.trained} />
            <span>Trained</span>
          </Block>
          <Block display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Status completed={status.normalised} />
            <span>Normalised</span>
          </Block>
        </Block>
      </Block>
      <Block display="flex" justifyContent="space-between" width="100%" margin="0 0 3rem">
        {!isShowForm && (
          <DashBoard height="740px">
            {networkPayload
              ? networkPayload.map((data) => (
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
                ))
              : "Weather data wasn't download"}
          </DashBoard>
        )}
        {isShowForm && (
          <>
            <NetworkForm>
              <Title style={{ textAlign: "center" }}>Insert options for forecasting</Title>
              <Block margin="1rem " width="auto">
                <Label>Latitude:</Label>
                <Input
                  style={{ width: "100%" }}
                  width="90%"
                  placeholder="Write latitude of region"
                  value={form.lat}
                  onChange={(event) => changeForm(event, "lat")}
                />
              </Block>
              <Block margin="1rem " width="auto">
                <Label>Longitude:</Label>
                <Input
                  style={{ width: "100%" }}
                  placeholder="Write longitude of region"
                  value={form.lon}
                  onChange={(event) => changeForm(event, "lon")}
                />
              </Block>
              <Block margin="1rem " width="auto">
                <Label>Pressure:</Label>
                <Input
                  width="90%"
                  style={{ width: "100%" }}
                  placeholder="Write pressure of region"
                  value={form.pressure}
                  onChange={(event) => changeForm(event, "pressure")}
                />
              </Block>
              <Block margin="1rem " width="auto">
                <Label>Humidity:</Label>
                <Input
                  width="90%"
                  style={{ width: "100%" }}
                  placeholder="Write humidity of region"
                  value={form.humidity}
                  onChange={(event) => changeForm(event, "humidity")}
                />
              </Block>
            </NetworkForm>
            <DashBoard style={{ flex: "0 1 65%", height: "732px" }}></DashBoard>
          </>
        )}

        <Controlers>
          <Block width="100%">
            <Form>
              <Block display="flex" alignItems="center" justifyContent="space-between" width="100%" margin="0">
                <Title>Network Controller</Title>
                <Checkbox selected={isShowForm}>
                  <div className="label" />
                  <input id="checkbox" type="checkbox" checked={isShowForm} onChange={() => setIsShowForm(!isShowForm)} />
                </Checkbox>
              </Block>
              {!isShowForm && (
                <>
                  <Block justifyContent="space-between" display="flex" width="100%" margin="0">
                    <Button onClick={selectAllHandler}>Select all</Button>
                    <Button onClick={clearHandler}>Clear choses</Button>
                  </Block>
                  <hr style={{ width: "100%" }} />
                </>
              )}
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
                <Button
                  onClick={activateNetwork}
                  locked={
                    isShowForm
                      ? status.normalised && status.filled && status.trained
                        ? false
                        : true
                      : status.normalised && status.selected && status.trained
                      ? false
                      : true
                  }
                  width="100%"
                >
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

interface CheckBoxProps {
  selected?: boolean
}

const NetworkForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 14%;
  height: px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 0 1rem;
`

const Label = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`

const Checkbox = styled.div<CheckBoxProps>`
  z-index: 1;
  height: 1.5rem;
  width: 1.5rem;
  margin: 0.25rem;
  position: relative;

  .label {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 50%;
    height: 1.5rem;
    width: 1.5rem;
  }

  ${({ selected }) =>
    selected
      ? `
      .label:after {
        opacity:1;
      }
      .label {
        border-color: #000;
        background-color: #145f69;
      }`
      : ""}

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
