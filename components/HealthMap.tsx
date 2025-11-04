
import React, { useEffect, useRef, useState } from 'react';
import { HealthFacility } from '../types';
// @ts-ignore
import L from 'leaflet';

// Sample data - in a real app, this would come from an API
const facilities: HealthFacility[] = [
    { id: '1', name: 'ঢাকা কমিউনিটি ক্লিনিক', type: 'clinic', location: { lat: 23.754, lng: 90.393 }, address: 'ধানমন্ডি, ঢাকা', division: 'dhaka', district: 'dhaka', upazila: 'dhanmondi' },
    { id: '2', name: 'উপজেলা স্বাস্থ্য কমপ্লেক্স, সাভার', type: 'hospital', location: { lat: 23.856, lng: 90.267 }, address: 'সাভার, ঢাকা', division: 'dhaka', district: 'dhaka', upazila: 'savar' },
    { id: '3', name: 'চট্টগ্রাম মা ও শিশু হাসপাতাল', type: 'hospital', location: { lat: 22.356, lng: 91.821 }, address: 'আগ্রাবাদ, চট্টগ্রাম', division: 'chittagong', district: 'chittagong', upazila: 'sadar' },
    { id: '4', name: 'খুলনা সিটি মেডিকেল', type: 'clinic', location: { lat: 22.818, lng: 89.553 }, address: 'খুলনা সদর', division: 'khulna', district: 'khulna', upazila: 'sadar' },
    { id: '5', name: 'রাজশাহী মেডিকেল কলেজ হাসপাতাল', type: 'hospital', location: { lat: 24.374, lng: 88.604 }, address: 'রাজশাহী সদর', division: 'rajshahi', district: 'rajshahi', upazila: 'sadar' },
];

const facilityTypes = {
    'clinic': 'কমিউনিটি ক্লিনিক',
    'health-center': 'ইউনিয়ন স্বাস্থ্য কেন্দ্র',
    'hospital': 'উপজেলা স্বাস্থ্য কমপ্লেক্স',
    'chw': 'কমিউনিটি স্বাস্থ্যকর্মী',
    'pharmacy': 'ফার্মেসি'
};

const HealthMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const [facilityType, setFacilityType] = useState('all');
    
    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            mapInstance.current = L.map(mapRef.current).setView([23.8103, 90.4125], 7); // Default to Dhaka
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance.current);

            // Get user's location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    mapInstance.current?.setView([latitude, longitude], 13);
                    L.marker([latitude, longitude], {
                        icon: L.divIcon({className: 'blinking-dot', html: '<div class="ring"></div><div class="dot"></div>'})
                    }).addTo(mapInstance.current!)
                    .bindPopup('আপনি এখানে আছেন').openPopup();
                },
                () => console.log('Could not get user location.'),
                { enableHighAccuracy: true }
            );

            const style = document.createElement('style');
            style.innerHTML = `
            .blinking-dot .dot {
              background-color: #1d4ed8;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 0 5px rgba(0,0,0,0.5);
            }
            .blinking-dot .ring {
              border: 3px solid #1d4ed8;
              border-radius: 50%;
              height: 25px;
              width: 25px;
              position: absolute;
              left: -6.5px;
              top: -6.5px;
              animation: pulsate 1.5s ease-out infinite;
              opacity: 0;
            }
            @keyframes pulsate { 0% {transform: scale(0.1, 0.1); opacity: 0;} 50% {opacity: 1;} 100% {transform: scale(1.2, 1.2); opacity: 0;} }
            `;
            document.head.appendChild(style);
        }
    }, []);

    useEffect(() => {
        if (!mapInstance.current) return;
        
        // Clear existing markers
        mapInstance.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                 if(!layer.options.icon.options.className?.includes('blinking-dot')) {
                    mapInstance.current?.removeLayer(layer);
                 }
            }
        });

        const filteredFacilities = facilityType === 'all'
            ? facilities
            : facilities.filter(f => f.type === facilityType);

        filteredFacilities.forEach(facility => {
            L.marker([facility.location.lat, facility.location.lng])
                .addTo(mapInstance.current!)
                .bindPopup(`<b>${facility.name}</b><br>${facility.address}`);
        });

    }, [facilityType]);

    const filteredFacilities = facilityType === 'all'
        ? facilities
        : facilities.filter(f => f.type === facilityType);

    return (
        <section id="map" className="bg-white p-6 md:p-8 rounded-lg shadow-md my-6">
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">আপনার এলাকায় স্বাস্থ্য সুবিধা খুঁজুন</h2>
            <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 p-4 my-6 italic rounded-r-lg">
                <p>"আমার গ্রামে কমিউনিটি ক্লিনিক ছিল 'মঙ্গল ও বৃহস্পতিবার সকালে, কখনো কখনো' খোলা। যখন আমার মায়ের বুকে ব্যথা হচ্ছিল, আমরা শুধু কোথায় যাব সেটা বের করতেই এক ঘন্টা হারিয়েছি।"</p>
            </div>
            
            <div className="bg-emerald-50 p-4 rounded-lg mb-6">
                 <div className="flex flex-wrap gap-4 items-end">
                    <div className="flex-grow">
                        <label htmlFor="facilityType" className="block text-emerald-800 font-semibold mb-1">সুবিধার ধরন</label>
                        <select id="facilityType" value={facilityType} onChange={(e) => setFacilityType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                            <option value="all">সব ধরনের সুবিধা</option>
                            <option value="clinic">কমিউনিটি ক্লিনিক</option>
                            <option value="health-center">ইউনিয়ন স্বাস্থ্য কেন্দ্র</option>
                            <option value="hospital">উপজেলা স্বাস্থ্য কমপ্লেক্স</option>
                            <option value="chw">কমিউনিটি স্বাস্থ্যকর্মী</option>
                            <option value="pharmacy">ফার্মেসি</option>
                        </select>
                    </div>
                 </div>
            </div>

            <div ref={mapRef} className="h-96 rounded-lg z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {filteredFacilities.map(f => (
                    <div key={f.id} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-bold text-emerald-800">{f.name}</h3>
                        <p className="text-sm text-amber-600 font-semibold bg-amber-100 inline-block px-2 py-0.5 rounded my-1">{facilityTypes[f.type]}</p>
                        <p className="text-gray-600 text-sm">{f.address}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HealthMap;
