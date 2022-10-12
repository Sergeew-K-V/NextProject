import { Dispatch, SetStateAction } from 'react'

export type NavProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
