import { supabase } from '../../../shared/services/supabase'
import { useAuthStore } from '../../authentication/stores/authStore'

export const createTask = async (taskData: any) => {
  const user = useAuthStore.getState().user
  if (!user) return null

  const { data, error } = await supabase
    .from('tasks')
    .insert([{ ...taskData, user_id: user.id }])
    .select()
    .single()

  if (error) {
    console.error('Error al crear tarea:', error)
    return null
  }

  return data
}
export const fetchTasks = async () => {
    const user = useAuthStore.getState().user
    if (!user) return []
  
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
  
    if (error) {
      console.error('Error al obtener tareas:', error)
      return []
    }
  
    return data
  }
  export const deleteTask = async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) {
      console.error('Error al eliminar tarea:', error)
      return false
    }
    return true
  }
  export const updateTask = async (id, updates) => {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
  
    if (error) {
      console.error('Error al actualizar tarea:', error)
      return null
    }
  
    return data
  }
  