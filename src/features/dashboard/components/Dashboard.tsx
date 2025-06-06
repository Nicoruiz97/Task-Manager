import { useEffect, useState } from 'react'
import { Card, Col, Row, Typography, Divider } from 'antd'
import { Pie } from '@ant-design/charts'
import { useTaskStore } from '../../task-management/stores/taskStore'
import dayjs from 'dayjs'
import {
  CheckCircleTwoTone,
  ClockCircleTwoTone,
  CalendarTwoTone,
  BarsOutlined,
} from '@ant-design/icons'

const { Title, Text } = Typography

const Dashboard = () => {
  const { tasks, taskStats } = useTaskStore()
  const [vencidas, setVencidas] = useState(0)

  useEffect(() => {
    const now = dayjs()
    const vencidasCount = tasks.filter(
      (t) =>
        t.status !== 'completada' &&
        dayjs(t.due_date).isBefore(now, 'day')
    ).length

    setVencidas(vencidasCount)
  }, [tasks])

  const stats = taskStats()
  const total = stats.total + vencidas

  const dataChart = [
    { type: 'Completadas', value: stats.completed },
    { type: 'Pendientes', value: stats.pending },
    { type: 'Vencidas', value: vencidas },
  ]

  const config = {
    data: dataChart,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{percentage}',
      style: {
        fontSize: 14,
        fontWeight: 600,
        fill: '#fff',
      },
    },
    interactions: [{ type: 'element-active' }],
    legend: {
      layout: 'horizontal',
      position: 'bottom',
    },
  }
  

  const statCards = [
    {
      title: 'Total',
      value: total,
      icon: <BarsOutlined style={{ fontSize: 36, color: '#595959' }} />,
    },
    {
      title: 'Completadas',
      value: stats.completed,
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 36 }} />,
    },
    {
      title: 'Pendientes',
      value: stats.pending,
      icon: <ClockCircleTwoTone twoToneColor="#1890ff" style={{ fontSize: 36 }} />,
    },
    {
      title: 'Vencidas',
      value: vencidas,
      icon: <CalendarTwoTone twoToneColor="#fa541c" style={{ fontSize: 36 }} />,
    },
  ]

  return (
<div
  style={{
    padding: '48px 32px',
    background: '#e9ecf3',
    minHeight: '100vh',
  }}
>

      <Title level={2} style={{ marginBottom: 8 }}>Resumen de tareas</Title>
      <Text type="secondary">Aquí puedes ver un resumen visual de tus tareas personales</Text>

      <Divider style={{ marginTop: 16 }} />

      <Row gutter={[24, 24]} justify="center" style={{ marginBottom: 40 }}>
        {statCards.map((card) => (
          <Col key={card.title} xs={24} sm={12} md={6}>
            <Card
              style={{
                borderRadius: 12,
                textAlign: 'center' as const,
                background: '#fff',
                boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                border: '1px solid #f0f0f0',
                padding: 16,
              }}
            >

              <div style={{ marginBottom: 8 }}>{card.icon}</div>
              <Text type="secondary">{card.title}</Text>
              <Title level={3} style={{ margin: 0 }}>{card.value}</Title>
            </Card>
          </Col>
        ))}
      </Row>

      <Card
  title={<Text strong>📊 Distribución de tareas</Text>}
  style={{
    maxWidth: 900,
    margin: '0 auto',
    borderRadius: 12,
    border: '1px solid #f0f0f0',
    boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
    background: '#ffffff',
  }}
>

        <Pie {...config} />
      </Card>
    </div>
  )
}

export default Dashboard
