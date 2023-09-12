import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

export function Messages () {
  const notification = useSelector(state => state.notification)

  if (!notification.message) return null

  const alertVariant = notification.type === 'correct'
    ? 'success'
    : 'danger'

  return (
    <Alert variant={alertVariant}>
      {notification.message}
    </Alert>
  )
}
