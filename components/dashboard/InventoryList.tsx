'use client';

import { InventoryAlert, SKU } from '@/lib/types';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, Package } from 'lucide-react';

export default function InventoryList({ alerts, skus }: { alerts: InventoryAlert[], skus: SKU[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Alerts Section */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                        Inventory Alerts
                    </h3>
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold px-2 py-1 rounded-full">{alerts.length}</span>
                </div>
                <div className="space-y-4">
                    {alerts.slice(0, 5).map(alert => (
                        <div key={alert.id} className="flex items-start p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                            <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${alert.severity === 'Critical' ? 'bg-red-500' : 'bg-yellow-500'
                                }`} />
                            <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{alert.skuName}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.message}</p>
                                <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-600 px-2 py-0.5 rounded">
                                    {alert.type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Fast Moving SKUs */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
                        <ArrowUpRight className="w-5 h-5 text-emerald-500 mr-2" />
                        Fast Moving Items
                    </h3>
                </div>
                <div className="space-y-4">
                    {skus.map((sku, idx) => (
                        <div key={sku.id} className="flex items-center justify-between p-3 border-b border-gray-50 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 mr-3">
                                    <Package className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1 w-40">{sku.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{sku.category}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-emerald-600">{sku.sellThroughRate}% STR</p>
                                <p className="text-xs text-gray-400">{sku.stockOnHand} in stock</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
