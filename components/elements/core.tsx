import styled from "styled-components"

interface BlockProps {
  flexDirection?: string
  display?: string
  justifyContent?: string
  margin?: string
  width?: string
  height?: string
  flex?: string
  alignItems?: string
  border?: string
}

export const Block = styled.div<BlockProps>`
  ${({ width }) => (width ? `width:${width}` : "")};
  ${({ margin }) => (margin ? `margin:${margin}` : "margin: 0 0.5rem;")};
  ${({ display }) => (display ? `display:${display}` : "")};
  ${({ flexDirection }) => (flexDirection ? `flex-direction:${flexDirection}` : "")};
  ${({ justifyContent }) => (justifyContent ? `justify-content:${justifyContent}` : "")};
  ${({ alignItems }) => (alignItems ? `align-items:${alignItems}` : "")};
  ${({ height }) => (height ? `height:${height}` : `height:auto`)};
  ${({ flex }) => (flex ? `flex:${flex}` : "")};
  ${({ border }) => (border ? `border:${border}` : "")};
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
interface ControlersProps {
  flex?: string
}

export const Controlers = styled.div<ControlersProps>`
  position: relative;
  justify-content: start;
  display: flex;
  border: 0.2rem solid #000;
  ${({ flex }) => (flex ? `flex:${flex}` : "flex: 0 1 16.5%")};
`
interface DashBoardProps {
  height?: string
  minHeight?: string
  flex?: string
}
export const DashBoard = styled.div<DashBoardProps>`
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  border: 0.2rem solid #000;
  ${({ flex }) => (flex ? `flex:${flex}` : "flex: 0 1 82.5%")};
  ${({ height }) => (height ? `height:${height}` : "height: 560px")};
  ${({ minHeight }) => (minHeight ? `min-height:${minHeight}` : "")};
`

interface ButtonProps {
  margin?: string
  padding?: string
  width?: string
  locked?: boolean
}

export const Button = styled.button<ButtonProps>`
  ${({ margin }) => (margin ? `margin: ${margin};` : `margin: 1rem 0;`)}
  ${({ padding }) => (padding ? `padding: ${padding};` : "padding: 0.5rem 2rem;")}
  ${({ width }) => (width ? `width:${width};` : "width:auto;")}
  ${({ locked }) => (locked ? `background-color: grey;` : "background-color: #000;")}
  ${({ locked }) => (locked ? `cursor: default;` : "cursor: pointer;")}
  color: white;
  border: 1px solid #fff;
`

interface TitleProps {
  textAlign?: string
  margin?: string
}

export const Title = styled.h3<TitleProps>`
  ${({ margin }) => (margin ? `margin:${margin}` : "margin: 1rem 0")};
  ${({ textAlign }) => (textAlign ? `text-align:${textAlign}` : "")};
`

export const StatusBar = styled.div`
  display: flex;
  border: 0.2rem solid black;
  height: 70px;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -80px;
  left: 0;
  margin: 0;
`

interface StatusProps {
  completed?: boolean
}

export const Status = styled.div<StatusProps>`
  ${({ completed }) => (completed ? `background-color:lime` : "background-color:red")};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid black;
`

interface InputProps {
  width?: string
}

export const Input = styled.input<InputProps>`
  padding: 0;
  ${({ width }) => (width ? `width:${width}` : "width: 10rem")};
  min-height: 25px;
`

export const Select = styled.select`
  min-height: 25px;
  margin: 0 0.2rem 0 0;
`

export const Option = styled.option``

export const NetworkForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 15%;
  height: px;
  border: 0.2rem solid #000;
  margin: 0 1rem;
`

export const Label = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`

interface CheckBoxProps {
  selected?: boolean
  selectedColor?: string
  defaultColor?: string
}

export const Checkbox = styled.div<CheckBoxProps>`
  z-index: 1;
  height: 1.5rem;
  width: 1.5rem;
  margin: 0.25rem;
  position: relative;

  .label {
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${({ defaultColor }) => (defaultColor ? `${defaultColor}` : "#000")};
    border: 1px solid #000;
    border-radius: 50%;
    height: 1.5rem;
    width: 1.5rem;
  }

  ${({ selected, selectedColor }) =>
    selected
      ? `
      .label:after {
        opacity:1;
      }
      .label {
        border-color: #000;
        background-color: ${selectedColor};
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
