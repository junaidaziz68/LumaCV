import React from 'react';
import { ChevronRight, Briefcase } from 'lucide-react';

const LearningPath = ({ steps }) => {
    if (!steps || steps.length === 0) {
        return (
            <div className="flex items-center justify-center p-4 text-slate-400">
                Upload CV to generate your learning path
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl min-w-max shadow-sm">
                        {index === steps.length - 1 && <Briefcase size={16} className="text-slate-400" />}
                        <span className="text-sm font-medium text-slate-700 whitespace-nowrap">{step}</span>
                        {index === steps.length - 1 && <span className="text-xs px-2 py-0.5 bg-brand-light text-brand-blue rounded-full ml-1">Goal</span>}
                    </div>
                    {index < steps.length - 1 && (
                        <ChevronRight size={16} className="text-slate-300 flex-shrink-0" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default LearningPath;
