import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import UploadWidget from './components/UploadWidget';
import JobMatchesWidget from './components/JobMatchesWidget';
import SkillRecsWidget from './components/SkillRecsWidget';
import TopSkillsWidget from './components/TopSkillsWidget';
import StatCard from './components/StatCard';
import RadialProgress from './components/RadialProgress';
import LearningPath from './components/LearningPath';
import ChatbotWidget from './components/ChatbotWidget';

// Pages
import JobMatchesPage from './pages/JobMatchesPage';
import CoursesPage from './pages/CoursesPage';
import TrackerPage from './pages/TrackerPage';
import ProfilePage from './pages/ProfilePage';

function DashboardContent({ file, isAnalyzing, handleFileUpload, results }) {
  return (
    <>
      {/* Top Grid Area: Upload + Matches + Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <UploadWidget file={file} isAnalyzing={isAnalyzing} onFileUpload={handleFileUpload} />
        <JobMatchesWidget matches={results?.recommendations} />
        <SkillRecsWidget skills={results?.missingSkills} />
      </div>

      {/* Bottom Grid Area: Insights + In-Demand + Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <StatCard title="Career Insights">
            <div className="pt-2 pb-2 flex flex-col items-center justify-center">
              <h4 className="text-sm font-semibold text-slate-500 uppercase mb-6 self-start">Your Skills Fit</h4>
              <RadialProgress
                value={results?.score || 0}
                label={results ? "Good Fit" : "Pending"}
                sublabel={results ? `for ${results.recommendations?.[0]?.role || 'many roles'}` : "Upload CV"}
              />
            </div>
          </StatCard>

          <TopSkillsWidget skills={results?.topSkills} />

          <div className="md:col-span-2 mt-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
            <h4 className="text-sm font-bold text-slate-800 mb-4">Personalized Learning Path</h4>
            <LearningPath steps={results ? ["Update Resume", ...results.missingSkills.map(s => s.skill), "Apply for Role"] : []} />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>

        </div>

        <div className="relative rounded-2xl bg-gradient-to-br from-brand-light to-blue-100 border border-blue-200 p-8 flex flex-col items-center justify-end overflow-hidden shadow-sm min-h-[300px]">
          <div className="relative z-10 text-center flex flex-col items-center h-full justify-center">
            <div className="w-40 h-40 mb-6 relative">
              <div className="absolute inset-0 bg-white/50 rounded-full blur-2xl"></div>
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=transparent&size=200" alt="Avatar Character" className="w-full h-full relative z-10 drop-shadow-xl" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Learn & Grow</h3>
            <p className="text-sm text-slate-600 mt-2 font-medium">Master the skills needed to land your dream job.</p>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileUpload = async (selectedFile) => {
    setFile(selectedFile);
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:8000/api/analyze-cv', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Analysis failed");
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error analyzing CV:", error);
      alert("Failed to analyze CV. Ensure the backend and API Key are ready.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Router>
      <div className="pl-64 min-h-screen bg-slate-50 relative overflow-hidden flex">
        <Sidebar />

        <main className="flex-1 p-8 max-w-7xl mx-auto z-10 w-full">
          <TopNav />

          <Routes>
            <Route path="/" element={
              <DashboardContent
                file={file}
                isAnalyzing={isAnalyzing}
                handleFileUpload={handleFileUpload}
                results={results}
              />
            } />
            <Route path="/jobs" element={<JobMatchesPage results={results} />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>

          {/* Background decorative waves/glow */}
          <div className="absolute -z-10 bottom-0 right-0 w-[800px] h-[800px] bg-brand-light rounded-full blur-[120px] opacity-40 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

          <ChatbotWidget missingSkills={results?.missingSkills} />
        </main>
      </div>
    </Router>
  );
}

export default App;
