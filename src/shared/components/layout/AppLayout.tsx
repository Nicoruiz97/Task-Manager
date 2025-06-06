import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { useThemeStore } from '../../stores/themeStore' // asegúrate de usar la ruta correcta

const { Content } = Layout

const AppLayout = () => {
  const { theme } = useThemeStore()

  return (
    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />

        <Content style={{ padding: 24, marginTop: 64 }}>
          <Outlet />
        </Content>
      </Layout>
    </div>
  )
}

export default AppLayout
