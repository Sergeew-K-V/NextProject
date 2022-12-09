import GetDeepKeyObject from "./GetDeepKeyObject"

const GetArrayForDoughnut = (data: Array<any>, targetField: string) => {
  const doughnutKeyArray: any[] = []
  if (data?.length !== 0) {
    data?.map((el) => {
      const existElement = doughnutKeyArray.find((obj) => obj.type === GetDeepKeyObject(el, targetField))

      if (existElement) {
        existElement.entries++
      } else {
        doughnutKeyArray.push({ type: GetDeepKeyObject(el, targetField), entries: 1 })
      }
    })
  }
  return doughnutKeyArray
}

export default GetArrayForDoughnut
