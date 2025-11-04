
import React from 'react';

interface TipCardProps {
    title: string;
    bgColor: string;
    tips: { title: string; items: string[] };
}

const TipCard: React.FC<TipCardProps> = ({ title, bgColor, tips }) => (
    <div className="rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 duration-300">
        <div className={`${bgColor} text-white p-4 text-center`}>
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <div className="p-4 bg-white">
            <h4 className="font-semibold text-emerald-800 mb-2">{tips.title}</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
                {tips.items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    </div>
);

const SeasonalTips: React.FC = () => {
    const tipsData = [
        { title: 'বর্ষা মৌসুম (জুন-সেপ্টেম্বর)', bgColor: 'bg-blue-600', tips: { title: 'ডেঙ্গু প্রতিরোধ', items: ['জমে থাকা পানি পরিষ্কার করুন', 'মশারি ব্যবহার করুন', 'ফুল হাতা জামা পরুন', 'জ্বর হলে ডাক্তার দেখান'] } },
        { title: 'শীত মৌসুম (ডিসেম্বর-ফেব্রুয়ারি)', bgColor: 'bg-sky-500', tips: { title: 'সর্দি-কাশি ও নিউমোনিয়া', items: ['গরম পানি পান করুন', 'গরম কাপড় পরুন', 'শিশুদের নিউমোনিয়ার লক্ষণ দেখুন', 'ভিটামিন সি সমৃদ্ধ খাবার খান'] } },
        { title: 'গ্রীষ্ম মৌসুম (মার্চ-মে)', bgColor: 'bg-orange-500', tips: { title: 'ডায়রিয়া ও হিট স্ট্রোক', items: ['নিরাপদ পানি পান করুন', 'ওরাল স্যালাইন তৈরি করুন', 'সূর্যের তাপ এড়িয়ে চলুন', 'হালকা পোশাক পরুন'] } },
        { title: 'সারা বছর', bgColor: 'bg-green-600', tips: { title: 'সাধারণ স্বাস্থ্যবিধি', items: ['নিয়মিত হাত ধোয়া', 'ফলমূল ধুয়ে নিন', 'বাসি খাবার এড়িয়ে চলুন', 'নিয়মিত স্বাস্থ্য পরীক্ষা'] } },
    ];
    return (
        <section id="seasonal" className="py-12 my-6">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-emerald-800">মৌসুমী স্বাস্থ্য পরামর্শ</h2>
                 <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 p-4 mt-6 max-w-2xl mx-auto italic rounded-r-lg">
                    <p>"আমি ডেঙ্গু মৌসুমের কথা মনে করি: সবাই হঠাৎ করে এডিস মশা সম্পর্কে বিশেষজ্ঞ হয়ে যায়। আমার খালা ৪৭টি হোয়াটসঅ্যাপ বার্তা ফরওয়ার্ড করেছিলেন নিম পাতার বিষয়ে (কিছু সত্য, বেশিরভাগই ভুয়া তথ্য)।"</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {tipsData.map(tip => <TipCard key={tip.title} {...tip} />)}
            </div>
        </section>
    );
};

export default SeasonalTips;
