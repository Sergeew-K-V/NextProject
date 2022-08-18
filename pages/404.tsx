import { useRouter } from 'next/router'
import ContainerBig from '../components/Layouts/ContainerBig'

export default function Custom404() {
  const router = useRouter()

  const onClickHandler = (): void => {
    router.push('/')
  }

  return (
    <ContainerBig>
      <div className='wrapper'>
        <h1>404 - Page Not Found</h1>
        <button onClick={onClickHandler}>Go to Home Page</button>
      </div>
      <style jsx>{`
        .wrapper {
          display: flex;
          height: 100%;
          justify-content: center;
          align-items: center;
        }
        button {
          cursor: pointer;
          margin: 1rem;
          height: 32px;
          text-transform: uppercase;
          background-color: #000000;
          color: #ffffff;
          border: 0;
        }
      `}</style>
    </ContainerBig>
  )
}
