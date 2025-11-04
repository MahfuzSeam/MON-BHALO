
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLLIElement>(null);

    const navLinks = [
        { href: '#home', text: 'হোম' },
        { href: '#checkin', text: 'মেজাজ চেক-ইন' },
        { href: '#help', text: 'গোপন সহায়তা' },
        { href: '#seasonal', text: 'মৌসুমী স্বাস্থ্য' },
        { href: '#maternal', text: 'মা ও শিশু' },
        { href: '#symptoms', text: 'লক্ষণ গাইড' },
        { href: '#map', text: 'স্বাস্থ্য মানচিত্র' },
        { href: '#support', text: 'জরুরি যোগাযোগ' },
    ];

     useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-emerald-800 text-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-7xl">
                <div className="text-2xl font-bold">
                    মন <span className="text-amber-400">ভালো</span>
                </div>
                <nav className="hidden lg:flex items-center space-x-2">
                    {navLinks.map(link => (
                         <a key={link.href} href={link.href} className="px-3 py-2 rounded-md hover:bg-emerald-700 transition-colors">{link.text}</a>
                    ))}
                </nav>
                 <div className="hidden lg:block">
                    <div className="relative" ref={userMenuRef as any}>
                        <button onClick={() => setUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-emerald-700">
                            <span>{user.name}</span>
                            <svg className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">লগ আউট</a>
                            </div>
                        )}
                    </div>
                </div>
                <div className="lg:hidden">
                    <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <nav className="lg:hidden bg-emerald-800 pb-4">
                    {navLinks.map(link => (
                         <a key={link.href} href={link.href} className="block text-center py-2 px-4 hover:bg-emerald-700">{link.text}</a>
                    ))}
                    <div className="text-center mt-2 border-t border-emerald-700 pt-2">
                        <span className="block py-2 px-4 font-semibold">{user.name}</span>
                        <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="block py-2 px-4 hover:bg-emerald-700">লগ আউট</a>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
