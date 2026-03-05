import React from 'react';
import { PlayCircle, Award, Clock, ArrowRight } from 'lucide-react';
import StatCard from '../components/StatCard';

const mockCourses = [
    {
        id: 1,
        title: "AWS Certified Solutions Architect",
        platform: "Udemy",
        progress: 65,
        totalHours: 42,
        completedHours: 27,
        image: "https://images.unsplash.com/photo-1620912189866-47484320b355?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 2,
        title: "Machine Learning Specialization",
        platform: "Coursera",
        progress: 15,
        totalHours: 80,
        completedHours: 12,
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 3,
        title: "System Design for Interviews",
        platform: "Kaggle",
        progress: 0,
        totalHours: 10,
        completedHours: 0,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=200"
    }
];

const CoursesPage = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Courses & Skills</h1>
                    <p className="text-slate-500 mt-2">Track your upskilling progress to close the gaps identified by AI.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Active Courses */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-slate-800">In Progress</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockCourses.map(course => (
                            <div key={course.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group flex flex-col">
                                <div className="h-32 w-full relative overflow-hidden bg-slate-100">
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur text-xs font-bold text-slate-800 rounded-md">
                                        {course.platform}
                                    </div>
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircle className="text-white w-12 h-12" />
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-bold text-slate-800 line-clamp-2 min-h-[48px]">{course.title}</h3>

                                    <div className="mt-auto pt-4">
                                        <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
                                            <span>{course.progress}% Complete</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {course.completedHours} / {course.totalHours} hrs</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ${course.progress > 50 ? 'bg-green-500' : 'bg-brand-blue'}`}
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <StatCard title="Skill Completion">
                        <div className="flex flex-col items-center justify-center py-4">
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                {/* Simple CSS donut chart representation */}
                                <div className="absolute inset-0 rounded-full border-[12px] border-slate-100"></div>
                                <div className="absolute inset-0 rounded-full border-[12px] border-brand-blue border-r-transparent border-t-transparent -rotate-45"></div>
                                <div className="text-center">
                                    <Award className="w-8 h-8 text-brand-blue mx-auto mb-1" />
                                    <span className="font-bold text-xl text-slate-800">Level 4</span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 font-medium text-center mt-6">
                                You are <strong className="text-brand-blue">2 skills away</strong> from matching 95% of Senior roles.
                            </p>
                        </div>
                    </StatCard>

                    <div className="bg-slate-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="font-bold text-lg mb-2">Unlock Certification</h4>
                            <p className="text-slate-400 text-sm mb-6">Complete your AWS course to claim your digital badge and boost your CV score to 92.</p>
                            <button className="flex items-center gap-2 text-sm font-bold text-brand-light hover:text-white transition-colors">
                                Go to course <ArrowRight size={16} />
                            </button>
                        </div>
                        <Award className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-700 opacity-50" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CoursesPage;
