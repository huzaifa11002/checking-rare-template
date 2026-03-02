import React from 'react';
import { cn } from '@/lib/utils';

interface SocialIconsProps {
  className?: string; // For the container
  iconContainerClassName?: string; // For the individual <a> tag
  iconClassName?: string; // For the <i> icon itself
}

const socialLinks = [
  { icon: 'bi bi-facebook', label: 'Facebook', href: 'https://www.facebook.com/rarefoundation' },
  { icon: 'bi bi-instagram', label: 'Instagram', href: 'https://www.instagram.com/rarefoundation/' },
  { icon: 'bi bi-youtube', label: 'YouTube', href: 'https://www.youtube.com/@rarefoundation' },
  { icon: 'bi bi-twitter-x', label: 'Twitter/X', href: 'https://x.com/rarefoundation' },
  { icon: 'bi bi-linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/rarefoundation/' },
  { icon: 'bi bi-pinterest', label: 'Pinterest', href: 'https://www.pinterest.com/rarefoundation/' },
  { icon: 'bi bi-reddit', label: 'Reddit', href: 'https://www.reddit.com/user/Only-Watercress6795/' },
];

export const SocialIcons = ({ className, iconContainerClassName, iconClassName }: SocialIconsProps) => {
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {socialLinks.map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          aria-label={item.label}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "w-12 h-12 flex items-center justify-center rounded-lg transition-all transform hover:-translate-y-1",
            iconContainerClassName
          )}
        >
          <i className={cn(item.icon, iconClassName)}></i>
        </a>
      ))}
    </div>
  );
};
