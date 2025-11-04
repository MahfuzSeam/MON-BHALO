
import React from 'react';
import { User } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Features from '../components/Features';
import MoodCheckIn from '../components/MoodCheckIn';
import HelpRequestForm from '../components/HelpRequestForm';
import SeasonalTips from '../components/SeasonalTips';
import HealthTracker from '../components/HealthTracker';
import SymptomGuide from '../components/SymptomGuide';
import HealthMap from '../components/HealthMap';
import CrisisContacts from '../components/CrisisContacts';

interface MainPageProps {
    user: User;
    onLogout: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ user, onLogout }) => {
    return (
        <>
            <Header user={user} onLogout={onLogout} />
            <main className="container mx-auto px-4 py-5 max-w-7xl">
                <Hero />
                <div className="bg-amber-100 border border-dashed border-amber-500 text-amber-900 italic p-4 rounded-lg my-6 text-center">
                    <p><strong>বাস্তবতা:</strong> ২২০ জন মনোরোগ বিশেষজ্ঞ ১৭ কোটি মানুষের জন্য। আমরা ২৪ ঘন্টার হ্যাকাথনে এই সমস্যার সমাধান করতে পারব? সম্ভবত না, তবে অন্তত আমরা চেষ্টা করছি!</p>
                </div>
                <Features />
                <MoodCheckIn />
                <HelpRequestForm />
                <SeasonalTips />
                <HealthTracker />
                <SymptomGuide />
                <HealthMap />
                <CrisisContacts />
            </main>
            <Footer />
        </>
    );
};

export default MainPage;
