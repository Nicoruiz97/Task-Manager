import TaskForm from './TaskForm'
import TaskList from './TaskList'
import { useState } from 'react'
import { useTaskStore } from '../stores/taskStore'
import { createTask, updateTask as updateTaskService } from '../services/taskService'
import type { Task } from '../stores/taskStore'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BarChartOutlined } from '@ant-design/icons'

const TaskDashboard = () => {
  const { addTask, updateTask } = useTaskStore()
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      due_date: values.due_date.format('YYYY-MM-DD'),
    }

    if (editingTask) {
      const updated = await updateTaskService(editingTask.id, payload)
      if (updated) {
        updateTask(editingTask.id, updated)
        setEditingTask(null)
      }
    } else {
      const created = await createTask(payload)
      if (created) {
        addTask(created)
      }
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#f0f2f5',
        padding: '40px 16px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div style={{ width: '100%', maxWidth: 1200, marginBottom: 24, textAlign: 'right' }}>
        <Button
          type="primary"
          icon={<BarChartOutlined />}
          onClick={() => navigate('/app/resumen')}
        >
          Ver Dashboard
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 32,
          maxWidth: 1200,
          width: '100%',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div style={{ flex: 1, minWidth: 320, maxWidth: 500 }}>
          <TaskForm initialValues={editingTask} onFinish={handleSubmit} />
        </div>

        <div style={{ flex: 1, minWidth: 320, maxWidth: 600 }}>
          <TaskList setEditingTask={setEditingTask} />
        </div>
      </div>
    </div>
  )
}

export default TaskDashboard
