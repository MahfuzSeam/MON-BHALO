
import React, { useState } from 'react';

type Tab = 'pregnancy' | 'child';

const HealthTracker: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('pregnancy');

    return (
        <section id="maternal" className="bg-white p-6 md:p-8 rounded-lg shadow-md my-6">
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">মা ও শিশু স্বাস্থ্য ট্র্যাকার</h2>
             <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 p-4 my-6 italic rounded-r-lg">
                <p>"আমার বোনের প্রথম সন্তান হয়েছে গত বছর। তিনি দুটি প্রসবপূর্ব চেকআপ মিস করেছিলেন কারণ তারিখগুলো ভুলে গিয়েছিলেন, এবং কমিউনিটি ক্লিনিক রিমাইন্ডার পাঠায় না। বাচ্চা হওয়ার পর, টিকা ট্র্যাক করা হারিয়ে যাওয়া কাগজের কার্ডের জটিলতায় পরিণত হয়েছিল।"</p>
            </div>
             <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 mb-6 rounded-r-lg text-sm">
                <strong>গোপনীয়তা নোট:</strong> এই তথ্য শুধুমাত্র আপনার ডিভাইসে সংরক্ষণ করা হয় এবং আপনি স্পষ্টভাবে শেয়ার করতে না চাইলে অন্য কারো সাথে শেয়ার করা হয় না।
            </div>

            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6">
                    <button onClick={() => setActiveTab('pregnancy')} className={`py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'pregnancy' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                        গর্ভাবস্থা ট্র্যাকার
                    </button>
                    <button onClick={() => setActiveTab('child')} className={`py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'child' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                        শিশু টিকা ট্র্যাকার
                    </button>
                </nav>
            </div>

            <div className="pt-6">
                {activeTab === 'pregnancy' && <PregnancyTracker />}
                {activeTab === 'child' && <ChildVaccinationTracker />}
            </div>
        </section>
    );
};

const PregnancyTracker: React.FC = () => {
    const [lastPeriodDate, setLastPeriodDate] = useState('');
    const [schedule, setSchedule] = useState<any[]>([]);

    const calculateSchedule = () => {
        if (!lastPeriodDate) return;
        const deliveryDate = new Date(lastPeriodDate);
        deliveryDate.setDate(deliveryDate.getDate() + 280);

        const ancVisits = [
            { week: 8, title: 'প্রথম প্রসবপূর্ব চেকআপ' },
            { week: 12, title: 'দ্বিতীয় চেকআপ' },
            { week: 20, title: 'তৃতীয় চেকআপ' },
            { week: 28, title: 'চতুর্থ চেকআপ' },
            { week: 32, title: 'পঞ্চম চেকআপ' },
            { week: 36, title: 'ষষ্ঠ চেকআপ' },
            { week: 38, title: 'সপ্তম চেকআপ' },
            { week: 40, title: 'অষ্টম চেকআপ' }
        ];

        const today = new Date();
        const generatedSchedule = ancVisits.map(visit => {
            const visitDate = new Date(deliveryDate);
            visitDate.setDate(visitDate.getDate() - (280 - (visit.week * 7)));
            const status = visitDate < today ? 'overdue' : 'upcoming';
            return { ...visit, date: visitDate.toLocaleDateString('bn-BD'), status };
        });
        setSchedule(generatedSchedule);
    };

    return (
        <div>
            <h3 className="text-xl font-semibold text-emerald-800">আপনার গর্ভাবস্থার তথ্য</h3>
            <div className="my-4 space-y-4 max-w-sm">
                <div>
                    <label htmlFor="lastPeriodDate" className="block text-emerald-700 font-medium mb-1">আপনার শেষ মাসিকের প্রথম দিন</label>
                    <input type="date" id="lastPeriodDate" value={lastPeriodDate} onChange={e => setLastPeriodDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <button onClick={calculateSchedule} className="w-full bg-amber-500 text-emerald-900 font-bold py-2 px-4 rounded-lg hover:bg-amber-600">ট্র্যাকার শুরু করুন</button>
            </div>
            {schedule.length > 0 && <ScheduleList title="আপনার প্রসবপূর্ব চেকআপের সময়সূচী" items={schedule} />}
        </div>
    );
};

const ChildVaccinationTracker: React.FC = () => {
    const [birthDate, setBirthDate] = useState('');
    const [schedule, setSchedule] = useState<any[]>([]);

    const calculateSchedule = () => {
        if (!birthDate) return;
        const dob = new Date(birthDate);

        const vaccines = [
            { days: 0, title: 'বিসিজি (BCG)' },
            { days: 42, title: 'পেন্টাভ্যালেন্ট ১ম ডোজ' },
            { days: 70, title: 'পেন্টাভ্যালেন্ট ২য় ডোজ' },
            { days: 98, title: 'পেন্টাভ্যালেন্ট ৩য় ডোজ' },
            { days: 270, title: 'এমআর ১ম ডোজ' },
            { days: 540, title: 'এমআর ২য় ডোজ' }
        ];

        const today = new Date();
        const generatedSchedule = vaccines.map(vaccine => {
            const vaccineDate = new Date(dob);
            vaccineDate.setDate(vaccineDate.getDate() + vaccine.days);
            const status = vaccineDate < today ? 'overdue' : 'upcoming';
            return { ...vaccine, date: vaccineDate.toLocaleDateString('bn-BD'), status };
        });
        setSchedule(generatedSchedule);
    };

    return (
        <div>
            <h3 className="text-xl font-semibold text-emerald-800">আপনার শিশুর তথ্য</h3>
            <div className="my-4 space-y-4 max-w-sm">
                <div>
                    <label htmlFor="childBirthDate" className="block text-emerald-700 font-medium mb-1">শিশুর জন্ম তারিখ</label>
                    <input type="date" id="childBirthDate" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <button onClick={calculateSchedule} className="w-full bg-amber-500 text-emerald-900 font-bold py-2 px-4 rounded-lg hover:bg-amber-600">ট্র্যাকার শুরু করুন</button>
            </div>
            {schedule.length > 0 && <ScheduleList title="আপনার শিশুর টিকা সময়সূচী" items={schedule} />}
        </div>
    );
};

const ScheduleList: React.FC<{ title: string, items: any[] }> = ({ title, items }) => (
    <div className="mt-6">
        <h4 className="text-lg font-semibold text-emerald-800 mb-4">{title}</h4>
        <div className="space-y-3">
            {items.map((item, index) => {
                const statusClasses = {
                    upcoming: 'border-l-emerald-500 bg-emerald-50',
                    overdue: 'border-l-red-500 bg-red-50',
                };
                const statusText = {
                    upcoming: 'আসন্ন',
                    overdue: 'মিস হয়েছে',
                };
                const statusBadgeClasses = {
                    upcoming: 'bg-emerald-100 text-emerald-800',
                    overdue: 'bg-red-100 text-red-800',
                }
                return (
                    <div key={index} className={`p-4 rounded-r-lg border-l-4 ${statusClasses[item.status]}`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-gray-800">{item.title}</p>
                                <p className="text-sm text-gray-600">{item.date}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusBadgeClasses[item.status]}`}>{statusText[item.status]}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);

export default HealthTracker;
