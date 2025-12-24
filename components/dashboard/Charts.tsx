'use client';

import { SalesData, CategoryPerformance } from '@/lib/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// ... (SalesChart and CategoryChart remain unchanged)

export const PaymentChart = ({ data }: { data: any[] }) => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));

    // Custom colors for the pie slices
    const COLORS = ['#0EA5E9', '#8B5CF6', '#10B981']; // Sky, Violet, Emerald

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm h-[400px]"
        >
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Payment Methods</h3>
            <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="amount"
                        nameKey="method"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                            color: isDark ? '#F3F4F6' : '#111827'
                        }}
                        itemStyle={{ color: isDark ? '#E5E7EB' : '#374151' }}
                        formatter={(value: any, name: any) => [`₹${(value || 0).toLocaleString()}`, name]}
                    />
                    <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        iconType="circle"
                        formatter={(value: string) => <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </motion.div>
    );
}

export const SalesChart = ({ data }: { data: SalesData[] }) => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm h-[400px]"
        >
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#374151" : "#F3F4F6"} />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                        tickFormatter={(date) => new Date(date).getDate().toString()}
                        interval={2}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                        tickFormatter={(value) => `₹${value / 1000}k`}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                            color: isDark ? '#F3F4F6' : '#111827'
                        }}
                        itemStyle={{ color: isDark ? '#E5E7EB' : '#374151' }}
                        formatter={(value: any) => [`₹${(value || 0).toLocaleString()}`, 'Revenue']}
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#0EA5E9"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export const CategoryChart = ({ data }: { data: CategoryPerformance[] }) => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm h-[400px]"
        >
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Category Performance</h3>
            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={data} layout="vertical" barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={isDark ? "#374151" : "#F3F4F6"} />
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="category"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        width={100}
                        tick={{ fill: isDark ? '#D1D5DB' : '#4B5563', fontSize: 13, fontWeight: 500 }}
                    />
                    <Tooltip
                        cursor={{ fill: isDark ? '#374151' : '#F9FAFB' }}
                        contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                            color: isDark ? '#F3F4F6' : '#111827'
                        }}
                        itemStyle={{ color: isDark ? '#E5E7EB' : '#374151' }}
                    />
                    <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10B981' : '#34D399'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
}

