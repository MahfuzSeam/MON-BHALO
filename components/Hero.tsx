
import React from 'react';

const Hero: React.FC = () => {
    return (
        <section id="home" className="bg-emerald-700 text-white text-center py-16 md:py-24 px-6 rounded-lg shadow-xl" style={{backgroundImage: "linear-gradient(rgba(16, 101, 78, 0.9), rgba(16, 101, 78, 0.7)), url('https://picsum.photos/1200/400?blur=5')"}}>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">আপনার মানসিক সুস্থতা আমাদের অগ্রাধিকার</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">বাংলাদেশের প্রতিটি মানুষের জন্য সহজলভ্য ও সাশ্রয়ী মানসিক স্বাস্থ্য সহায়তা</p>
            <a href="#help" className="bg-amber-400 text-emerald-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-500 transition-transform transform hover:scale-105 duration-300 inline-block">
                গোপনে সাহায্য নিন
            </a>
        </section>
    );
};

export default Hero;
