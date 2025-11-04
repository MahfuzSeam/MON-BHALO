
import React from 'react';

const CrisisContacts: React.FC = () => {
    return (
        <section id="support" className="bg-white p-6 md:p-8 rounded-lg shadow-md my-6">
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">জরুরি সহায়তা</h2>
            <p className="text-gray-600 mb-6">যদি আপনি বা আপনার পরিচিত কেউ মানসিক সংকটে থাকেন, নিচের হেল্পলাইনে যোগাযোগ করুন:</p>

            <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-900 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold mb-4">জরুরি যোগাযোগ</h3>
                <ul className="space-y-3">
                    <li className="flex items-center">
                        <span className="text-emerald-700 font-bold mr-3 text-lg">•</span>
                        <span>জাতীয় মানসিক স্বাস্থ্য ইনস্টিটিউট হাসপাতাল: <strong>০১৭১৩-৩০৪৯৯৫</strong></span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-emerald-700 font-bold mr-3 text-lg">•</span>
                        <span>মানসিক স্বাস্থ্য কাউন্সেলিং: <strong>১০৬৬৭</strong></span>
                    </li>
                     <li className="flex items-center">
                        <span className="text-emerald-700 font-bold mr-3 text-lg">•</span>
                        <span>সাইকিয়াট্রিক কেয়ার: <strong>০১৭১৬-৬২৩৪৮৬</strong></span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-emerald-700 font-bold mr-3 text-lg">•</span>
                        <span>বাংলাদেশ প্রিভেন্টিভ সোসাইটি: <strong>০১৭১৫-৫৫৪৩৯১</strong></span>
                    </li>
                </ul>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 mt-8 rounded-r-lg">
                <strong>গুরুত্বপূর্ণ নোট:</strong> এই অ্যাপ্লিকেশনটি চিকিৎসা পরামর্শ প্রদান করে না। জরুরি অবস্থায় উপরের হেল্পলাইনে যোগাযোগ করুন বা নিকটস্থ স্বাস্থ্যকেন্দ্রে যান।
            </div>
        </section>
    );
};

export default CrisisContacts;
