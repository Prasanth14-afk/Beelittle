'use client';

import { StoreData } from '@/lib/types';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, IndianRupee, ShoppingBag, Users, Package } from 'lucide-react';
import clsx from 'clsx';

interface OverviewCardsProps {
    data: StoreData;
}

const Card = ({ title, value, subtext, trend, icon: Icon, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group"
    >
        <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl group-hover:from-emerald-100 group-hover:to-teal-100 dark:group-hover:from-emerald-900/30 dark:group-hover:to-teal-900/30 transition-all">
                <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            {trend && (
                <span className={clsx("flex items-center text-xs font-medium px-2 py-1 rounded-full",
                    trend > 0 ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                )}>
                    {trend > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {Math.abs(trend)}%
                </span>
            )}
        </div>
        <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{subtext}</p>
        </div>
    </motion.div>
);

export default function OverviewCards({ data }: OverviewCardsProps) {
    const { kpi } = data;

    const cards = [
        {
            title: 'Total Revenue',
            value: `₹${(kpi.totalSales / 100000).toFixed(2)}L`,
            subtext: 'vs last 30 days',
            trend: kpi.salesGrowth,
            icon: IndianRupee
        },
        {
            title: 'Conversion Rate',
            value: `${kpi.conversionRate}%`,
            subtext: `+${kpi.conversionImpact}% from VM updates`,
            trend: kpi.conversionImpact, // Using impact as trend for now
            icon: Users
        },
        {
            title: 'Stock Velocity',
            value: `${kpi.stockVelocity.toFixed(0)}`,
            subtext: 'Items sold / day',
            trend: 5.2, // Dummy trend
            icon: ShoppingBag
        },
        {
            title: 'VM Compliance',
            value: `${kpi.vmCompliance}%`,
            subtext: 'Audit Score',
            trend: kpi.vmCompliance >= 90 ? 2.5 : -1.0,
            icon: Package
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, idx) => (
                <Card key={card.title} {...card} delay={idx * 0.1} />
            ))}
        </div>
    );
}
