import React from 'react';
import StatCard from './StatCard';

const TopSkillsWidget = ({ skills }) => {
    const brandColors = [
        { bg: 'bg-red-500', char: 'G' },
        { bg: 'bg-green-500', char: 'S' },
        { bg: 'bg-orange-500', char: 'T' },
        { bg: 'bg-blue-500', char: 'M' },
    ];

    return (
        <StatCard title="Top In-Demand Skills" action={<button className="text-slate-400 hover:text-brand-blue text-sm transition-colors">Track Applications &gt;</button>}>
            <div className="space-y-4">
                {skills && skills.length > 0 ? skills.slice(0, 4).map((skill, i) => (
                    <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${brandColors[i % brandColors.length].bg}`}>
                                {brandColors[i % brandColors.length].char}
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-slate-800">{skill}</p>
                                <span className="w-px h-3 bg-slate-200 block"></span>
                                <span className="text-xs text-slate-400">Verified Match</span>
                            </div>
                        </div>
                    </div>
                )) : (
                    <p className="text-slate-400 text-sm py-4">Upload CV to extract your top skills</p>
                )}
            </div>
        </StatCard>
    );
};

export default TopSkillsWidget;
