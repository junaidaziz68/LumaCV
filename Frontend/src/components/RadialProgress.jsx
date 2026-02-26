import React from 'react';
import { motion } from 'framer-motion';

const RadialProgress = ({ value, label, sublabel }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="flex items-center gap-6">
            <div className="relative w-28 h-28 flex-shrink-0">
                {/* Background circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="56" cy="56" r={radius}
                        fill="transparent"
                        stroke="#f1f5f9"
                        strokeWidth="12"
                    />
                    {/* Progress circle */}
                    <motion.circle
                        cx="56" cy="56" r={radius}
                        fill="transparent"
                        stroke="#3b82f6"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-slate-800">{value}%</span>
                    <span className="text-xs text-slate-500">Match</span>
                </div>
            </div>

            <div>
                <h4 className="text-xl font-bold text-slate-800">{label}</h4>
                <p className="text-slate-500 text-sm mt-1">{sublabel}</p>
            </div>
        </div>
    );
};

export default RadialProgress;
