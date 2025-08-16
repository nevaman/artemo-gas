import React from 'react';
import type { View, Tool, Project, ChatHistoryItem } from '../types';

interface MainContentProps {
  currentView: View;
  selectedTool: Tool | null;
  onInitiateToolActivation: (tool: Tool) => void;
  onNavigate: (view: View) => void;
  onToggleTheme: () => void;
  theme: 'light' | 'dark';
  onToggleSidebar: () => void;
  searchTerm: string;
  favoriteTools: string[];
  onToggleFavorite: (toolId: string) => void;
  onSaveChat: (chat: Omit<ChatHistoryItem, 'id'>) => void;
  projects: Project[];
  onNewProject: () => void;
  onOpenRenameModal: (item: { id: string; name: string; type: 'project' | 'chat' }) => void;
  onDeleteProject: (projectId: string) => void;
  allTools: Tool[];
  featuredTools: any[];
}

export const MainContent: React.FC<MainContentProps> = ({
  currentView,
  selectedTool,
  onInitiateToolActivation,
  onNavigate,
  onToggleTheme,
  theme,
  onToggleSidebar,
  searchTerm,
  favoriteTools,
  onToggleFavorite,
  onSaveChat,
  projects,
  onNewProject,
  onOpenRenameModal,
  onDeleteProject,
  allTools,
  featuredTools
}) => {
  return (
    <div className="flex-1 flex flex-col bg-light-bg-page dark:bg-dark-bg-page">
      <header className="border-b border-light-border dark:border-dark-border p-4 flex items-center justify-between">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-light-bg-component dark:hover:bg-dark-bg-component rounded-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <h2 className="text-xl font-serif font-bold text-light-text-primary dark:text-dark-text-primary">
          {currentView === 'dashboard-view' && 'Dashboard'}
          {currentView === 'all-tools-view' && 'All Tools'}
          {currentView === 'all-projects-view' && 'Projects'}
          {currentView === 'tool-interface-view' && selectedTool?.name}
        </h2>
        
        <button
          onClick={onToggleTheme}
          className="p-2 hover:bg-light-bg-component dark:hover:bg-dark-bg-component rounded-sm"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>
      
      <main className="flex-1 p-6">
        {currentView === 'dashboard-view' && (
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">Welcome to Artemo AI</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Your AI-powered copywriting assistant dashboard.
            </p>
          </div>
        )}
        
        {currentView === 'all-tools-view' && (
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">All Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allTools.map((tool) => (
                <div
                  key={tool.id}
                  className="p-4 bg-light-bg-component dark:bg-dark-bg-component border border-light-border dark:border-dark-border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => onInitiateToolActivation(tool)}
                >
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    {tool.name}
                  </h4>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {currentView === 'all-projects-view' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif font-bold">Projects</h3>
              <button
                onClick={onNewProject}
                className="px-4 py-2 bg-primary-accent text-text-on-accent rounded-sm hover:opacity-85"
              >
                New Project
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 bg-light-bg-component dark:bg-dark-bg-component border border-light-border dark:border-dark-border rounded-lg"
                >
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    {project.name}
                  </h4>
                  <p className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                    Created: {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {currentView === 'tool-interface-view' && selectedTool && (
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">{selectedTool.name}</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
              {selectedTool.description}
            </p>
            <div className="bg-light-bg-component dark:bg-dark-bg-component border border-light-border dark:border-dark-border rounded-lg p-6">
              <p>Tool interface will be implemented here.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};