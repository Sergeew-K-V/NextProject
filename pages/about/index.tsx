import { NextPage } from 'next'
import { ReactElement } from 'react'
import ContainerBig from '../../components/Layouts/ContainerBig'

const About: NextPage = (): ReactElement => {
  return (
    <ContainerBig>
      <h1>About Page</h1>
      <p>This app about how I been learing Next JS.</p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi temporibus recusandae quam
        iusto doloremque magni tenetur in dolores expedita. Nisi dolor rerum sapiente, dolorem ea
        reprehenderit totam non fuga omnis quidem impedit dolore porro minus voluptas aspernatur
        molestias tenetur saepe expedita inventore iste modi? Fuga voluptatibus voluptas distinctio
        velit maxime?
      </p>
    </ContainerBig>
  )
}

export default About
