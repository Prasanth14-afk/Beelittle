'use client';
import { useState, useRef, useEffect } from 'react';
import { StoreId } from '@/lib/types';
import { Store, Calendar, Bell, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    selectedStore: StoreId;
    onStoreChange: (store: StoreId) => void;
}

const STORES: StoreId[] = ['Tirupur', 'Coimbatore', 'Chennai'];

export default function Header({ selectedStore, onStoreChange }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
                    >
                        <Store className="w-4 h-4" />
                        {selectedStore}
                        <ChevronDown className={`w-3 h-3 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                            >
                                {STORES.map((store) => (
                                    <button
                                        key={store}
                                        onClick={() => {
                                            onStoreChange(store);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${selectedStore === store ? 'text-subtle-blue font-semibold bg-blue-50/50' : 'text-gray-600'
                                            }`}
                                    >
                                        {store} Outlet
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex items-center gap-4 pl-4 border-l border-gray-200 ml-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-200">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Last 30 Days</span>
                </div>

                <ThemeToggle />

                <button className="relative p-2 text-gray-500 hover:text-charcoal hover:bg-gray-100 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                </button>

                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative cursor-pointer"
                >
                    <motion.img
                        src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix"
                        alt="Admin Profile"
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-yellow-50"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </motion.div>
            </div>
        </div>
    );
}
