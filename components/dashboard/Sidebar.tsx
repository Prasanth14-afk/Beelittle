'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    ShoppingBag,
    BarChart3,
    FileText,
    Settings,
    Store,
    LogOut,
    Shirt
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const MENU_ITEMS = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Shirt },
    { id: 'vm-analytics', label: 'VM Analytics', icon: Store },
    { id: 'sales', label: 'Sales Reports', icon: BarChart3 },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'documents', label: 'Documents', icon: FileText },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
    return (
        <div className="fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 border-r border-emerald-900/50 z-50 flex flex-col hidden md:flex">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-white/5 backdrop-blur-sm">
                <div className="w-8 h-8 relative rounded-lg overflow-hidden mr-3 shadow-lg shadow-teal-500/20 ring-1 ring-white/10">
                    <Image
                        src="/beelittle-logo.jpeg"
                        alt="Beelittle Logo"
                        fill
                        className="object-cover"
                    />
                </div>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200 text-lg tracking-tight">Beelittle</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {MENU_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={clsx(
                                "w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                                isActive
                                    ? "bg-gradient-to-r from-teal-900/40 to-emerald-900/20 text-teal-300 shadow-sm ring-1 ring-white/10"
                                    : "text-emerald-300/80 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute left-0 w-1 h-6 bg-gradient-to-b from-teal-400 to-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                            <Icon className={clsx("w-5 h-5 mr-3 transition-colors", isActive ? "text-teal-300" : "text-emerald-400/60 group-hover:text-white")} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-white/5">
                <button className="w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-emerald-300/80 hover:text-white hover:bg-white/5 transition-colors">
                    <Settings className="w-5 h-5 mr-3 text-emerald-400/60 group-hover:text-white" />
                    Settings
                </button>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center px-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-xs font-bold text-white ring-2 ring-emerald-950/50 shadow-lg">
                        A
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white">Admin User</p>
                        <p className="text-xs text-emerald-400/60">Store Manager</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
