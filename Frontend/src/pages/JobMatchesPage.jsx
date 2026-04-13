import React from 'react';
import { MapPin, DollarSign, Building2, Briefcase, ExternalLink, BookmarkPlus } from 'lucide-react';
import StatCard from '../components/StatCard';

const mockJobs = [
    {
        id: 1,
        title: "Senior Full Stack Engineer",
        company: "Stripe",
        location: "Remote (US)",
        salary: "$160k - $210k",
        match: 95,
        type: "Full-time",
        posted: "2 days ago",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=St"
    },
    {
        id: 2,
        title: "Frontend React Developer",
        company: "Vercel",
        location: "New York, NY",
        salary: "$130k - $160k",
        match: 88,
        type: "Full-time",
        posted: "5 hours ago",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=Vr"
    },
    {
        id: 3,
        title: "Software Engineer, Back End",
        company: "Discord",
        location: "San Francisco, CA",
        salary: "$150k - $190k",
        match: 82,
        type: "Full-time",
        posted: "1 day ago",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=Di"
    },
    {
        id: 4,
        title: "Cloud Infrastructure Engineer",
        company: "DataDog",
        location: "Remote",
        salary: "$145k - $185k",
        match: 75,
        type: "Contract",
        posted: "3 days ago",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=DD"
    }
];

const JobMatchesPage = ({ results }) => {
    // Use the backend generated jobs, or fallback to the mock list if no CV is uploaded yet
    const displayJobs = results?.recommendations || mockJobs;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Job Matches</h1>
                    <p className="text-slate-500 mt-2">Based on your CV, AI found {displayJobs.length} high-fit roles for you.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        Filter roles
                    </button>
                    <button className="px-4 py-2 bg-brand-blue text-white rounded-lg text-sm font-medium hover:bg-brand-blue-hover transition-colors shadow-sm shadow-brand-blue/20">
                        Upload newer CV
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    {displayJobs.map((job, idx) => (
                        <div key={job.id || idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">

                            {/* Match Badge */}
                            <div className="absolute top-6 right-6 flex items-center gap-2">
                                <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${job.match >= 90 ? 'bg-green-100 text-green-700' : job.match >= 80 ? 'bg-blue-100 text-brand-blue' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {job.match}% Match
                                </div>
                                <button className="text-slate-300 hover:text-brand-blue transition-colors">
                                    <BookmarkPlus size={20} />
                                </button>
                            </div>

                            <div className="flex gap-5">
                                <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50">
                                    <img src={job.logo || `https://api.dicebear.com/7.x/initials/svg?seed=${job.company}`} alt={job.company} className="w-full h-full object-cover" />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 pr-24 group-hover:text-brand-blue transition-colors cursor-pointer">{job.role || job.title}</h3>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                        <div className="flex items-center gap-1.5"><Building2 size={15} />{job.company}</div>
                                        <div className="flex items-center gap-1.5"><MapPin size={15} />{job.location}</div>
                                        <div className="flex items-center gap-1.5"><DollarSign size={15} />{job.salary}</div>
                                    </div>

                                    <div className="flex items-center gap-3 mt-4">
                                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">{job.type}</span>
                                        <span className="text-xs text-slate-400">Posted {job.posted || "Just now"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* View Button (Hover reveal) */}
                            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 hover:bg-white hover:border-brand-blue text-brand-blue rounded-lg text-sm font-medium transition-all">
                                    View details <ExternalLink size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <StatCard title="Application Tips">
                        <div className="space-y-4 text-sm text-slate-600">
                            <p className="pb-3 border-b border-slate-50"><strong className="text-slate-800">React & Node.js</strong> are your strongest selling points for these roles.</p>
                            <p className="pb-3 border-b border-slate-50">Stripe values <strong className="text-slate-800">API design</strong>. Try to highlight this in your cover letter.</p>
                            <p>You are missing <strong className="text-slate-800">AWS Certification</strong> for the DataDog role.</p>
                        </div>
                    </StatCard>

                    <div className="bg-gradient-to-br from-brand-blue to-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-brand-blue/20">
                        <Briefcase className="w-8 h-8 text-white/80 mb-4" />
                        <h4 className="font-bold text-lg mb-2">Ready to apply?</h4>
                        <p className="text-white/80 text-sm mb-6">Let LumaCV's AI completely generate tailored cover letters for each of these positions.</p>
                        <button className="w-full py-2.5 bg-white text-brand-blue rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                            Generate Cover Letters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobMatchesPage;
