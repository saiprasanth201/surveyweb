import { createClient } from '@supabase/supabase-js'

// Load environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url_here') {
  throw new Error('Missing VITE_SUPABASE_URL environment variable. Please set it to your Supabase project URL in the .env file.')
}

if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key_here') {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable. Please set it to your Supabase anon key in the .env file.')
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Define the type for form data that matches your database schema
export type ResponseData = {
  id?: string
  name: string
  description?: string
  category: string
  value?: number
  status?: string
  date?: string
  tags?: string[]
  priority?: string
  assignee?: string
  progress?: number
  user_email?: string
  created_at?: string
  updated_at?: string
}

// Legacy type for backward compatibility with existing forms
export type UserFormData = {
  feed_type: string
  quantity: number | string
  unit: string
}

// Helper function to get current user's email
export const getCurrentUserEmail = async (): Promise<string | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user?.email || null
  } catch (error) {
    console.error('Error getting user email:', error)
    return null
  }
}