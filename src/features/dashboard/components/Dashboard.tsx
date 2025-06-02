import { Card, Row, Col, Statistic } from 'antd'
import { Pie } from '@ant-design/plots'
import { useTaskStore } from '../../task-management/stores/taskStore'

const Dashboard = () => {
  const { taskStats } = useTaskStore()
  const stats = taskStats()

  const data = [
    { type: 'Completadas', value: stats.completed },
    { type: 'Pendientes', value: stats.pending },
    { type: 'Vencidas', value: stats.overdue }
  ]

  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{value}',
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }]
  }

  return (
    <div style={{ maxWidth: 900, margin: 'auto', marginTop: 32 }}>
      <Row gutter={16} style={{ marginBottom: 32 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Total de tareas" value={stats.total} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Tareas completadas" value={stats.completed} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Tareas vencidas" value={stats.overdue} />
          </Card>
        </Col>
      </Row>

      <Card title="Distribución de tareas">
        <Pie {...config} />
      </Card>
    </div>
  )
}

export default Dashboard
