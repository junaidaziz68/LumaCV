import React from 'react';
import { FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UploadWidget = ({ file, isAnalyzing, onFileUpload }) => {
    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0]) onFileUpload(e.dataTransfer.files[0]);
    };

    const handleFileInput = (e) => {
        if (e.target.files[0]) onFileUpload(e.target.files[0]);
    };

    return (
        <div
            className="glass-card flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white to-brand-light border-brand-blue/10 relative overflow-hidden"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <AnimatePresence mode="wait">
                {!isAnalyzing ? (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col sm:flex-row items-center gap-6 w-full"
                    >
                        <div className="w-24 h-24 bg-brand-light rounded-2xl flex items-center justify-center shadow-inner relative group border border-blue-100 flex-shrink-0">
                            <div className="absolute inset-0 bg-brand-blue/5 rounded-2xl group-hover:bg-brand-blue/10 transition-colors" />
                            <FileText className="w-10 h-10 text-brand-blue/50 group-hover:text-brand-blue transition-colors relative z-10" />
                            <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-brand-blue/30 border-4 border-white">
                                AI Scan
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-800 mb-1">
                                {file ? "Upload Another CV" : "Upload Your CV"}
                            </h3>
                            <p className="text-slate-500 text-sm mb-4">to Get Started</p>

                            <input
                                type="file"
                                id="cv-upload-dashboard"
                                className="hidden"
                                accept=".pdf,.doc,.docx,.txt"
                                onChange={handleFileInput}
                            />
                            <label
                                htmlFor="cv-upload-dashboard"
                                className="inline-flex bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-md shadow-brand-blue/20 cursor-pointer"
                            >
                                Upload CV
                            </label>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="analyzing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-4 w-full"
                    >
                        <div className="w-16 h-16 border-4 border-brand-light border-t-brand-blue rounded-full animate-spin mb-4"></div>
                        <h3 className="text-lg font-bold text-slate-800">Scanning CV...</h3>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UploadWidget;
