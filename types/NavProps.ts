import { Dispatch, SetStateAction } from 'react'

type NavProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
export default NavProps
