import React from 'react';
import { User, ChevronRight } from 'lucide-react';
import StatCard from './StatCard';

const JobMatchesWidget = ({ matches }) => {
    return (
        <StatCard title="Job Matches for You" action={<button className="text-slate-400 hover:text-brand-blue text-sm transition-colors">View All Jobs &gt;</button>}>
            <div className="space-y-4">
                {matches && matches.length > 0 ? matches.map((match, i) => (
                    <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-blue">
                                <User size={16} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">{match.role}</p>
                                <p className="text-xs text-slate-500">{match.match} Match</p>
                            </div>
                        </div>
                        <button className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-amber-600 transition-colors shadow-sm cursor-pointer">
                            <ChevronRight size={14} />
                        </button>
                    </div>
                )) : (
                    <div className="flex flex-col items-center justify-center py-4 text-slate-400">
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-2">
                            <User size={20} className="text-slate-300" />
                        </div>
                        <p className="text-sm">Upload CV to see matches</p>
                    </div>
                )}
            </div>
        </StatCard>
    );
};

export default JobMatchesWidget;
