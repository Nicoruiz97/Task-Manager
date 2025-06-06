import { useEffect } from 'react'
import {
  Card,
  Spin,
  Empty,
  Select,
  Input,
  Space
} from 'antd'
import { useTaskStore } from '../stores/taskStore'
import { fetchTasks, deleteTask as removeTask } from '../services/taskService'
import TaskCard from './TaskCard'

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
        <Space wrap>
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
        <div>
          {filteredTasks().map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={setEditingTask}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </Card>
  )
}

export default TaskList
