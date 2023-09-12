import { useContext } from 'react'
import { appContext } from '../context/createAppContext'

export default function useAppContext () {
  const data = useContext(appContext)
  return { ...data }
}
