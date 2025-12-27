import plansDataRaw from './plans.json';

const plansData = plansDataRaw as { lastUpdated: number, plans: Plan[] };

export interface Plan {
    id: string;
    isp: 'MTN' | 'Airtel' | 'Glo';
    name: string;
    price: number;
    dataMB: number;
    validity: string;
    valueScore: number;
}

export interface NetworkHotspot {
    isp: 'MTN' | 'Airtel' | 'Glo';
    state: string;
    coverageScore: number; // 1-100
}

export const initialPlans: Plan[] = plansData.plans;
export const lastUpdated: number = plansData.lastUpdated;

export const hotspots: NetworkHotspot[] = [
    { isp: 'MTN', state: 'Lagos', coverageScore: 98 },
    { isp: 'MTN', state: 'Abuja', coverageScore: 95 },
    { isp: 'MTN', state: 'Rivers', coverageScore: 92 },
    { isp: 'Airtel', state: 'Lagos', coverageScore: 90 },
    { isp: 'Airtel', state: 'Kano', coverageScore: 88 },
    { isp: 'Airtel', state: 'Oyo', coverageScore: 85 },
    { isp: 'Glo', state: 'Lagos', coverageScore: 94 },
    { isp: 'Glo', state: 'Edo', coverageScore: 91 },
    { isp: 'Glo', state: 'Delta', coverageScore: 89 },
];
