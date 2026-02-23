import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, BookOpen, CheckSquare, User, GraduationCap } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen fixed left-0 top-0 pt-8 pb-8">
            <div className="flex items-center gap-3 px-8 mb-12">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                    <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl text-slate-800 tracking-tight">CareerHub</span>
            </div>

            <nav className="flex flex-col gap-2 px-4 flex-1">
                <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                <NavItem to="/jobs" icon={<Briefcase size={20} />} label="Job Matches" />
                <NavItem to="/courses" icon={<BookOpen size={20} />} label="Courses & Skills" />
                <NavItem to="/tracker" icon={<CheckSquare size={20} />} label="Application Tracker" />
                <NavItem to="/profile" icon={<User size={20} />} label="Profile" />
            </nav>
        </aside>
    );
};

const NavItem = ({ to, icon, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors ${isActive ? 'bg-slate-100 text-slate-800 font-medium' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`
            }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
}

export default Sidebar;
