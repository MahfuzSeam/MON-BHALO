
import React, { useState, useEffect } from 'react';
import { MoodEntry } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const moodOptions = [
    { mood: 'very-happy', emoji: '😄', label: 'খুব ভালো', value: 5, color: '#22c55e' },
    { mood: 'happy', emoji: '😊', label: 'ভালো', value: 4, color: '#84cc16' },
    { mood: 'neutral', emoji: '😐', label: 'মোটামুটি', value: 3, color: '#facc15' },
    { mood: 'sad', emoji: '😔', label: 'মন খারাপ', value: 2, color: '#f97316' },
    { mood: 'very-sad', emoji: '😢', label: 'খুব খারাপ', value: 1, color: '#ef4444' },
] as const;

type Mood = typeof moodOptions[number]['mood'];

const MoodCheckIn: React.FC = () => {
    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
    const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
    const [showWelcomeBack, setShowWelcomeBack] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const storedHistory: MoodEntry[] = JSON.parse(localStorage.getItem('moodHistory') || '[]');
        setMoodHistory(storedHistory);

        const lastCheckin = storedHistory.length > 0 ? new Date(storedHistory[storedHistory.length - 1].date) : null;
        if (lastCheckin) {
            const today = new Date();
            const diffTime = Math.abs(today.getTime() - lastCheckin.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays >= 3) {
                setShowWelcomeBack(true);
            }
        }
    }, []);
    
    const handleSaveMood = () => {
        if (!selectedMood) return;

        const today = new Date().toISOString().split('T')[0];
        const newEntry: MoodEntry = { date: today, mood: selectedMood };
        
        const updatedHistory = moodHistory.filter(entry => entry.date !== today);
        updatedHistory.push(newEntry);
        updatedHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setMoodHistory(updatedHistory);
        localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
        setSelectedMood(null);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const getChartData = () => {
        const data = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            const entry = moodHistory.find(e => e.date === dateString);
            const moodInfo = moodOptions.find(opt => opt.mood === entry?.mood);
            data.push({
                name: date.toLocaleDateString('bn-BD', { weekday: 'short' }),
                value: moodInfo ? moodInfo.value : 0,
                color: moodInfo ? moodInfo.color : '#e5e7eb'
            });
        }
        return data;
    };

    return (
        <section id="checkin" className="bg-white p-6 md:p-8 rounded-lg shadow-md my-6">
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">আপনার আজকের মেজাজ কেমন?</h2>
            <p className="text-gray-600 mb-6">আপনার অনুভূতি ট্র্যাক করুন এবং ব্যক্তিগতকৃত সহায়তা পান।</p>

            {showWelcomeBack && (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-4 mb-6 rounded-r-lg">
                    <h3 className="font-bold">আবারও স্বাগতম!</h3>
                    <p>আমরা দেখতে পাচ্ছি আপনি কয়েকদিন পর ফিরেছেন। আমরা জানি জীবন কখনো কখনো ব্যস্ত হয়ে যায়। আপনি যখন প্রস্তুত, আপনার মেজাজ শেয়ার করতে পারেন। কোন চাপ নেই!</p>
                </div>
            )}
            
            <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 p-4 mb-6 italic rounded-r-lg">
                <p>"যখন আমি পরীক্ষার আগে ৩টায় প্যানিক অ্যাটাক নিয়ে জেগে থাকতাম, কেউ জিজ্ঞাসা করেনি 'ভাই, কেমন আছ?' এখন আমি অন্যদের জন্য সেই নিরাপদ জায়গাটা বানাতে চাই।"</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-emerald-800 mb-4">আপনি আজ কেমন বোধ করছেন?</h3>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    {moodOptions.map(({ mood, emoji, label }) => (
                        <div key={mood} onClick={() => setSelectedMood(mood)}
                            className={`flex-1 min-w-[80px] text-center p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 ${selectedMood === mood ? 'bg-emerald-600 text-white border-emerald-700 scale-110' : 'bg-white hover:bg-emerald-100 border-transparent'}`}>
                            <div className="text-4xl mb-2">{emoji}</div>
                            <div className="font-medium">{label}</div>
                        </div>
                    ))}
                </div>
                <button onClick={handleSaveMood} className="w-full sm:w-auto bg-amber-500 text-emerald-900 font-bold py-3 px-8 rounded-lg hover:bg-amber-600 transition duration-300 disabled:bg-gray-300" disabled={!selectedMood}>
                    আমার মেজাজ সংরক্ষণ করুন
                </button>
                 {showSuccess && <p className="text-green-600 mt-4 text-center">আপনার মেজাজ সফলভাবে সংরক্ষণ করা হয়েছে!</p>}
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold text-emerald-800 mb-2">আপনার মেজাজের ইতিহাস (গত ৭ দিন)</h3>
                <div className="h-64 w-full bg-gray-50 p-4 rounded-lg">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getChartData()} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <XAxis dataKey="name" tick={{ fill: '#4b5563' }} />
                            <YAxis domain={[0, 5]} hide={true} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
                                labelStyle={{ color: '#10b981' }}
                                formatter={(value) => {
                                    const mood = moodOptions.find(m => m.value === value);
                                    return mood ? mood.label : 'কোনো তথ্য নেই';
                                }}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                               {getChartData().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
             <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 mt-8 rounded-r-lg text-sm">
                <strong>গোপনীয়তা নোট:</strong> আপনার মেজাজের তথ্য শুধুমাত্র আপনার ডিভাইসে সংরক্ষণ করা হয় এবং অন্য কারো সাথে শেয়ার করা হয় না।
            </div>
        </section>
    );
};

export default MoodCheckIn;
