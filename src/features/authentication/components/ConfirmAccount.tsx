import { useEffect, useState } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { supabase } from '../../../shared/services/supabase'
import { Alert, Spin } from 'antd'

const ConfirmAccount = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const code = queryParams.get('code')
  const type = queryParams.get('type')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const confirm = async () => {
      if (!code || !type) {
        setLoading(false)
        return
      }

      const { error } = await supabase.auth.verifyOtp({
        type: type === 'signup' ? 'signup' : 'magiclink',
        token: code,
        email: queryParams.get('email') || ''
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
      }

      setLoading(false)
    }

    confirm()
  }, [code, type])

  if (!code || !type) {
    return <Navigate to="/login" />
  }

  if (loading) return <Spin tip="Confirmando cuenta..." />

  if (error) {
    return <Alert type="error" message="Error al confirmar" description={error} showIcon />
  }

  if (success) {
    return (
      <Alert
        type="success"
        message="Cuenta confirmada correctamente"
        description="Ahora puedes iniciar sesión"
        showIcon
      />
    )
  }

  return null
}

export default ConfirmAccount
