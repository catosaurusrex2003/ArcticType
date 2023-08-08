import { createClient } from '@supabase/supabase-js'

const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string
const projectApiKey = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_API_KEY as string
const supabaseClient = createClient(projectUrl, projectApiKey, {
    auth: { persistSession: false },
  })

export default supabaseClient