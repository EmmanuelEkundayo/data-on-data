'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Zap, Radio, Globe } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'MTN', href: '/mtn', icon: Zap },
    { name: 'Airtel', href: '/airtel', icon: Radio },
    { name: 'Glo', href: '/glo', icon: Globe },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen bg-brand-secondary/5 text-foreground fixed top-0 left-0 p-6 border-r border-brand-primary/20 backdrop-blur-xl bg-white/5">
            <div className="mb-10 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center shadow-[0_0_15px_var(--variable-brand-primary)]">
                    <Zap className="text-white fill-white" size={16} />
                </div>
                <span className="font-bold text-xl tracking-tight">Data-on-Data</span>
            </div>

            <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 p-3 rounded-lg transition-all duration-300 font-medium",
                                isActive
                                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/30"
                                    : "hover:bg-brand-primary/10 hover:text-brand-primary text-neutral-500"
                            )}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
                <div className="p-4 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-xs text-neutral-500">
                    <p className="font-semibold text-brand-primary mb-1">Status</p>
                    <p>Updating plans every 24h.</p>
                </div>
            </div>
        </aside>
    );
}
