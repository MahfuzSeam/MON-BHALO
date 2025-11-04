
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-emerald-900 text-white mt-12">
            <div className="container mx-auto px-4 py-10 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-bold mb-2">মন <span className="text-amber-400">ভালো</span></h3>
                        <p className="text-gray-300">বাংলাদেশের প্রতিটি মানুষের জন্য সহজলভ্য মানসিক স্বাস্থ্য সহায়তা</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-amber-400">দ্রুত লিংক</h3>
                        <ul className="space-y-2">
                            <li><a href="#home" className="text-gray-300 hover:text-white">হোম</a></li>
                            <li><a href="#checkin" className="text-gray-300 hover:text-white">মেজাজ চেক-ইন</a></li>
                            <li><a href="#help" className="text-gray-300 hover:text-white">গোপন সহায়তা</a></li>
                            <li><a href="#seasonal" className="text-gray-300 hover:text-white">মৌসুমী স্বাস্থ্য</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-amber-400">যোগাযোগ</h3>
                         <ul className="space-y-2 text-gray-300">
                            <li>ইমেইল: info@monvalo.org</li>
                            <li>ফোন: ০১৬২৭-১২৯৭১৫</li>
                            <li>ঠিকানা: বাইউস্ট, কুমিল্লা</li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-gray-400 border-t border-emerald-800 mt-8 pt-6">
                    &copy; ২০২৫ মন ভালো - বাংলাদেশের জন্য মানসিক স্বাস্থ্য সহায়তা | BAIUST CSE Fall Fest Hackathon
                </div>
            </div>
        </footer>
    );
};

export default Footer;
