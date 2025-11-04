
export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export interface MoodEntry {
    date: string; // YYYY-MM-DD
    mood: 'very-happy' | 'happy' | 'neutral' | 'sad' | 'very-sad';
}

export interface HealthFacility {
    id: string;
    name: string;
    type: 'clinic' | 'health-center' | 'hospital' | 'chw' | 'pharmacy';
    location: {
        lat: number;
        lng: number;
    };
    address: string;
    division: string;
    district: string;
    upazila: string;
}
