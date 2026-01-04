export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: 'M' | 'F';
    symptoms: string[];
    arrivalTime: string;
    status: 'incoming' | 'processing' | 'critical' | 'stable' | 'elevated';
    riskScore?: number;
}

export const MOCK_PATIENTS: Patient[] = [
    {
        id: 'p-101',
        name: 'John Doe',
        age: 58,
        gender: 'M',
        symptoms: ['Chest Pain', 'Diaphoresis'],
        arrivalTime: '10:42 AM',
        status: 'critical',
        riskScore: 9,
    },
    {
        id: 'p-102',
        name: 'Jane Smith',
        age: 45,
        gender: 'F',
        symptoms: ['Palpitations'],
        arrivalTime: '10:45 AM',
        status: 'stable',
        riskScore: 2,
    },
    {
        id: 'p-103',
        name: 'Robert Brown',
        age: 72,
        gender: 'M',
        symptoms: ['Shortness of Breath', 'Dizziness'],
        arrivalTime: '10:50 AM',
        status: 'elevated',
        riskScore: 6,
    },
    {
        id: 'p-104',
        name: 'Unknown Male',
        age: 60,
        gender: 'M',
        symptoms: ['Unresponsive'],
        arrivalTime: 'Now',
        status: 'incoming',
    },
    {
        id: 'p-105',
        name: 'Sarah Connor',
        age: 34,
        gender: 'F',
        symptoms: ['Anxiety', 'Rapid HR'],
        arrivalTime: 'Now',
        status: 'processing',
    }
];
