import styled from "styled-components"

interface BlockProps {
  flexDirection?: string
  display?: string
  justifyContent?: string
  margin?: string
  width?: string
  height?: string
  flex?: string
}

interface ButtonProps {
  margin?: string
  padding?: string
  width?: string
}

export const Block = styled.div<BlockProps>`
  ${({ width }) => (width ? `width:${width}` : "")};
  ${({ margin }) => (margin ? `margin:${margin}` : "margin: 0 0.5rem;")};
  ${({ display }) => (display ? `display:${display}` : "")};
  ${({ flexDirection }) => (flexDirection ? `flex-direction:${flexDirection}` : "")};
  ${({ justifyContent }) => (justifyContent ? `justify-content:${justifyContent}` : "")};
  ${({ height }) => (height ? `height:${height}` : `height:auto`)};
  ${({ flex }) => (flex ? `flex:${flex}` : "")};
`

export const Heading = styled.h2`
  font-size: 2rem;
  text-transform: uppercase;
`
export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 0 1.5rem;
  align-items: flex-start;
`

export const Controlers = styled.div`
  justify-content: start;
  display: flex;
  border: 0.2rem solid #000;
  flex: 0 1 16.5%;
`
export const DashBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 560px;
  overflow-y: scroll;
  border: 0.2rem solid #000;
  flex: 0 1 82.5%;
`

export const Button = styled.button<ButtonProps>`
  ${({ margin }) => (margin ? `margin: ${margin};` : `margin: 1rem 0;`)}
  ${({ padding }) => (padding ? `padding: ${padding};` : "padding: 0.5rem 2rem;")}
  ${({ width }) => (width ? `width:${width};` : "width:auto;")}
  color: white;
  background-color: #000;
  border: 1px solid #fff;
  cursor: pointer;
`

export const Title = styled.h3`
  margin: 1rem 0;
`

export const Input = styled.input`
  padding: 0;
  width: 10rem;
  min-height: 25px;
`

export const Select = styled.select`
  min-height: 25px;
  margin: 0 0.2rem 0 0;
`

export const Option = styled.option``
