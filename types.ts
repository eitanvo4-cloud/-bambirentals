export interface ATV {
    id: string;
    modelName: string;
    description: string;
    dailyPrice: number;
    image: string;
    images?: string[];
    specs: string[];
    transmission: string;
    status?: 'available' | 'rented' | 'maintenance';
}

export interface BookingRequest {
    atvId: string;
    startDate: string; // ISO String YYYY-MM-DD
    endDate: string; // ISO String YYYY-MM-DD
    firstName: string;
    lastName: string;
    whatsappNumber: string;
    email: string;
    theftProtection: boolean;
    fullDamageProtection: boolean;
    prepaidRefueling: number;
    totalPrice: number;
    agreedToTerms: boolean;
}

export type ViewState = 'home' | 'detail' | 'booking' | 'confirmation';

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}