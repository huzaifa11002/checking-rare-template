'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { Users, X, Send, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import { cn } from '@/lib/utils';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: StaticImageData;
    delay: number;
    shortBio: string;
    fullBio: string;
}

interface TeamSectionProps {
    teamMembers: TeamMember[];
    onDonateClick: () => void;
}

const SendMessageModal = ({ isOpen, onClose, recipientName }: { isOpen: boolean; onClose: () => void; recipientName: string }) => {
    const { t } = useTranslation();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('/php/send_message_to_chairman.php', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.status === 'success') {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
                setTimeout(() => {
                    setStatus('idle');
                    onClose();
                }, 3000);
            } else {
                setStatus('error');
                alert(data.message || 'Something went wrong. Please try again.');
                setStatus('idle');
            }
        } catch (error) {
            console.error('Chairman Message Error:', error);
            setStatus('error');
            alert('Failed to send message. Please check your connection.');
            setStatus('idle');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-6000 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-primary/80 backdrop-blur-md"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-lg bg-card rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-transparent dark:border-border"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-muted/10 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-muted" />
                </button>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-foreground">
                            {t('introduction.team.messageModal.title', { name: recipientName })}
                        </h3>
                        <p className="text-muted text-sm font-medium">
                            {t('introduction.team.messageModal.subtitle')}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-3">
                                {t('introduction.team.messageModal.form.nameLabel')}
                            </label>
                            <input
                                required
                                name="name"
                                type="text"
                                className="w-full px-5 py-3.5 bg-muted/5 border-2 border-transparent focus:border-primary focus:bg-card rounded-2xl outline-none transition-all font-bold"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-3">
                                {t('introduction.team.messageModal.form.messageLabel')}
                            </label>
                            <textarea
                                required
                                name="message"
                                rows={4}
                                className="w-full px-5 py-3.5 bg-muted/5 border-2 border-transparent focus:border-primary focus:bg-card rounded-2xl outline-none transition-all font-bold resize-none"
                            />
                        </div>

                        <button
                            disabled={status === 'loading'}
                            type="submit"
                            className={cn(
                                "w-full py-4 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95",
                                status === 'loading' ? "bg-muted/20 text-muted cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary-hover"
                            )}
                        >
                            {status === 'loading' ? (
                                <>
                                    <div className="w-5 h-5 border-3 border-muted/30 border-t-primary rounded-full animate-spin" />
                                    {t('introduction.team.messageModal.form.sending')}
                                </>
                            ) : status === 'success' ? (
                                <>
                                    <CheckCircle2 className="w-6 h-6" />
                                    {t('introduction.team.messageModal.form.sent')}
                                </>
                            ) : (
                                <>
                                    <Send className="w-6 h-6" />
                                    {t('introduction.team.messageModal.form.submit')}
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

const TeamSection = ({ teamMembers, onDonateClick }: TeamSectionProps) => {
    const { t } = useTranslation();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

    const selectedMember = teamMembers.find(m => m.id === selectedId);

    return (
        <>
            <motion.section
                id="team"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-12"
            >
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <Users className="w-8 h-8" />
                    </div>
                    <h2 className="text-[clamp(1.5rem,5vw,3.5rem)] font-black text-foreground">
                        {t('introduction.team.title')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member) => (
                        <motion.div
                            key={member.id}
                            layoutId={`card-${member.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: member.delay }}
                            viewport={{ once: true }}
                            onClick={() => setSelectedId(member.id)}
                            className="group relative cursor-pointer"
                        >
                            <div className="relative h-[450px] rounded-[3rem] overflow-hidden border-4 border-card dark:border-border shadow-xl group-hover:shadow-2xl transition-all duration-500">
                                <motion.div layoutId={`image-${member.id}`} className="absolute inset-0">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </motion.div>
                                <div className="absolute inset-0 bg-linear-to-t from-primary via-transparent to-transparent opacity-80" />

                                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <motion.h4 layoutId={`name-${member.id}`} className="text-xl font-black text-primary-foreground mb-2">
                                        {member.name}
                                    </motion.h4>
                                    <motion.p layoutId={`role-${member.id}`} className="text-primary font-bold text-sm uppercase tracking-widest">
                                        {member.role}
                                    </motion.p>

                                    <div className="mt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="bg-card/20 backdrop-blur-md px-4 py-2 rounded-full text-card text-xs font-black uppercase tracking-widest">
                                            {t('introduction.team.viewProfile')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Expanding Card Portal */}
            <AnimatePresence>
                {selectedId && selectedMember && (
                    <div className="fixed inset-0 z-5000 flex items-center justify-center p-4 md:p-12 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-primary/95 backdrop-blur-xl cursor-zoom-out"
                        />

                        <motion.div
                            layoutId={`card-${selectedId}`}
                            className="relative w-full max-w-6xl bg-card rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row z-5001 min-h-[600px] border border-transparent dark:border-border"
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-8 right-8 z-20 w-12 h-12 bg-primary/5 hover:bg-primary text-foreground rounded-full flex items-center justify-center transition-all group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
                            </button>

                            <div className="lg:w-2/5 relative h-[400px] lg:h-auto">
                                <motion.div layoutId={`image-${selectedId}`} className="absolute inset-0">
                                    <Image
                                        src={selectedMember.image}
                                        alt={selectedMember.name}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                                <div className="absolute inset-0 bg-linear-to-t from-primary/60 lg:hidden" />
                            </div>

                            <div className="lg:w-3/5 p-8 md:p-16 flex flex-col justify-center">
                                <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary/20">
                                    <div>
                                        <p className="text-primary font-bold text-sm uppercase tracking-[0.3em] mb-4">Leadership Deep Dive</p>
                                        <motion.h3 layoutId={`name-${selectedId}`} className="text-[clamp(1.5rem,5vw,3rem)] font-black text-foreground mb-2 leading-tight">
                                            {selectedMember.name}
                                        </motion.h3>
                                        <motion.p layoutId={`role-${selectedId}`} className="text-xl text-muted font-bold">
                                            {selectedMember.role}
                                        </motion.p>
                                    </div>

                                    <div className="w-24 h-1.5 bg-primary rounded-full" />

                                    <div className="space-y-6 text-muted font-medium text-lg leading-relaxed whitespace-pre-wrap">
                                        {selectedMember.fullBio}
                                    </div>

                                    <div className="pt-8 flex flex-wrap gap-4 border-t border-border">
                                        <button
                                            onClick={onDonateClick}
                                            className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 md:px-10 py-4 md:py-5 rounded-3xl font-black transition-all active:scale-95 shadow-xl shadow-primary/20 text-sm md:text-base"
                                        >
                                            {t('introduction.team.support')}
                                        </button>
                                        <button
                                            onClick={() => setIsMessageModalOpen(true)}
                                            className="bg-card dark:bg-primary border border-border hover:bg-primary hover:text-primary-foreground text-foreground px-8 md:px-10 py-4 md:py-5 rounded-3xl font-black transition-all active:scale-95 shadow-xl text-sm md:text-base"
                                        >
                                            Send Message
                                        </button>
                                        <button
                                            onClick={() => setSelectedId(null)}
                                            className="border-2 border-border text-foreground hover:bg-muted/5 px-8 md:px-10 py-4 md:py-5 rounded-3xl font-black transition-all text-sm md:text-base"
                                        >
                                            {t('introduction.team.goBack')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Message Modal */}
            <AnimatePresence>
                {isMessageModalOpen && selectedMember && (
                    <SendMessageModal
                        isOpen={isMessageModalOpen}
                        onClose={() => setIsMessageModalOpen(false)}
                        recipientName={selectedMember.name}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default TeamSection;
