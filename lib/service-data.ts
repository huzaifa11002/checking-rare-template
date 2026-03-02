import {
    Droplets,
    Utensils,
    Gift,
    School,
    Users,
    Baby,
    Briefcase,
    TrendingUp,
    Heart,
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
        slug: 'clean-drinking-water-supply',
        icon: Droplets,
        image: Water
    },
    {
        slug: 'ration-and-food-distribution',
        icon: Utensils,
        image: Flood
    },
    {
        slug: 'sacrificial-offerings-qurbani',
        icon: Gift,
        image: Marriage
    },
    {
        slug: 'education-center-establishment',
        icon: School,
        image: Education
    },
    {
        slug: 'vocational-center-for-women',
        icon: Users,
        image: Training
    },
    {
        slug: 'orphan-sponsorship-and-care',
        icon: Baby,
        image: Orphan
    },
    {
        slug: 'employment-opportunities',
        icon: Briefcase,
        image: Empolyment
    },
    {
        slug: 'youth-employment-opportunities',
        icon: TrendingUp,
        image: Empolyment
    },
    {
        slug: 'marriage-and-dowry-support',
        icon: Heart,
        image: Marriage
    }
];
