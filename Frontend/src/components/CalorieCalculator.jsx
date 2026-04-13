import React, { useState } from 'react';
import { Activity, Flame, Droplets, Wheat, Target, ArrowRight } from 'lucide-react';

const CalorieCalculator = ({ onComplete }) => {
    const [formData, setFormData] = useState({
        age: 25,
        gender: 'male',
        weight: 70,
        height: 175,
        activity: 'moderate',
        goal: 'maintain'
    });

    const [results, setResults] = useState(null);

    const calculateMacros = (e) => {
        e.preventDefault();

        // Mifflin-St Jeor Equation
        // Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
        // Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161

        let bmr = (10 * formData.weight) + (6.25 * formData.height) - (5 * formData.age);
        bmr += formData.gender === 'male' ? 5 : -161;

        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9
        };

        let tdee = bmr * activityMultipliers[formData.activity];

        // Adjust for goal
        if (formData.goal === 'lose') tdee *= 0.8; // 20% deficit
        if (formData.goal === 'gain') tdee *= 1.1; // 10% surplus

        tdee = Math.round(tdee);

        // Macro split: 30% Protein, 35% Carbs, 35% Fats (Generic balanced split)
        const protein = Math.round((tdee * 0.3) / 4); // 4 cals per gram
        const carbs = Math.round((tdee * 0.35) / 4);
        const fats = Math.round((tdee * 0.35) / 9); // 9 cals per gram

        setResults({ calories: tdee, protein, carbs, fats });
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl">
                    <Activity size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Calorie & Macro Calculator</h2>
            </div>
            <p className="text-slate-500 mb-8 ml-14">Set up your optimal daily targets to reach your fitness goals.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <form onSubmit={calculateMacros} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1.5">Age</label>
                            <input
                                type="number"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1.5">Gender</label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1.5">Weight (kg)</label>
                            <input
                                type="number"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1.5">Height (cm)</label>
                            <input
                                type="number"
                                value={formData.height}
                                onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">Activity Level</label>
                        <select
                            value={formData.activity}
                            onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue">
                            <option value="sedentary">Sedentary (Office Job)</option>
                            <option value="light">Lightly Active (1-3 days/week)</option>
                            <option value="moderate">Moderately Active (3-5 days/week)</option>
                            <option value="active">Very Active (6-7 days/week)</option>
                            <option value="very_active">Extra Active (Athlete/Physical Job)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">Fitness Goal</label>
                        <div className="grid grid-cols-3 gap-3">
                            {['lose', 'maintain', 'gain'].map((goal) => (
                                <button
                                    key={goal}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, goal })}
                                    className={`px-3 py-2.5 rounded-xl text-sm font-bold capitalize transition-colors ${formData.goal === goal ? 'bg-orange-500 text-white shadow-md shadow-orange-200' : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'}`}
                                >
                                    {goal}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-200 hover:bg-slate-900 transition-colors">
                        Calculate Macros
                    </button>
                </form>

                {results ? (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between animate-in zoom-in duration-300">
                        <div>
                            <div className="text-center mb-8">
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Daily Target</h3>
                                <div className="flex items-center justify-center gap-2 text-5xl font-extrabold text-slate-800">
                                    {results.calories} <span className="text-xl text-slate-400 font-medium">kcal</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-rose-100 text-rose-500 rounded-lg"><Flame size={20} /></div>
                                        <span className="font-bold text-slate-700">Protein</span>
                                    </div>
                                    <div className="text-xl font-extrabold text-slate-800">{results.protein}g</div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-amber-100 text-amber-500 rounded-lg"><Wheat size={20} /></div>
                                        <span className="font-bold text-slate-700">Carbs</span>
                                    </div>
                                    <div className="text-xl font-extrabold text-slate-800">{results.carbs}g</div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-yellow-100 text-yellow-500 rounded-lg"><Droplets size={20} /></div>
                                        <span className="font-bold text-slate-700">Fats</span>
                                    </div>
                                    <div className="text-xl font-extrabold text-slate-800">{results.fats}g</div>
                                </div>
                            </div>
                        </div>

                        {onComplete && (
                            <button onClick={() => onComplete(results)} className="mt-8 w-full py-3.5 bg-brand-blue text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                Continue to Dashboard <ArrowRight size={18} />
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-center min-h-[400px]">
                        <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 mb-4 shadow-inner">
                            <Target size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">No Data Yet</h3>
                        <p className="text-slate-500 mt-2 max-w-[250px]">Enter your stats and goals on the left to generate your personalized macro breakdown.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalorieCalculator;
