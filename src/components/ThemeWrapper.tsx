'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        const root = document.documentElement;
        let primary = '#3b82f6'; // Default Blue
        let secondary = '#1e293b'; // Default Slate

        // Simple robust check: specific routes override the theme
        // We modify the root CSS variables so Tailwind utilities like bg-brand-primary update instantly.

        if (pathname.includes('/mtn')) {
            primary = '#FFCB05'; // MTN Yellow
            secondary = '#000000'; // Black
        } else if (pathname.includes('/airtel')) {
            primary = '#FF0000'; // Airtel Red
            secondary = '#000000'; // Black (was white, causing contrast issues)
        } else if (pathname.includes('/glo')) {
            primary = '#45B649'; // Glo Green
            secondary = '#313131'; // Dark Grey
        }

        root.style.setProperty('--brand-primary', primary);
        root.style.setProperty('--brand-secondary', secondary);
    }, [pathname]);

    return <div className="contents">{children}</div>;
}
