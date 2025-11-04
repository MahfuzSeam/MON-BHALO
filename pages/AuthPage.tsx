
import React, { useState } from 'react';
import { User } from '../types';

interface AuthPageProps {
    onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-emerald-800">
                    মন <span className="text-amber-500">ভালো</span>
                </h1>
                <p className="text-emerald-700 mt-2">আপনার মানসিক সুস্থতা আমাদের অগ্রাধিকার</p>
            </div>
            <div className="w-full max-w-md">
                {isRegistering ? (
                    <RegisterForm onLogin={onLogin} showLogin={() => setIsRegistering(false)} />
                ) : (
                    <LoginForm onLogin={onLogin} showRegister={() => setIsRegistering(true)} />
                )}
            </div>
             <footer className="text-center mt-12 text-emerald-600">
                &copy; ২০২৫ মন ভালো - বাংলাদেশের জন্য মানসিক স্বাস্থ্য সহায়তা | BAIUST CSE Fall Fest Hackathon
            </footer>
        </div>
    );
};

const LoginForm: React.FC<{ onLogin: (user: User) => void; showRegister: () => void; }> = ({ onLogin, showRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('দয়া করে সব ফিল্ড পূরণ করুন।');
            return;
        }

        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        // This is a mock password check. In a real app, passwords would be hashed.
        const user = users.find(u => (u.email === email || u.phone === email));

        if (user) {
             // In a real app, you'd compare a hashed password. Here we skip for simplicity.
            onLogin(user);
        } else {
            setError('ভুল ইমেইল/ফোন বা পাসওয়ার্ড।');
        }
    };
    
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-emerald-800 mb-6">লগ ইন করুন</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="loginEmail" className="block text-emerald-700 font-medium mb-2">ইমেইল বা ফোন নম্বর</label>
                    <input type="text" id="loginEmail" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="আপনার ইমেইল বা ফোন নম্বর" />
                </div>
                <div className="mb-6">
                    <label htmlFor="loginPassword"  className="block text-emerald-700 font-medium mb-2">পাসওয়ার্ড</label>
                    <input type="password" id="loginPassword" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="আপনার পাসওয়ার্ড" />
                </div>
                <button type="submit" className="w-full bg-amber-500 text-emerald-900 font-bold py-2 px-4 rounded-lg hover:bg-amber-600 transition duration-300">লগ ইন</button>
            </form>
            <div className="text-center mt-6">
                <p className="text-gray-600">অ্যাকাউন্ট নেই? <button onClick={showRegister} className="text-emerald-700 hover:underline font-semibold">এখানে রেজিস্টার করুন</button></p>
            </div>
        </div>
    );
};


const RegisterForm: React.FC<{ onLogin: (user: User) => void; showLogin: () => void; }> = ({ onLogin, showLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!name || !email || !phone || !password || !confirmPassword) {
            setError('দয়া করে সব ফিল্ড পূরণ করুন।');
            return;
        }
        if (password !== confirmPassword) {
            setError('পাসওয়ার্ড মিলেনি।');
            return;
        }

        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) {
            setError('এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে।');
            return;
        }

        const newUser: User = { id: Date.now().toString(), name, email, phone };
        // In a real app, you'd hash the password before saving.
        // For this demo, we are not saving the password.
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        onLogin(newUser);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-emerald-800 mb-6">নতুন অ্যাকাউন্ট তৈরি করুন</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="registerName" className="block text-emerald-700 font-medium mb-2">পুরো নাম</label>
                    <input type="text" id="registerName" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="আপনার পুরো নাম" />
                </div>
                <div className="mb-4">
                    <label htmlFor="registerEmail" className="block text-emerald-700 font-medium mb-2">ইমেইল</label>
                    <input type="email" id="registerEmail" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="আপনার ইমেইল ঠিকানা" />
                </div>
                <div className="mb-4">
                    <label htmlFor="registerPhone" className="block text-emerald-700 font-medium mb-2">ফোন নম্বর</label>
                    <input type="tel" id="registerPhone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="আপনার ফোন নম্বর" />
                </div>
                <div className="mb-4">
                    <label htmlFor="registerPassword"  className="block text-emerald-700 font-medium mb-2">পাসওয়ার্ড</label>
                    <input type="password" id="registerPassword" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="পাসওয়ার্ড তৈরি করুন" />
                </div>
                <div className="mb-6">
                    <label htmlFor="registerConfirmPassword"  className="block text-emerald-700 font-medium mb-2">পাসওয়ার্ড নিশ্চিত করুন</label>
                    <input type="password" id="registerConfirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="পাসওয়ার্ড আবার লিখুন" />
                </div>
                <button type="submit" className="w-full bg-amber-500 text-emerald-900 font-bold py-2 px-4 rounded-lg hover:bg-amber-600 transition duration-300">রেজিস্টার করুন</button>
            </form>
            <div className="text-center mt-6">
                <p className="text-gray-600">ইতিমধ্যে অ্যাকাউন্ট আছে? <button onClick={showLogin} className="text-emerald-700 hover:underline font-semibold">লগ ইন করুন</button></p>
            </div>
        </div>
    );
};

export default AuthPage;
