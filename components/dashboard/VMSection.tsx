'use client';

import { VMData } from '@/lib/types';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';

export default function VMSection({ data }: { data: VMData[] }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Visual Merchandising Impact</h2>
                <button className="text-sm text-subtle-blue dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 flex items-center">
                    View All Audits <ArrowRight className="w-4 h-4 ml-1" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {data.map((campaign, idx) => (
                    <motion.div
                        key={campaign.campaignName}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{campaign.campaignName}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{campaign.startDate} - {campaign.endDate}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center ${campaign.auditResult === 'Pass' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                                    campaign.auditResult === 'Warning' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                                        'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                    }`}>
                                    {campaign.auditResult === 'Pass' ? <CheckCircle className="w-3 h-3 mr-1" /> :
                                        campaign.auditResult === 'Warning' ? <AlertTriangle className="w-3 h-3 mr-1" /> :
                                            <XCircle className="w-3 h-3 mr-1" />}
                                    {campaign.auditResult}
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mb-6">
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">Compliance</p>
                                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{campaign.complianceScore}%</p>
                                </div>
                                <div className="h-8 w-px bg-gray-100 dark:bg-gray-700" />
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">Sales Uplift</p>
                                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">+{campaign.salesUplift}%</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 flex items-center justify-between text-sm">
                            <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs">Window Display</span>
                                <div className="flex text-yellow-400 text-lg">
                                    {'★'.repeat(Math.round(campaign.windowDisplayRating))}
                                    <span className="text-gray-300 dark:text-gray-600">{'★'.repeat(5 - Math.round(campaign.windowDisplayRating))}</span>
                                </div>
                            </div>
                            <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs">Floor Display</span>
                                <div className="flex text-yellow-400 text-lg">
                                    {'★'.repeat(Math.round(campaign.floorDisplayRating))}
                                    <span className="text-gray-300 dark:text-gray-600">{'★'.repeat(5 - Math.round(campaign.floorDisplayRating))}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
