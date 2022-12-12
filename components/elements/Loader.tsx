import { FC } from "react"
import styled from "styled-components"

interface LoaderProps {
  width?: string
  height?: string
  position?: string
  top?: string
  left?: string
  transform?: string
  margin?: string
}
const Loader: FC<LoaderProps> = ({ width, height, position, top, left, transform, margin }) => {
  return (
    <LoaderBody position={position} top={top} left={left} transform={transform} margin={margin}>
      <DualRing width={width} height={height} />
    </LoaderBody>
  )
}

export default Loader

interface LoaderBodyProps {
  position?: string
  top?: string
  left?: string
  transform?: string
  margin?: string
}

interface DualRingProps {
  width?: string
  height?: string
}
const LoaderBody = styled.div<LoaderBodyProps>`
  display: flex;
  justify-content: center;
  ${({ margin }) => (margin ? `margin:${margin}` : "margin:150px auto")};
  ${({ position }) => (position ? `position:${position}` : "position: relative")};
  ${({ top }) => (top ? `top:${top}` : "")};
  ${({ left }) => (left ? `left:${left}` : "")};
  ${({ transform }) => (transform ? transform : "")};
`
const DualRing = styled.div<DualRingProps>`
  ${({ width }) => (width ? `width:${width}` : "width:160px")};
  ${({ height }) => (height ? `width:${height}` : "height:160px")};
  display: inline-block;
  ::after {
    content: " ";
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
