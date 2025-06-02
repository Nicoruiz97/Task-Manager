import { Layout, Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../features/authentication/stores/authStore'
import { logout } from '../../../features/authentication/services/authService'

const { Header: AntHeader } = Layout
const { Text } = Typography

const Header = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
<AntHeader
  style={{
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#001529',
    padding: '0 24px',
    height: 64,
  }}
>

  <Text style={{ color: '#fff', fontSize: 18 }}>Task Manager</Text>

  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <Text style={{ color: '#f5f5f5', fontSize: 14 }}>
      {user?.email || 'Usuario'}
    </Text>
    <Button
  onClick={handleLogout}
  type="primary"
  style={{ backgroundColor: '#ef4444', borderColor: '#ef4444' }}
>
  Cerrar sesión
</Button>

  </div>
</AntHeader>

  )
}

export default Header
