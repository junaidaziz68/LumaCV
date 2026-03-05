import React from 'react';
import { User, Mail, Link as LinkIcon, Briefcase, FileText, Settings, Key, Bell, Shield, LogOut } from 'lucide-react';
import StatCard from '../components/StatCard';

const ProfilePage = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-8">Profile Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Left Navigation */}
                <div className="md:col-span-1 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-slate-100 text-slate-800 font-bold rounded-xl transition-colors">
                        <User size={18} /> Public Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-700 rounded-xl transition-colors">
                        <Settings size={18} /> Account Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-700 rounded-xl transition-colors">
                        <Bell size={18} /> Notifications
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-700 rounded-xl transition-colors">
                        <Shield size={18} /> Privacy & Security
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors mt-8">
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>

                {/* Main Content */}
                <div className="md:col-span-3 space-y-6">

                    {/* Basic Info */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Basic Information</h2>

                        <div className="flex flex-col sm:flex-row gap-8 items-start mb-8 pb-8 border-b border-slate-100">
                            <div className="relative group cursor-pointer">
                                <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-md overflow-hidden">
                                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=transparent" alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-xs font-bold">Edit</span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 w-full">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-500 mb-1.5">First Name</label>
                                        <input type="text" defaultValue="Alex" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-500 mb-1.5">Last Name</label>
                                        <input type="text" defaultValue="Developer" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1.5">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail size={16} className="text-slate-400" />
                                        </div>
                                        <input type="email" defaultValue="alex@example.com" className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-slate-800 mb-6">Career Profile</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1.5">Current Role / Headline</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Briefcase size={16} className="text-slate-400" />
                                    </div>
                                    <input type="text" defaultValue="Software Engineer | React & Node.js" className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1.5">Portfolio or LinkedIn URL</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <LinkIcon size={16} className="text-slate-400" />
                                    </div>
                                    <input type="url" defaultValue="https://github.com/alexdev" className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button className="px-6 py-2.5 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue-hover transition-colors shadow-sm">
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Resume Management */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Resume Management</h2>

                        <div className="border border-slate-200 rounded-xl p-4 flex items-center justify-between group hover:border-brand-blue transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center text-brand-blue">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Software_Engineer_CV_2026.pdf</h4>
                                    <p className="text-xs text-slate-500">Uploaded 2 days ago • 1.2 MB</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 text-sm font-bold text-brand-blue bg-brand-blue/10 rounded-lg hover:bg-brand-blue hover:text-white transition-colors">
                                    View
                                </button>
                            </div>
                        </div>

                        <button className="mt-4 w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-bold hover:border-brand-blue hover:text-brand-blue transition-colors flex items-center justify-center gap-2">
                            + Upload New Version
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
