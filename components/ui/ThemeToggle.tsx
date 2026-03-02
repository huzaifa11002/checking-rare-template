'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-muted/10 animate-pulse" />
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="relative w-10 h-10 flex items-center justify-center rounded-full bg-muted/10 text-muted-foreground hover:text-primary transition-colors border border-border shadow-sm"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun className={cn(
          "h-5 w-5 rotate-0 scale-100 transition-all duration-300 absolute inset-0",
          resolvedTheme === 'dark' && "-rotate-90 scale-0"
        )} />
        <Moon className={cn(
          "h-5 w-5 rotate-90 scale-0 transition-all duration-300 absolute inset-0",
          resolvedTheme === 'dark' && "rotate-0 scale-100"
        )} />
      </div>
    </motion.button>
  );
}
