import { useAuthStore } from '../stores/authStore'
import { login } from '../services/authService'
import { Form, Input, Button, Alert, message, Typography } from 'antd'

const { Title, Text } = Typography

const LoginForm = () => {
  const [form] = Form.useForm()
  const { isLoading, error } = useAuthStore()

  const handleSubmit = async (values: { email: string; password: string }) => {
    const ok = await login(values.email, values.password)
    if (!ok) {
      message.error('Credenciales inválidas')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          padding: '2.5rem',
          borderRadius: '16px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
          width: '100%',
          maxWidth: '420px',
        }}
      >
        <Title level={3} style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>
          Iniciar sesión
        </Title>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: '1rem' }}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Correo electrónico"
            name="email"
            rules={[{ required: true, message: 'Por favor ingresa tu correo' }]}
          >
            <Input size="large" placeholder="ejemplo@correo.com" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
          >
            <Input.Password size="large" placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
              size="large"
              style={{ transition: 'all 0.3s ease' }}
            >
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>

        <Text
          type="secondary"
          style={{
            display: 'block',
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '0.95rem',
          }}
        >
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </Text>
      </div>
    </div>
  )
}

export default LoginForm
