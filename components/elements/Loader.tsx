import { FC } from 'react'
import styled from 'styled-components'

const Loader: FC = () => {
  return (
    <LoaderBody>
      <DualRing />
    </LoaderBody>
  )
}

export default Loader

const LoaderBody = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 150px auto;
`
const DualRing = styled.div`
  display: inline-block;
  width: 160px;
  height: 160px;
  ::after {
    content: ' ';
    display: block;
    width: 256px;
    height: 256px;
    margin: 16px;
    border-radius: 50%;
    border: 8px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ldsDualRing 1.2s linear infinite;
  }

  @keyframes ldsDualRing {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
