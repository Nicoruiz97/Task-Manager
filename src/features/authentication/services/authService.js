import { supabase } from '../../../shared/services/supabase'
import { useAuthStore } from '../stores/authStore'

// Registro de usuario
export const register = async (email, password) => {
  const { setUser, setError, setLoading } = useAuthStore.getState()
  setLoading(true)

  const { data, error } = await supabase.auth.signUp({ email, password })

  setLoading(false)

  if (error) {
    setError(error.message)
    return false
  }

  setUser(data.user)
  setError(null)
  return true
}

// Inicio de sesión
export const login = async (email, password) => {
  const { setUser, setError, setLoading } = useAuthStore.getState()
  setLoading(true)

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  setLoading(false)

  if (error) {
    setError(error.message)
    return false
  }

  setUser(data.user)
  setError(null)

  // Redirección directa al dashboard
  window.location.href = '/app'

  return true
}

// Cierre de sesión
export const logout = async () => {
  const { clearAuth } = useAuthStore.getState()
  await supabase.auth.signOut()
  clearAuth()
}

// Reenvío de correo de confirmación
export const resendConfirmation = async (email) => {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  })

  if (error) {
    console.error('Error al reenviar confirmación:', error)
    return false
  }

  return true
}
