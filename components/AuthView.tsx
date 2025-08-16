import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const AuthView: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    console.log('Starting authentication...', { isSignUp, email });

    try {
      if (isSignUp) {
        console.log('Attempting sign up...');
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: undefined
          }
        });
        
        console.log('Sign up response:', { data, error });
        
        if (error) throw error;
        
        if (data.user && !data.session) {
          setMessage('Please check your email to confirm your account, then sign in.');
        } else {
          setMessage('Account created successfully! You can now sign in.');
        }
        setIsSignUp(false);
      } else {
        console.log('Attempting sign in...');
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        console.log('Sign in response:', { data, error });
        
        if (error) throw error;
        
        console.log('Sign in successful!');
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      setMessage(`Error: ${error.message || 'Authentication failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg-page dark:bg-dark-bg-page flex items-center justify-center p-4">
      <div className="bg-light-bg-component dark:bg-dark-bg-component rounded-lg shadow-lg w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
            Artemo AI
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-light-bg-component dark:bg-dark-bg-component border border-light-border dark:border-dark-border rounded-sm focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20 outline-none"
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-light-bg-component dark:bg-dark-bg-component border border-light-border dark:border-dark-border rounded-sm focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20 outline-none"
              required
              placeholder="Enter your password"
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary-accent text-text-on-accent rounded-sm hover:opacity-85 disabled:opacity-50 font-medium transition-opacity"
          >
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-sm border ${
            message.includes('Error') 
              ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
              : 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300'
          }`}>
            <p className="text-sm">{message}</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary-accent hover:opacity-85 text-sm transition-opacity"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>

        <div className="mt-4 text-xs text-light-text-tertiary dark:text-dark-text-tertiary text-center">
          <p>Debug: Check browser console for detailed logs</p>
        </div>
      </div>
    </div>
  );
};