'use client';

import { RegionalSales } from '@/lib/types';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Search, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function DistrictSalesTable({ data }: { data: RegionalSales[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter(d =>
        d.region.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm h-[600px] flex flex-col"
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">District Performance</h3>
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search district..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700 dark:text-gray-200 w-48"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
                <table className="w-full">
                    <thead className="sticky top-0 bg-white dark:bg-gray-800 z-10 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        <tr>
                            <th className="text-left pb-4 pl-2">District</th>
                            <th className="text-right pb-4">Sales</th>
                            <th className="text-right pb-4 hidden sm:table-cell">Contr.</th>
                            <th className="text-right pb-4 pr-2">Growth</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                        {filteredData.map((item, index) => (
                            <motion.tr
                                key={item.region}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                <td className="py-4 pl-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${index < 3
                                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                : 'bg-gray-50 dark:bg-gray-700 text-gray-400'
                                            }`}>
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-gray-200">{item.region}</div>
                                            <div className="text-xs text-gray-400 sm:hidden">
                                                {item.percentage}% of total
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-right py-4">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        ₹{item.sales.toLocaleString()}
                                    </div>
                                </td>
                                <td className="text-right py-4 hidden sm:table-cell w-32">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-xs text-gray-500">{item.percentage}%</span>
                                        <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min(item.percentage, 100)}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="h-full bg-blue-500 rounded-full"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="text-right py-4 pr-2">
                                    <div className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${item.growth >= 0
                                            ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                                            : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                                        }`}>
                                        {item.growth >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                        {Math.abs(item.growth)}%
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {filteredData.length === 0 && (
                    <div className="text-center py-10 text-gray-400">
                        No districts found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </motion.div>
    );
}
