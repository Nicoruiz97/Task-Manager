import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  description: string
  priority: 'alta' | 'media' | 'baja'
  status: 'pendiente' | 'en_progreso' | 'completada'
  due_date: string
}

interface Filters {
  status: string
  priority: string
  search: string
}

interface TaskStore {
  tasks: Task[]
  filters: Filters
  isLoading: boolean
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  deleteTask: (id: string) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  setFilters: (filters: Partial<Filters>) => void
  filteredTasks: () => Task[]
  taskStats: () => {
    total: number
    completed: number
    pending: number
    overdue: number
  }
}

export const useTaskStore = create<TaskStore>()(
  subscribeWithSelector((set, get) => ({
    tasks: [],
    filters: {
      status: 'all',
      priority: 'all',
      search: ''
    },
    isLoading: false,

    setTasks: (tasks) => set({ tasks }),

    addTask: (task) =>
      set((state) => ({
        tasks: [task, ...state.tasks]
      })),

    deleteTask: (id) =>
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id)
      })),

    updateTask: (id, updates) =>
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task
        )
      })),

    setFilters: (filters) =>
      set((state) => ({
        filters: { ...state.filters, ...filters }
      })),

    filteredTasks: () => {
      const { tasks, filters } = get()
      return tasks.filter((task) => {
        const matchStatus =
          filters.status === 'all' || task.status === filters.status
        const matchPriority =
          filters.priority === 'all' || task.priority === filters.priority
        const matchSearch = task.title
          .toLowerCase()
          .includes(filters.search.toLowerCase())

        return matchStatus && matchPriority && matchSearch
      })
    },

    taskStats: () => {
      const tasks = get().tasks
      const today = new Date().toISOString().split('T')[0]

      return {
        total: tasks.length,
        completed: tasks.filter((t) => t.status === 'completada').length,
        pending: tasks.filter((t) => t.status === 'pendiente').length,
        overdue: tasks.filter(
          (t) => t.status !== 'completada' && t.due_date < today
        ).length
      }
    }
  }))
)
