
import React from 'react';

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-emerald-50 rounded-lg p-6 text-center transition-transform transform hover:-translate-y-2 duration-300 shadow-sm hover:shadow-lg">
        <div className="text-5xl mb-4 text-emerald-600">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-emerald-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const Features: React.FC = () => {
    const features = [
        { icon: '📱', title: 'মোবাইল-ফার্স্ট', description: 'সব ধরনের মোবাইল ডিভাইসে ব্যবহারের জন্য উপযোগী ডিজাইন' },
        { icon: '🌐', title: 'অফলাইন সমর্থন', description: 'ইন্টারনেট ছাড়াই মূল বৈশিষ্ট্যগুলো ব্যবহার করুন' },
        { icon: '🔒', title: 'গোপনীয়তা সুরক্ষিত', description: 'আপনার তথ্য নিরাপদে সংরক্ষণ করা হয়' },
        { icon: '🗣️', title: 'বাংলা ভাষায়', description: 'সহজ ও স্পষ্ট বাংলা ভাষায় সমস্ত কন্টেন্ট' },
    ];

    return (
        <section className="py-12 my-6">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-emerald-800">আমাদের বৈশিষ্ট্য</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>
        </section>
    );
};

export default Features;
