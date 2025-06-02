import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const { Content } = Layout

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />

      <Content style={{ padding: 24, marginTop: 64 }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default AppLayout
