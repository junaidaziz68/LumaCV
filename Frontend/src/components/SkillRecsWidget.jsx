import React from 'react';
import { BookMarked, GraduationCap } from 'lucide-react';
import StatCard from './StatCard';

const SkillRecsWidget = ({ skills }) => {
    return (
        <StatCard title="Skill Recommendations" action={<button className="text-slate-400 hover:text-brand-blue text-sm transition-colors">View All &gt;</button>}>
            <div className="space-y-4">
                {skills && skills.length > 0 ? skills.map((item, i) => (
                    <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                        <div className="flex items-start gap-3 flex-1 min-w-0 pr-4">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0 mt-0.5">
                                <BookMarked size={16} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <p className="text-sm font-semibold text-slate-800 truncate">{item.skill}</p>
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-blue hover:underline truncate" title={item.courseName}>
                                    {item.courseName} <span className="text-slate-400">({item.platform})</span>
                                </a>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600 flex-shrink-0">
                            <GraduationCap size={16} />
                        </div>
                    </div>
                )) : (
                    <div className="flex flex-col items-center justify-center py-4 text-slate-400">
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-2">
                            <BookMarked size={20} className="text-slate-300" />
                        </div>
                        <p className="text-sm">Upload CV for recommendations</p>
                    </div>
                )}
            </div>
        </StatCard>
    );
};

export default SkillRecsWidget;
