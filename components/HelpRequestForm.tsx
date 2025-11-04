
import React, { useState } from 'react';
import { getSupportiveMessage } from '../services/geminiService';

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse delay-0"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse delay-150"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse delay-300"></div>
        <span>প্রসেস করা হচ্ছে...</span>
    </div>
);

const HelpRequestForm: React.FC = () => {
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        setIsSubmitting(true);
        // Simulate offline queueing
        setTimeout(() => {
            const requests = JSON.parse(localStorage.getItem('helpRequests') || '[]');
            requests.push({ description, timestamp: new Date().toISOString() });
            localStorage.setItem('helpRequests', JSON.stringify(requests));
            setIsSubmitting(false);
            setSuccess('আপনার অনুরোধ সফলভাবে সংরক্ষণ করা হয়েছে। ইন্টারনেট সংযোগ পাওয়া মাত্রই এটি পাঠানো হবে।');
            setDescription('');
        }, 1000);
    };
    
    const handleAiAssist = async () => {
        if (!description.trim()) {
            setError('অনুগ্রহ করে প্রথমে আপনার সমস্যা সম্পর্কে কিছু লিখুন।');
            return;
        }
        setError('');
        setAiResponse('');
        setIsAiLoading(true);
        try {
            const response = await getSupportiveMessage(description);
            setAiResponse(response);
        } catch (err) {
            console.error(err);
            setError('দুঃখিত, এআই সহকারীর সাথে সংযোগ করতে সমস্যা হচ্ছে।');
        } finally {
            setIsAiLoading(false);
        }
    };

    return (
        <section id="help" className="bg-white p-6 md:p-8 rounded-lg shadow-md my-6">
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">গোপনে সাহায্য চান</h2>
            
            <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 p-4 my-6 italic rounded-r-lg">
                <p>"যদি আমি সাহায্য চাই, তাহলে কি সন্ধ্যার মধ্যে পুরো গ্রাম জেনে যাবে? বাংলাদেশে, বিশেষ করে গ্রামীণ এলাকায়, মানসিক স্বাস্থ্য নিয়ে কুসংস্কার রয়েছে। সাহায্য চাওয়ার অর্থ হতে পারে গল্প, বিচার, বা আরও খারাপ - 'পাগল' বলে লেবেল লাগানো।"</p>
            </div>

            <div className="bg-emerald-100 border-l-4 border-emerald-600 p-4 my-6 rounded-r-lg">
                <h3 className="font-bold text-emerald-900">💡 আপনার গোপনীয়তা সুরক্ষিত</h3>
                <p className="text-emerald-800">আমরা আপনার কোন ব্যক্তিগত তথ্য (নাম, ফোন নম্বর, ঠিকানা) সংগ্রহ করি না। আপনার অনুরোধ শুধুমাত্র নির্বাচিত স্বাস্থ্যকর্মীদের কাছে পৌঁছাবে যারা গোপনীয়তা রক্ষার শপথ নিয়েছেন।</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-600 mb-4">{success}</p>}
                <div className="mb-4">
                    <label htmlFor="helpDescription" className="block text-emerald-800 font-semibold mb-2">আপনার সমস্যা সম্পর্কে সংক্ষেপে লিখুন:</label>
                    <textarea id="helpDescription" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="আপনি যা বলতে চান, তা এখানে লিখুন..."></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button type="button" onClick={handleAiAssist} disabled={isAiLoading} className="flex-1 bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition duration-300 disabled:bg-emerald-300">
                        {isAiLoading ? <LoadingSpinner /> : 'AI সহকারীর পরামর্শ নিন'}
                    </button>
                    <button type="submit" disabled={isSubmitting} className="flex-1 bg-amber-500 text-emerald-900 font-bold py-3 px-6 rounded-lg hover:bg-amber-600 transition duration-300 disabled:bg-amber-300">
                        {isSubmitting ? 'পাঠানো হচ্ছে...' : 'স্বাস্থ্যকর্মীর কাছে অনুরোধ পাঠান'}
                    </button>
                </div>
            </form>

            {aiResponse && (
                <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <h4 className="font-bold text-blue-800 mb-2">AI সহকারীর বার্তা:</h4>
                    <p className="text-blue-900 whitespace-pre-wrap">{aiResponse}</p>
                    <p className="text-xs text-blue-700 mt-4 italic">দয়া করে মনে রাখবেন: এটি একটি স্বয়ংক্রিয় প্রতিক্রিয়া এবং পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়।</p>
                </div>
            )}
        </section>
    );
};

export default HelpRequestForm;
