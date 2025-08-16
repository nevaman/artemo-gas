import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { NewProjectModal } from './components/NewProjectModal';
import { ToolActivationModal } from './components/ToolActivationModal';
import { allCategories } from './constants';
import type { Tool, View, Project, ChatHistoryItem, DashboardData, SidebarData } from './types';
import { XIcon } from './components/Icons';
import { supabase } from './lib/supabaseClient';
import type { AuthSession } from '@supabase/supabase-js';
import { AuthView } from './components/AuthView';


// Rename Modal Component
const RenameModal: React.FC<{
    item: { id: string; name: string; type: 'project' | 'chat' } | null;
    onClose: () => void;
    onRename: (newName: string) => void;
}> = ({ item, onClose, onRename }) => {
    const [name, setName] = useState('');

    useEffect(() => { if (item) { setName(item.name); } }, [item]);
    if (!item) return null;

    const handleRename = () => { if (name.trim()) { onRename(name.trim()); } };

    return (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/50 z-[1000] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-light-bg-component dark:bg-dark-bg-component rounded-lg shadow-lg w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="p-4 lg:p-6 border-b border-light-border dark:border-dark-border flex justify-between items-center">
                    <h3 className="font-serif text-xl font-bold text-light-text-primary dark:text-dark-text-primary">Rename {item.type === 'project' ? 'Project' : 'Chat'}</h3>
                    <button onClick={onClose}><XIcon className="w-6 h-6" /></button>
                </div>
                <div className="p-6">
                    <input
                        type="text" value={name} onChange={e => setName(e.target.value)}
                        className="w-full p-2.5 bg-light-bg-component dark:bg-dark-bg-component border border-light-border dark:border-dark-border rounded-sm focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20 outline-none"
                        onKeyDown={e => e.key === 'Enter' && handleRename()} autoFocus
                    />
                </div>
                <div className="p-4 lg:p-6 border-t border-light-border dark:border-dark-border flex justify-end gap-3">
                    <button onClick={onClose} className="px-5 py-2 rounded-sm bg-light-bg-sidebar dark:bg-dark-bg-component border border-light-border dark:border-dark-border hover:opacity-85">Cancel</button>
                    <button onClick={handleRename} className="px-5 py-2 rounded-sm bg-primary-accent text-text-on-accent hover:opacity-85">Save</button>
                </div>
            </div>
        </div>
    );
};


