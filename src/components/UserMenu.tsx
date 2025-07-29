'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User, LogOut, Save, Download, ChevronDown } from 'lucide-react';

interface UserMenuProps {
  user: {id: string; email?: string};
  onSignOut: () => void;
  projectName?: string;
}

export default function UserMenu({ user, onSignOut, projectName }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    onSignOut();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 flex items-center gap-2 transition-colors"
      >
        <User className="w-4 h-4" />
        <span className="text-sm">{user.email?.split('@')[0]}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-lg border border-gray-800 shadow-xl z-20">
            <div className="p-2">
              <div className="px-3 py-2 text-sm text-gray-400">
                {user.email}
              </div>
              {projectName && (
                <div className="px-3 py-1 text-xs text-gray-500">
                  Project: {projectName}
                </div>
              )}
              <hr className="my-2 border-gray-800" />
              <button
                onClick={() => {
                  // Auto-save is automatic, this is just a manual trigger
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Progress
              </button>
              <button
                onClick={() => {
                  // Export functionality to be implemented
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Data
              </button>
              <hr className="my-2 border-gray-800" />
              <button
                onClick={handleSignOut}
                className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-800 rounded flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}