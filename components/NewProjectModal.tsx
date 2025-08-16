import React, { useState } from 'react';
import type { ToolCategory } from '../types';
import { XIcon } from './Icons';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (projectName: string, tags: string[]) => void;
  categories: ToolCategory[];
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  categories
}) => {
  const [projectName, setProjectName] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleCreate = () => {
    if (projectName.trim()) {
      onCreate(projectName.trim(), selectedTags);
      setProjectName('');
      setSelectedTags([]);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/50 z-[1000] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-light-bg-component dark:bg-dark-bg-component rounded-lg shadow-lg w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-4 lg:p-6 border-b border-light-border dark:border-dark-border flex justify-between items-center">
          <h3 className="font-serif text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Create New Project
          </h3>
          <button onClick={onClose}>
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              className="w-full p-2.5 bg-light-bg-component dark:bg-dark-bg-component border border-light-border dark:border-dark-border rounded-sm focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20 outline-none"
              placeholder="Enter project name"
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              autoFocus
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
              Tags (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => toggleTag(category)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    selectedTags.includes(category)
                      ? 'bg-primary-accent text-text-on-accent border-primary-accent'
                      : 'bg-light-bg-sidebar dark:bg-dark-bg-component border-light-border dark:border-dark-border hover:border-primary-accent'
                  }`}
                >
                  {category.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 lg:p-6 border-t border-light-border dark:border-dark-border flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-sm bg-light-bg-sidebar dark:bg-dark-bg-component border border-light-border dark:border-dark-border hover:opacity-85"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!projectName.trim()}
            className="px-5 py-2 rounded-sm bg-primary-accent text-text-on-accent hover:opacity-85 disabled:opacity-50"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};