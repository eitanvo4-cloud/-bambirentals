export interface ATV {
    id: string;
    modelName: string;
    description: string;
    dailyPrice: number;
    image: string;
    specs: string[];
    transmission: string;
}

export interface BookingRequest {
    atvId: string;
    startDate: string; // ISO String YYYY-MM-DD
    endDate: string; // ISO String YYYY-MM-DD
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    totalPrice: number;
    agreedToTerms: boolean;
}

export type ViewState = 'home' | 'detail' | 'booking' | 'confirmation';

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}