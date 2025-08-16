import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Get user from JWT token
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('No authorization header')

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )
    if (userError || !user) throw new Error('Invalid user')

    // Get featured tools (first 6 tools)
    const { data: featuredTools, error: featuredError } = await supabaseClient
      .from('tools')
      .select('*')
      .limit(6)

    if (featuredError) throw featuredError

    // Get recent tools for user (from user_tools_history)
    const { data: recentToolsData, error: recentError } = await supabaseClient
      .from('user_tools_history')
      .select(`
        tools (*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)

    if (recentError) throw recentError

    const recentTools = recentToolsData?.map(item => item.tools).filter(Boolean) || []

    // Get favorite tool IDs
    const { data: favorites, error: favError } = await supabaseClient
      .from('user_favorites')
      .select('tool_id')
      .eq('user_id', user.id)

    if (favError) throw favError

    const favoriteToolIds = favorites?.map(f => f.tool_id) || []

    const dashboardData = {
      featuredTools: featuredTools?.map(tool => ({ tools: tool })) || [],
      recentTools: recentTools,
      favoriteToolIds: favoriteToolIds
    }

    return new Response(
      JSON.stringify(dashboardData),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})