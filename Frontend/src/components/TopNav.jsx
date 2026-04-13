import React from 'react';
import { Mail, Bell, TriangleAlert, User } from 'lucide-react';

const TopNav = ({ userName }) => {
    return (
        <header className="flex justify-between items-center w-full mb-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-1">Welcome Back, {userName ? userName.split(' ')[0] : 'User'}!</h1>
                <p className="text-slate-500 text-sm">Let's Boost Your Career Today!</p>
            </div>

            <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors relative">
                    <Mail size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors relative">
                    <Bell size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors relative">
                    <TriangleAlert size={18} />
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-brand-orange rounded-full border-2 border-white"></span>
                </button>

                <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 ml-2 flex items-center justify-center overflow-hidden">
                    {/* Fallback avatar */}
                    <User size={20} className="text-slate-500" />
                </div>
            </div>
        </header>
    );
};

export default TopNav;
