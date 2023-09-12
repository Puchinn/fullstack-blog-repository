import useAppContext from '../hooks/useAppContext'

export function Error () {
  const { error } = useAppContext()
  if (error) {
    return <h1>{error}</h1>
  }
  return null
}
