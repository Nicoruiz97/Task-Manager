import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../shared/services/supabase'
import { useAuthStore } from '../stores/authStore'
import { Spin, Alert } from 'antd'

const ConfirmAccount = () => {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    const confirmSession = async () => {
      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href)

      if (error) {
        setErrorMessage(error.message || 'Token inválido o expirado')
        setStatus('error')
        return
      }

      if (data?.user) {
        setUser(data.user)
        setStatus('success')
        setTimeout(() => navigate('/login'), 2000)
      } else {
        setErrorMessage('No se pudo confirmar la cuenta')
        setStatus('error')
      }
    }

    confirmSession()
  }, [])

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 80 }}>
      {status === 'loading' && (
        <>
          <Spin />
          <Alert
            message="Confirmando tu cuenta..."
            description="Un momento por favor."
            type="info"
            showIcon
            style={{ marginTop: 16 }}
          />
        </>
      )}

      {status === 'success' && (
        <Alert
          message="¡Cuenta confirmada!"
          description="Redirigiendo al login..."
          type="success"
          showIcon
        />
      )}

      {status === 'error' && (
        <Alert
          message="Error al confirmar"
          description={errorMessage}
          type="error"
          showIcon
        />
      )}
    </div>
  )
}

export default ConfirmAccount
