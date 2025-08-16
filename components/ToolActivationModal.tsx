import React from 'react';
import type { Tool } from '../types';
import { XIcon } from './Icons';

interface ToolActivationModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
  onActivate: (tool: Tool) => void;
}

export const ToolActivationModal: React.FC<ToolActivationModalProps> = ({
  tool,
  isOpen,
  onClose,
  onActivate
}) => {
  if (!isOpen || !tool) return null;

  const handleActivate = () => {
    onActivate(tool);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/50 z-[1000] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-light-bg-component dark:bg-dark-bg-component rounded-lg shadow-lg w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-4 lg:p-6 border-b border-light-border dark:border-dark-border flex justify-between items-center">
          <h3 className="font-serif text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Activate Tool
          </h3>
          <button onClick={onClose}>
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            {tool.name}
          </h4>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            {tool.description}
          </p>
          <p className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
            Category: {tool.category.replace('_', ' ')}
          </p>
        </div>
        
        <div className="p-4 lg:p-6 border-t border-light-border dark:border-dark-border flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-sm bg-light-bg-sidebar dark:bg-dark-bg-component border border-light-border dark:border-dark-border hover:opacity-85"
          >
            Cancel
          </button>
          <button
            onClick={handleActivate}
            className="px-5 py-2 rounded-sm bg-primary-accent text-text-on-accent hover:opacity-85"
          >
            Activate
          </button>
        </div>
      </div>
    </div>
  );
};