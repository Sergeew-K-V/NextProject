import { NextPage } from "next"
import { useEffect, useState } from "react"
import { PayloadWeatherData } from "../../../components"
import {
  Block,
  Button,
  Controlers,
  DashBoard,
  Form,
  Heading,
  Input,
  Title,
  StatusBar,
  Status,
  NetworkForm,
  Label,
  Checkbox,
} from "../../../components/elements"
import { defaultStateOfNetworkPayload, WeatherRange } from "../../../constants"
import { PayloadWeatherDataProps, Weather } from "../../../types/LabsTypes"
import { isLocked, MakeDeNormalisation, MakeNormalisation } from "../../../utils"
import { Architect, Trainer } from "synaptic"

interface NeuralNetworkPageProps {
  weatherData: Weather[] | string | null
}

const NeuralNetworkPage: NextPage<NeuralNetworkPageProps> = ({ weatherData }) => {
  const [isForm, setIsForm] = useState<boolean>(true)
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

  const [trainingSet, setTrainingSet] = useState({
    rate: 0.1,
    iterations: 20000,
    error: 0.0003,
  })

  const [neuralNetwork, setNeuralNetwork] = useState<any>()
  const [networkPayload, setNetworkPayload] = useState<Array<any>>(defaultStateOfNetworkPayload)

  const [selectedAssets, setSelectedAssets] = useState<Array<any>>([])
  const [normalisedSelectedAssets, setNormalisedSelectedAssets] = useState<Array<any>>([])

  const [trainerResult, setTrainerResult] = useState<{ error: number; iterations: number; time: number } | null>(null)

  const [total, setTotal] = useState<Array<any>>()

  const [testError, setTestError] = useState<number | null>(null)

  const changeForm = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setForm({ ...form, [name]: Number(event.target.value) })
  }

  const [normalForm, setNormalForm] = useState<any>()

  const NetworkHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    if(Array.isArray(weatherData)){
      
    const neuralNetwork = new Architect.Perceptron(4, 3, 1)
    const trainer = new Trainer(neuralNetwork)

    const normalisatedData = weatherData?.map((el) => {
      return MakeNormalisation(el)
    })

    if (!normalisatedData) return ""

    const maxLength = normalisatedData?.length
    let little = 0
    if (maxLength) {
      little = maxLength / 5
    }
    const trainingPart = normalisatedData?.slice(Math.round(little), maxLength)

    const testingPart = normalisatedData?.slice(trainingPart?.length, maxLength)

    const result = trainer.train(trainingPart as Trainer.TrainingSet, trainingSet)

    const error = trainer.test(testingPart as Trainer.TrainingSet, trainingSet)
    setTestError(error.error)

    setNeuralNetwork({ ...neuralNetwork })
    setTrainerResult({ ...result })
    setStatus({ ...status, trained: true })
    }else{
      return ''
    }
  }

  const handleNormalisation = (event: any) => {
    event?.preventDefault()
    if (isForm) {
      const fullForm = {
        main: { pressure: form.pressure, humidity: form.humidity },
        city: {
          coord: { lat: form.lat, lon: form.lon },
        },
      }
      const normalObj = MakeNormalisation(fullForm)
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
    if (isForm) {
      const activatedData = neuralNetwork.activate(normalForm.input)
      const arr = []
      const obj = { ...form, temp: MakeDeNormalisation(activatedData)[0] }
      arr?.push(obj)
      setTotal(arr)
    } else {
      const activatedData = normalisedSelectedAssets.map((el) => {
        return neuralNetwork.activate(el.input)
      })
    }
  }

  useEffect(() => {
    if (isForm) {
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
  }, [selectedAssets, form, status, isForm])

  return (
    <>
      <Block display="flex">
        <Block>
          <Heading>Network page</Heading>
          <Title>Total count of data for trainer: {weatherData?.length}</Title>
        </Block>
      </Block>
      <Block display="flex" justifyContent="space-between" width="100%" margin="0 0 3rem">
        {!isForm && (
          <DashBoard height="740px" flex="0 0 82%">
            {networkPayload
              ? networkPayload.map((data) => {
                  return (
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
                  )
                })
              : "Weather data wasn't download"}
          </DashBoard>
        )}
        {isForm && (
          <>
            <NetworkForm>
              <Title textAlign="center">Insert options for forecasting</Title>
              <Block margin="1rem" width="100%">
                <Label>Write latitude of region:</Label>
                <Input
                  type="number"
                  width="90%"
                  value={form.lat}
                  max={WeatherRange.latMax}
                  min={WeatherRange.latMin}
                  onChange={(event) => changeForm(event, "lat")}
                />
              </Block>
              <Block margin="1rem" width="100%">
                <Label>Write longitude of region:</Label>
                <Input
                  type="number"
                  width="90%"
                  value={form.lon}
                  max={WeatherRange.lonMax}
                  min={WeatherRange.lonMin}
                  onChange={(event) => changeForm(event, "lon")}
                />
              </Block>
              <Block margin="1rem" width="100%">
                <Label>Write pressure of region:</Label>
                <Input
                  type="number"
                  width="90%"
                  value={form.pressure}
                  max={WeatherRange.pressureMax}
                  min={WeatherRange.pressureMin}
                  onChange={(event) => changeForm(event, "pressure")}
                />
              </Block>
              <Block margin="1rem" width="100%">
                <Label>Write humidity of region:</Label>
                <Input
                  type="number"
                  width="90%"
                  value={form.humidity}
                  max={WeatherRange.humidityMax}
                  min={WeatherRange.humidityMin}
                  onChange={(event) => changeForm(event, "humidity")}
                />
              </Block>
            </NetworkForm>
            <DashBoard height="auto" minHeight="100%" flex="0 0 65%">
              {total && total?.length !== 0
                ? total.map((el, index) => {
                    return (
                      <PayloadWeatherData
                        key={el._id}
                        _id={index}
                        lat={el.lat}
                        lon={el.lon}
                        pressure={el.pressure}
                        humidity={el.humidity}
                        temp={el.temp.toFixed(1)}
                      />
                    )
                  })
                : "no data"}
            </DashBoard>
          </>
        )}

        <Controlers flex="0 0 16%">
          <StatusBar>
            {!isForm && (
              <Block display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                <Status completed={status.selected} />
                <span>Selected data</span>
              </Block>
            )}
            {isForm && (
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
          </StatusBar>
          <Block width="100%">
            <Form>
              <Block display="flex" alignItems="center" justifyContent="space-between" width="100%" margin="0">
                <Title>Network Controller</Title>
                <Checkbox selected={isForm} selectedColor="#145f69" defaultColor="#fff">
                  <div className="label" />
                  <input id="checkbox" type="checkbox" checked={isForm} onChange={() => setIsForm(!isForm)} />
                </Checkbox>
              </Block>
              {!isForm && (
                <Block justifyContent="space-between" display="flex" width="100%" margin="0">
                  <Button onClick={selectAllHandler}>Select all</Button>
                  <Button onClick={clearHandler}>Clear choses</Button>
                </Block>
              )}
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
                  <div>Approximate error:</div>
                  <Input value={trainingSet.error} onChange={(event) => setTrainingSet({ ...trainingSet, error: Number(event.target.value) })} />
                </Block>
              </Block>
              <hr style={{ width: "100%" }} />
              {testError && (
                <>
                  <hr style={{ width: "100%" }} />
                  <Block>Test error: {testError.toFixed(3)}</Block>
                </>
              )}
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
                <Button onClick={activateNetwork} locked={isLocked(isForm, status)} width="100%">
                  Use neural network
                </Button>
              </Block>
              <Block>
                <Title>Training results</Title>
                <Block margin="0.5rem ">Result error: {trainerResult?.error.toFixed(5)}</Block>
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
