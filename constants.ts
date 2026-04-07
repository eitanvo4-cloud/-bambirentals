import { ATV } from './types';

// Images are sourced from Unsplash to ensure reliable loading without local file issues.

export const ATV_FLEET: ATV[] = [
    {
        id: 'honda-425',
        modelName: 'Honda TRX 425',
        description: 'Powerful and agile, perfect for solo riders tackling the steep hills of Mal Pais. The sport utility choice for exploring the jungle trails.',
        dailyPrice: 70,
        image: '/atvs/honda-red.jpg',
        specs: ['425cc Engine', 'Automatic Transmission', '4x4', 'Single Rider'],
        transmission: 'Automatic',
        status: 'rented'
    },
    {
        id: 'honda-520',
        modelName: 'Honda Rubicon 520',
        description: 'The beast. 4x4 capability with extra comfort for longer rides to Hermosa or Montezuma. Features independent suspension for a smoother ride.',
        dailyPrice: 90,
        image: '/atvs/honda-black.jpg',
        specs: ['518cc Engine', 'Automatic DCT', '4x4 / Diff Lock', 'Power Steering'],
        transmission: 'Automatic',
        status: 'available'
    },
    {
        id: 'kymco-400',
        modelName: 'Kymco MXU 400',
        description: 'A versatile and reliable workhorse ideal for exploring the diverse terrain around Mal Pais and Santa Teresa. Comfortable, easy to handle, and built for adventure.',
        dailyPrice: 70,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
            'https://images.unsplash.com/photo-1590502160462-58b41354f588?w=800&q=80',
            'https://images.unsplash.com/photo-1533591380348-14193f1de18f?w=800&q=80',
            'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
            'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&q=80',
        ],
        specs: ['400cc Engine', 'CVT Automatic', '4x4', 'Single Rider'],
        transmission: 'Automatic',
        status: 'available'
    }
];

export const TERMS_TEXT = `
1. RENTAL PERIOD. The rental period is 24 hours per day charged.
2. VALID DRIVER'S LICENSE. You must possess a valid driver's license.
3. HELMETS. Helmets are mandatory by Costa Rican law.
4. DAMAGES. The renter is responsible for all damages to the vehicle during the rental period.
5. PROHIBITED AREAS. Driving on the beach sand is strictly prohibited and illegal in Costa Rica.
`;