export type ToolCategory = 
  | 'AD_COPY' 
  | 'CLIENT_MANAGEMENT' 
  | 'COPY_IMPROVEMENT' 
  | 'EMAIL_COPY' 
  | 'LONG_FORM' 
  | 'OTHER_FLOWS' 
  | 'PODCAST_TOOLS' 
  | 'SALES_FUNNEL_COPY';

export interface Tool {
  id: string;
  name: string;
  slug: string;
  category: ToolCategory;
  description: string;
  icon?: string;
  prompt_intro: string;
  questions: { label: string, type: 'input' | 'textarea' }[];
  system_prompt: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  tags?: ToolCategory[];
}

export type View = 
  | 'dashboard-view' 
  | 'tool-interface-view' 
  | 'all-tools-view'
  | 'all-projects-view' 
  | 'history-view' 
  | 'client-management-view' 
  | 'copy-improvement-view' 
  | 'ad-copy-view' 
  | 'email-copy-view' 
  | 'long-form-view' 
  | 'podcast-tools-view' 
  | 'sales-funnel-copy-view' 
  | 'other-flows-view';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'system';
  file?: {
    name: string;
    size: number;
  };
}

export interface ChatHistoryItem {
  id: string;
  toolTitle: string;
  messages: Message[];
  timestamp: number;
  projectId?: string | null;
}


// API Response types
export interface DashboardData {
    featuredTools: Tool[];
    recentTools: Tool[];
    favoriteToolIds: string[];
}

export interface SidebarData {
    projects: Project[];
    chatHistory: ChatHistoryItem[];
}
