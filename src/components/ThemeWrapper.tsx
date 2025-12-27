'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        const root = document.documentElement;
        let primary = '#3b82f6'; // Default Blue
        let secondary = '#1e293b'; // Default Slate
        let text = '#1d4ed8'; // Default Dark Blue
        let contrast = '#ffffff'; // Default White

        // Simple robust check: specific routes override the theme
        if (pathname.includes('/mtn')) {
            primary = '#FFCB05'; // MTN Yellow
            secondary = '#000000'; // Black
            text = '#A07C00'; // Dark Goldenrod (Readable on white)
            contrast = '#000000'; // Black (Readable on Yellow)
        } else if (pathname.includes('/airtel')) {
            primary = '#FF0000'; // Airtel Red
            secondary = '#000000'; // Black
            text = '#FF0000'; // Red (Readable on white)
            contrast = '#FFFFFF'; // White (Readable on Red)
        } else if (pathname.includes('/glo')) {
            primary = '#45B649'; // Glo Green
            secondary = '#313131'; // Dark Grey
            text = '#45B649'; // Green (Readable on white)
            contrast = '#FFFFFF'; // White (Readable on Green)
        }

        root.style.setProperty('--brand-primary', primary);
        root.style.setProperty('--brand-secondary', secondary);
        root.style.setProperty('--brand-text', text);
        root.style.setProperty('--brand-contrast', contrast);
    }, [pathname]);

    return <div className="contents">{children}</div>;
}
