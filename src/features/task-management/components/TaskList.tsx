import { useEffect } from 'react'
import {
  Card,
  List,
  Tag,
  Typography,
  Spin,
  Empty,
  Select,
  Input,
  Button,
  Space,
  Popconfirm
} from 'antd'
import { useTaskStore } from '../stores/taskStore'
import { fetchTasks, deleteTask as removeTask } from '../services/taskService'

const { Text } = Typography
const { Option } = Select

const TaskList = ({ setEditingTask }) => {
  const {
    setTasks,
    isLoading,
    filteredTasks,
    filters,
    setFilters,
    deleteTask
  } = useTaskStore()

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks()
      setTasks(data)
    }
    loadTasks()
  }, [])

  const handleDelete = async (id: string) => {
    const ok = await removeTask(id)
    if (ok) deleteTask(id)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta':
        return 'red'
      case 'media':
        return 'gold'
      case 'baja':
        return 'green'
      default:
        return 'blue'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente':
        return 'orange'
      case 'en_progreso':
        return 'blue'
      case 'completada':
        return 'cyan'
      default:
        return 'default'
    }
  }

  return (
    <Card
      title="Mis tareas"
      style={{
        background: '#ffffff',
        borderRadius: 10,
        padding: 16,
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
      }}
    >
      <Space style={{ marginBottom: 16 }} direction="vertical" size="middle">
        <Input.Search
          placeholder="Buscar por título"
          onChange={(e) => setFilters({ search: e.target.value })}
          allowClear
        />
        <Space>
          <Select
            value={filters.status}
            onChange={(value) => setFilters({ status: value })}
            style={{ width: 160 }}
          >
            <Option value="all">Todos los estados</Option>
            <Option value="pendiente">Pendiente</Option>
            <Option value="en_progreso">En progreso</Option>
            <Option value="completada">Completada</Option>
          </Select>
          <Select
            value={filters.priority}
            onChange={(value) => setFilters({ priority: value })}
            style={{ width: 160 }}
          >
            <Option value="all">Todas las prioridades</Option>
            <Option value="alta">Alta</Option>
            <Option value="media">Media</Option>
            <Option value="baja">Baja</Option>
          </Select>
        </Space>
      </Space>

      {isLoading ? (
        <Spin />
      ) : filteredTasks().length === 0 ? (
        <Empty description="No hay tareas que coincidan" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={filteredTasks()}
          renderItem={(task) => (
            <List.Item
              actions={[
                <Button type="link" onClick={() => setEditingTask(task)}>
                  Editar
                </Button>,
                <Popconfirm
                  title="¿Eliminar esta tarea?"
                  onConfirm={() => handleDelete(task.id)}
                  okText="Sí"
                  cancelText="No"
                >
                  <Button type="link" danger>
                    Eliminar
                  </Button>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                title={<Text strong>{task.title}</Text>}
                description={
                  <>
                    {task.description && (
                      <>
                        <Text>{task.description}</Text>
                        <br />
                      </>
                    )}
                    <Tag color={getPriorityColor(task.priority)}>
                      Prioridad: {task.priority}
                    </Tag>
                    <Tag color={getStatusColor(task.status)}>
                      Estado: {task.status}
                    </Tag>
                    <Tag>Vence: {task.due_date}</Tag>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  )
}

export default TaskList