const App: React.FC = () => {
    const [session, setSession] = useState<AuthSession | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [currentView, setCurrentView] = useState<View>('dashboard-view');
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemToRename, setItemToRename] = useState<{ id: string; name: string; type: 'project' | 'chat' } | null>(null);

    // Data states
    const [allTools, setAllTools] = useState<Tool[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
    const [favoriteToolIds, setFavoriteToolIds] = useState<string[]>([]);
    const [recentTools, setRecentTools] = useState<Tool[]>([]);
    const [featuredTools, setFeaturedTools] = useState<any[]>([]);
    
    useEffect(() => {
        console.log('Setting up auth listener...');
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log('Initial session:', session);
            setSession(session);
        });
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log('Auth state changed:', _event, session);
            setSession(session);
        });
        
        return () => subscription.unsubscribe();
    }, []);
    
    const fetchData = useCallback(async () => {
        if (!session) return;
        
        console.log('Fetching data for user:', session.user.id);
        
        try {
            const { data: toolsData, error: toolsError } = await supabase.functions.invoke('get-tools');
            if (toolsError) throw toolsError;
            setAllTools(toolsData);

            const { data: dashboardData, error: dashboardError } = await supabase.functions.invoke('get-dashboard-data');
            if (dashboardError) throw dashboardError;
            setFeaturedTools(dashboardData.featuredTools.map((ft: any) => ft.tools));
            setRecentTools(dashboardData.recentTools);
            setFavoriteToolIds(dashboardData.favoriteToolIds);
            
            const { data: sidebarData, error: sidebarError } = await supabase.functions.invoke('get-sidebar-data');
            if (sidebarError) throw sidebarError;
            setProjects(sidebarData.projects);
            setChatHistory(sidebarData.chatHistory.map((h: any) => ({
                id: h.id,
                toolTitle: h.tool_name,
                // A bit of a hack to show user's first answer in sidebar
                messages: [{sender: 'user', text: h.answers?.[0] || '...'}],
                timestamp: new Date(h.created_at).getTime(),
            })));

        } catch (error) {
            console.error('Error fetching data:', error);
            
            // Set default data if edge functions fail
            setAllTools([]);
            setFeaturedTools([]);
            setRecentTools([]);
            setFavoriteToolIds([]);
            setProjects([]);
            setChatHistory([]);
        }
    }, [session]);

    useEffect(() => {
        fetchData();
    }, [session, fetchData]);

    useEffect(() => {
        document.documentElement.classList.remove(theme === 'light' ? 'dark' : 'light');
        document.documentElement.classList.add(theme);
    }, [theme]);

    const handleNavigate = useCallback((view: View) => {
        setCurrentView(view);
        setSidebarOpen(false);
        setSelectedTool(null);
        if (view !== 'all-tools-view') setSearchTerm('');
    }, []);

    const handleStartToolSession = useCallback((tool: Tool) => {
        setSelectedTool(tool);
        setCurrentView('tool-interface-view');
        setSidebarOpen(false);
    }, []);

    const handleCreateProject = useCallback(async (projectName: string, tags: string[]) => {
        const { data, error } = await supabase
            .from('projects')
            .insert({ name: projectName || 'Untitled Project', user_id: session!.user.id, tags: tags })
            .select();
        if (error) console.error("Error creating project:", error);
        else if (data) setProjects(prev => [data[0], ...prev]);
        setModalOpen(false);
    }, [session]);

    const handleToggleFavorite = useCallback(async (toolId: string) => {
        const isFavorite = favoriteToolIds.includes(toolId);
        const newFavorites = isFavorite ? favoriteToolIds.filter(id => id !== toolId) : [...favoriteToolIds, toolId];
        setFavoriteToolIds(newFavorites); // Optimistic update

        const { error } = await supabase.functions.invoke('manage-favorite', {
            body: { tool_id: toolId, is_favorite: !isFavorite }
        });
        if (error) {
            console.error('Error toggling favorite:', error);
            setFavoriteToolIds(favoriteToolIds); // Revert on error
        }
    }, [favoriteToolIds]);

    const handleSaveChat = useCallback(async (chat: Omit<ChatHistoryItem, 'id'>) => {
        await fetchData(); // Refetch all data to update sidebar
        handleNavigate('dashboard-view');
    }, [fetchData, handleNavigate]);

    const handleDeleteProject = useCallback(async (projectId: string) => {
        if (window.confirm('Delete this project?')) {
            setProjects(prev => prev.filter(p => p.id !== projectId));
            await supabase.from('projects').delete().match({ id: projectId });
        }
    }, []);

    const handleDeleteChat = useCallback(async (chatId: string) => {
        if (window.confirm('Delete this chat history?')) {
            setChatHistory(prev => prev.filter(c => c.id !== chatId));
            await supabase.from('user_tools_history').delete().match({ id: chatId });
        }
    }, []);

    const handleRename = useCallback(async (newName: string) => {
        if (!itemToRename) return;
        const { id, type } = itemToRename;

        if (type === 'project') {
            setProjects(prev => prev.map(p => p.id === id ? { ...p, name: newName } : p));
            await supabase.from('projects').update({ name: newName }).match({ id });
        } else if (type === 'chat') {
            setChatHistory(prev => prev.map(c => c.id === id ? { ...c, toolTitle: newName } : c));
            await supabase.from('user_tools_history').update({ tool_name: newName }).match({ id });
        }
        setItemToRename(null);
    }, [itemToRename]);
    
    if (!session) {
        return <AuthView />;
    }

    return (
        <>
            <div className={`page-overlay fixed inset-0 z-40 bg-black/40 dark:bg-black/50 lg:hidden ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setSidebarOpen(false)}></div>
            <div className="flex h-screen font-sans">
                <Sidebar
                    currentView={currentView} isSidebarOpen={isSidebarOpen} onNavigate={handleNavigate}
                    onNewProject={() => setModalOpen(true)} projects={projects}
                    searchTerm={searchTerm} onSearchChange={(v) => { setCurrentView('all-tools-view'); setSearchTerm(v); }}
                    favoriteTools={allTools.filter(t => favoriteToolIds.includes(t.id))}
                    recentTools={recentTools}
                    chatHistory={chatHistory}
                    onInitiateToolActivation={handleStartToolSession}
                    onClearHistory={async () => { if(window.confirm('Delete all chats?')) { setChatHistory([]); await supabase.from('user_tools_history').delete().match({ user_id: session.user.id }); }}}
                    onOpenRenameModal={setItemToRename}
                    onDeleteProject={handleDeleteProject}
                    onDeleteChat={handleDeleteChat}
                    allTools={allTools}
                />
                <MainContent
                    currentView={currentView} selectedTool={selectedTool}
                    onInitiateToolActivation={handleStartToolSession} onNavigate={handleNavigate}
                    onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} theme={theme}
                    onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                    searchTerm={searchTerm} favoriteTools={favoriteToolIds}
                    onToggleFavorite={handleToggleFavorite} onSaveChat={handleSaveChat}
                    projects={projects} onNewProject={() => setModalOpen(true)}
                    onOpenRenameModal={setItemToRename} onDeleteProject={handleDeleteProject}
                    allTools={allTools} featuredTools={featuredTools}
                />
            </div>
            <NewProjectModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreateProject} categories={allCategories} />
            <RenameModal item={itemToRename} onClose={() => setItemToRename(null)} onRename={handleRename} />
        </>
    );
};

export default App;