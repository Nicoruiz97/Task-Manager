import { Card, Tag, Button, Space, Typography } from 'antd'
import dayjs from 'dayjs'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Text } = Typography

const statusColors = {
  pendiente: 'orange',
  en_progreso: 'blue',
  completada: 'green',
}

const priorityColors = {
  alta: 'red',
  media: 'gold',
  baja: 'default',
}

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <Card
      title={task.title}
      extra={<Tag color={priorityColors[task.priority]}>{task.priority.toUpperCase()}</Tag>}
      style={{ marginBottom: 16 }}
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        {task.description && <Text>{task.description}</Text>}

        <div>
          <Text strong>Vence: </Text>
          {dayjs(task.due_date).format('DD/MM/YYYY')}
        </div>

        <Tag color={statusColors[task.status]}>{task.status.toUpperCase()}</Tag>

        <Space style={{ marginTop: 8 }}>
          <Button icon={<EditOutlined />} onClick={() => onEdit(task)}>
            Editar
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => onDelete(task.id)}>
            Eliminar
          </Button>
        </Space>
      </Space>
    </Card>
  )
}

export default TaskCard
