import { useState } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { register } from '../services/authService'
import { useAuthStore } from '../stores/authStore'

const RegisterForm = () => {
  const [form] = Form.useForm()
  const { isLoading, error } = useAuthStore()
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (values: { email: string; password: string }) => {
    const ok = await register(values.email, values.password)
    if (ok) {
      setSuccess(true)
      form.resetFields()
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: 32,
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(17, 1, 107, 0.99)',
          width: '100%',
          maxWidth: 400,
        }}
      >
      <h2>Registrarse</h2>

      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
      {success && <Alert message="Registro exitoso. Revisa tu correo para confirmar la cuenta." type="success" showIcon style={{ marginBottom: 16 }} />}

      <Form form={form} layout="vertical" onFinish={handleSubmit} autoComplete="off">
        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[{ required: true, message: 'Por favor ingresa tu correo' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Por favor ingresa una contraseña segura' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Registrarse
          </Button>
        </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default RegisterForm
