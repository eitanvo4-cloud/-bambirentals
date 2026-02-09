import { ATV } from './types';

// Images are sourced from Unsplash to ensure reliable loading without local file issues.

export const ATV_FLEET: ATV[] = [
    {
        id: 'honda-450',
        modelName: 'Honda TRX 450',
        description: 'Powerful and agile, perfect for solo riders tackling the steep hills of Mal Pais. The sport utility choice for exploring the jungle trails.',
        dailyPrice: 70,
        image: 'https://i.ibb.co/xKkSBjyF/red-honda-ofer.jpg',
        specs: ['450cc Engine', 'Manual Transmission', '2WD Sport', 'Single Rider'],
        transmission: 'Manual'
    },
    {
        id: 'honda-520',
        modelName: 'Honda Rubicon 520',
        description: 'The beast. 4x4 capability with extra comfort for longer rides to Hermosa or Montezuma. Features independent suspension for a smoother ride.',
        dailyPrice: 90,
        image: 'https://i.ibb.co/pr0Fy2gY/black-honda-ofer.jpg',
        specs: ['518cc Engine', 'Automatic DCT', '4x4 / Diff Lock', 'Power Steering'],
        transmission: 'Automatic'
    }
];

export const TERMS_TEXT = `
1. RENTAL PERIOD. The rental period is 24 hours per day charged.
2. VALID DRIVER'S LICENSE. You must possess a valid driver's license.
3. HELMETS. Helmets are mandatory by Costa Rican law.
4. DAMAGES. The renter is responsible for all damages to the vehicle during the rental period.
5. PROHIBITED AREAS. Driving on the beach sand is strictly prohibited and illegal in Costa Rica.
`;