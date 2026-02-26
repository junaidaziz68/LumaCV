import React from 'react';

const StatCard = ({ title, children, className = "", action }) => {
    return (
        <div className={`glass-card p-6 flex flex-col h-full bg-white ${className}`}>
            {title && (
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                    {action}
                </div>
            )}
            <div className="flex-1 flex flex-col justify-center">
                {children}
            </div>
        </div>
    );
};

export default StatCard;
