import { FC } from "react"
import { Block } from "./elements"
import { Doughnut } from "react-chartjs-2"

interface DoughnutDiagramProps {
  labelList: Array<any>
  colors: Array<any>
  label: string
}

const DoughnutDiagram: FC<DoughnutDiagramProps> = ({ labelList, colors, label }) => {
  if (!labelList) {
    return null
  }

  return (
    <Block flex="0 1 25%">
      <Doughnut
        data={{
          labels: labelList.map((el: any) => {
            return el.type
          }),
          datasets: [
            {
              label: label,
              data: labelList.map((el: any) => {
                return el.entries
              }),
              backgroundColor: colors,
              hoverOffset: 4,
            },
          ],
        }}
        options={{
          plugins: {
            legend: { position: "right" },
          },
        }}
      />
    </Block>
  )
}

export default DoughnutDiagram
