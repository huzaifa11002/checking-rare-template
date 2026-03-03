import {
    Droplets,
    Utensils,
    Truck,
    Monitor,
    School,
    Home,
    Hammer,
    Scale,
    Mic,
} from 'lucide-react';
import Education from '@/public/img/services/education.jpeg';
import Flood from '@/public/img/services/flood.jpeg';
import Water from '@/public/img/services/empolyment.jpeg';
import Marriage from '@/public/img/services/marriage.jpg';
import Empolyment from '@/public/img/services/empolyment.jpeg';
import Training from '@/public/img/services/training.jpeg';
import Orphan from '@/public/img/services/orphan.jpg';

export const serviceDetails = [
    {
        slug: 'clean-water',
        icon: Droplets,
        image: Water
    },
    {
        slug: 'ration-distribution',
        icon: Utensils,
        image: Flood
    },
    {
        slug: 'ambulance-service',
        icon: Truck,
        image: Flood
    },
    {
        slug: 'computer-training',
        icon: Monitor,
        image: Training
    },
    {
        slug: 'establish-schools',
        icon: School,
        image: Education
    },
    {
        slug: 'industrial-home',
        icon: Home,
        image: Training
    },
    {
        slug: 'vocational-training',
        icon: Hammer,
        image: Training
    },
    {
        slug: 'justice-for-poor',
        icon: Scale,
        image: Marriage
    },
    {
        slug: 'organize-seminars',
        icon: Mic,
        image: Education
    }
];
