'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    School,
    Users,
    GraduationCap,
    Home,
    BookOpen,
    Heart,
    Sparkles,
    CheckCircle,
    TrendingUp,
    X,
    MapPin
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

interface RunningProjectsProps {
    onDonateClick: () => void;
}

const RunningProjects = ({ onDonateClick }: RunningProjectsProps) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const stats = [
        {
            icon: Users,
            count: t('runningProjects.school.stats.teachers.count'),
            label: t('runningProjects.school.stats.teachers.label'),
            description: t('runningProjects.school.stats.teachers.description'),
            color: 'from-blue-500 to-cyan-500',
            iconBg: 'bg-blue-50 dark:bg-blue-500/10',
            iconColor: 'text-blue-600 dark:text-blue-400'
        },
        {
            icon: GraduationCap,
            count: t('runningProjects.school.stats.students.count'),
            label: t('runningProjects.school.stats.students.label'),
            description: t('runningProjects.school.stats.students.description'),
            color: 'from-purple-500 to-pink-500',
            iconBg: 'bg-purple-50 dark:bg-purple-500/10',
            iconColor: 'text-purple-600 dark:text-purple-400'
        },
        {
            icon: Home,
            count: t('runningProjects.school.stats.residential.count'),
            label: t('runningProjects.school.stats.residential.label'),
            description: t('runningProjects.school.stats.residential.description'),
            color: 'from-green-500 to-emerald-500',
            iconBg: 'bg-green-50 dark:bg-green-500/10',
            iconColor: 'text-green-600 dark:text-green-400'
        }
    ];

    return (
        <>
            <motion.section
                id="running-projects"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-12"
            >
                {/* Section Header */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <h2 className="text-[clamp(1.5rem,5vw,3.5rem)] font-black text-foreground">
                        {t('runningProjects.title')}
                    </h2>
                </div>

                {/* Simple Compact Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onClick={() => setIsModalOpen(true)}
                    className="group relative bg-card rounded-3xl border-2 border-border overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
                >
                    {/* Active Badge */}
                    <div className="absolute top-6 right-6 z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 dark:bg-green-500/20 rounded-full backdrop-blur-sm">
                            <TrendingUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                            <span className="text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-wider">
                                Active Now
                            </span>
                        </div>
                    </div>

                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Decorative Circle */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />

                    {/* Content */}
                    <div className="relative p-8 space-y-6">
                        {/* Icon */}
                        <div className="relative">
                            <div className="w-16 h-16 bg-muted/5 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                <School className="w-8 h-8 text-primary" />
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-black text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                            {t('runningProjects.school.name')}
                        </h3>

                        {/* Description with Location */}
                        <div className="space-y-3">
                            <p className="text-muted leading-relaxed text-sm line-clamp-2">
                                {t('runningProjects.school.introduction.text')}
                            </p>

                            <div className="flex items-center gap-2 text-primary">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm font-bold">Munghopir, Karachi</span>
                            </div>
                        </div>

                        {/* Learn More Link */}
                        <div className="pt-4 flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                            <span>View Full Details</span>
                            <School className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
            </motion.section>

            {/* Full Details Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-5000 flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-primary/95 backdrop-blur-xl cursor-zoom-out"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-6xl bg-card rounded-[3rem] overflow-hidden shadow-2xl border-2 border-border z-5001 my-8"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-8 right-8 z-20 w-12 h-12 bg-muted/10 hover:bg-primary text-foreground hover:text-primary-foreground rounded-full flex items-center justify-center transition-all group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
                            </button>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

                            {/* Content */}
                            <div className="relative p-8 md:p-12 space-y-12 max-h-[85vh] overflow-y-auto">
                                {/* Project Header */}
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full">
                                        <School className="w-5 h-5 text-primary" />
                                        <span className="text-sm font-black text-primary uppercase tracking-wider">
                                            {t('runningProjects.school.presented')}
                                        </span>
                                    </div>

                                    <h3 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black text-foreground">
                                        {t('runningProjects.school.name')}
                                    </h3>

                                    <p className="text-xl text-muted font-bold">
                                        {t('runningProjects.school.tagline')}
                                    </p>

                                    <div className="flex items-center gap-2 text-primary">
                                        <MapPin className="w-5 h-5" />
                                        <span className="text-lg font-bold">Munghopir, Karachi</span>
                                    </div>
                                </div>


                                {/* Text Sections */}
                                <div className="space-y-8">
                                    {/* Introduction */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="space-y-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                                <BookOpen className="w-5 h-5 text-primary" />
                                            </div>
                                            <h4 className="text-xl font-black text-foreground">
                                                {t('runningProjects.school.introduction.title')}
                                            </h4>
                                        </div>
                                        <p className="text-muted leading-relaxed pl-13">
                                            {t('runningProjects.school.introduction.text')}
                                        </p>
                                    </motion.div>

                                    {/* Education System */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="space-y-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                                <School className="w-5 h-5 text-primary" />
                                            </div>
                                            <h4 className="text-xl font-black text-foreground">
                                                {t('runningProjects.school.educationSystem.title')}
                                            </h4>
                                        </div>
                                        <p className="text-muted leading-relaxed pl-13">
                                            {t('runningProjects.school.educationSystem.text')}
                                        </p>
                                    </motion.div>

                                    {/* Free Education */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="space-y-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                                <Heart className="w-5 h-5 text-primary" />
                                            </div>
                                            <h4 className="text-xl font-black text-foreground">
                                                {t('runningProjects.school.freeEducation.title')}
                                            </h4>
                                        </div>
                                        <p className="text-muted leading-relaxed pl-13">
                                            {t('runningProjects.school.freeEducation.text')}
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid md:grid-cols-3 gap-6">
                                    {stats.map((stat, idx) => {
                                        const Icon = stat.icon;
                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 + 0.4 }}
                                                className="group relative bg-muted/5 rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
                                            >
                                                <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

                                                <div className="relative space-y-4">
                                                    <div className={`w-14 h-14 ${stat.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                                        <Icon className={`w-7 h-7 ${stat.iconColor}`} />
                                                    </div>

                                                    <div className="space-y-1">
                                                        <p className="text-4xl font-black text-foreground">
                                                            {stat.count}
                                                        </p>
                                                        <p className="text-sm font-black text-primary uppercase tracking-wider">
                                                            {stat.label}
                                                        </p>
                                                    </div>

                                                    <p className="text-sm text-muted leading-relaxed">
                                                        {stat.description}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Support Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="bg-linear-to-br from-primary/5 to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10 rounded-3xl p-8 md:p-10 border border-primary/20 dark:border-primary/30"
                                >
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-6 h-6 text-primary" />
                                                <h4 className="text-2xl font-black text-foreground">
                                                    {t('runningProjects.school.support.title')}
                                                </h4>
                                            </div>
                                            <p className="text-muted leading-relaxed">
                                                {t('runningProjects.school.support.text')}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="bg-card rounded-2xl p-6 border border-border">
                                                <h5 className="text-lg font-black text-foreground mb-3">
                                                    {t('runningProjects.school.cta.title')}
                                                </h5>
                                                <p className="text-sm text-muted mb-6 leading-relaxed">
                                                    {t('runningProjects.school.cta.text')}
                                                </p>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onDonateClick();
                                                        setIsModalOpen(false);
                                                    }}
                                                    className="w-full bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center justify-center gap-2"
                                                >
                                                    <Heart className="w-5 h-5" />
                                                    {t('runningProjects.school.cta.button')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default RunningProjects;
