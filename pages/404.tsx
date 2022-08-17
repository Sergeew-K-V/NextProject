import ContainerBig from '../components/Layouts/ContainerBig'

export default function Custom404() {
  return (
    <ContainerBig>
      <div className='wrapper'>
        <h1>404 - Page Not Found</h1>
        <button>Go to Home Page</button>
      </div>
      <style jsx>{`
        .wrapper {
          display: flex;
          height: 100%;
          justify-content: center;
          align-items: center;
        }
        button {
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
