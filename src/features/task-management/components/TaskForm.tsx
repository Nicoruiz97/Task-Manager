import { useEffect } from 'react'
import { Form, Input, Button, Select, DatePicker } from 'antd'
import dayjs from 'dayjs'
import type { Task } from '../stores/taskStore'


const { TextArea } = Input
const { Option } = Select

interface Props {
  initialValues?: Task | null
  onFinish: (values: Task) => void
}

const TaskForm = ({ initialValues = null, onFinish }: Props) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        due_date: initialValues.due_date ? dayjs(initialValues.due_date) : null
      })
    } else {
      form.resetFields()
    }
  }, [initialValues])

  const isEditMode = !!initialValues

  return (

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{
          background: '#fff',
          padding: 24,
          borderRadius: 10,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: 600,
          margin: '0 auto',
        }}
      >
        <Form.Item
          label="Título"
          name="title"
          rules={[{ required: true, message: 'Ingresa un título' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Descripción" name="description">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Prioridad"
          name="priority"
          rules={[{ required: true, message: 'Selecciona una prioridad' }]}
        >
          <Select placeholder="Selecciona una prioridad">
            <Option value="alta">Alta</Option>
            <Option value="media">Media</Option>
            <Option value="baja">Baja</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Estado"
          name="status"
          rules={[{ required: true, message: 'Selecciona un estado' }]}
        >
          <Select placeholder="Selecciona un estado">
            <Option value="pendiente">Pendiente</Option>
            <Option value="en_progreso">En progreso</Option>
            <Option value="completada">Completada</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Fecha de vencimiento"
          name="due_date"
          rules={[{ required: true, message: 'Selecciona una fecha' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {isEditMode ? 'Guardar cambios' : 'Crear tarea'}
          </Button>
        </Form.Item>
      </Form>
  )
}

export default TaskForm
