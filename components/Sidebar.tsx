import React from 'react';
import type { View, Project, Tool, ChatHistoryItem } from '../types';

interface SidebarProps {
  currentView: View;
  isSidebarOpen: boolean;
  onNavigate: (view: View) => void;
  onNewProject: () => void;
  projects: Project[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  favoriteTools: Tool[];
  recentTools: Tool[];
  chatHistory: ChatHistoryItem[];
  onInitiateToolActivation: (tool: Tool) => void;
  onClearHistory: () => void;
  onOpenRenameModal: (item: { id: string; name: string; type: 'project' | 'chat' }) => void;
  onDeleteProject: (projectId: string) => void;
  onDeleteChat: (chatId: string) => void;
  allTools: Tool[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  isSidebarOpen,
  onNavigate,
  onNewProject,
  projects,
  searchTerm,
  onSearchChange,
  favoriteTools,
  recentTools,
  chatHistory,
  onInitiateToolActivation,
  onClearHistory,
  onOpenRenameModal,
  onDeleteProject,
  onDeleteChat,
  allTools
}) => {
  return (
    <div className={`fixed lg:relative z-50 lg:z-auto h-full w-80 bg-light-bg-sidebar dark:bg-dark-bg-sidebar border-r border-light-border dark:border-dark-border transform transition-transform duration-300 ease-in-out ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      <div className="p-6">
        <h1 className="text-2xl font-serif font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
          Artemo AI
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={() => onNavigate('dashboard-view')}
            className={`w-full text-left p-3 rounded-sm transition-colors ${
              currentView === 'dashboard-view'
                ? 'bg-primary-accent text-text-on-accent'
                : 'hover:bg-light-bg-component dark:hover:bg-dark-bg-component'
            }`}
          >
            Dashboard
          </button>
          
          <button
            onClick={() => onNavigate('all-tools-view')}
            className={`w-full text-left p-3 rounded-sm transition-colors ${
              currentView === 'all-tools-view'
                ? 'bg-primary-accent text-text-on-accent'
                : 'hover:bg-light-bg-component dark:hover:bg-dark-bg-component'
            }`}
          >
            All Tools
          </button>
          
          <button
            onClick={() => onNavigate('all-projects-view')}
            className={`w-full text-left p-3 rounded-sm transition-colors ${
              currentView === 'all-projects-view'
                ? 'bg-primary-accent text-text-on-accent'
                : 'hover:bg-light-bg-component dark:hover:bg-dark-bg-component'
            }`}
          >
            Projects
          </button>
        </div>
        
        <div className="mt-8">
          <h3 className="text-sm font-medium text-light-text-tertiary dark:text-dark-text-tertiary mb-3">
            Recent Projects
          </h3>
          <div className="space-y-2">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id} className="text-sm p-2 hover:bg-light-bg-component dark:hover:bg-dark-bg-component rounded-sm">
                {project.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};