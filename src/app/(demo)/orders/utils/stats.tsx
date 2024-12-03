"use client";

import React from "react";
import { Card } from '@/components/ui/card';
import { Truck, DollarSign, Package, Clock } from 'lucide-react';

const ProductDashboardStats = ({className}: {className?: string}): JSX.Element => {
    const stats = {
        totalWeight: 150000,
        totalCost: 500000,
        materialShipped: 120000,
        pendingStatus: 'In Progress',
    };

    return (
        <div className={className}>
            <Card className="w-full px-4 py-2 rounded-sm">
                <div className="font-bold mb-2">Material Procurement Statistics</div>
                    <div className="grmd:grid-cols-1">
                        <StatItem
                            title="Total Weight Procured"
                            value={`${stats.totalWeight.toLocaleString()} kg`}
                            icon={<></>}
                        />
                        <StatItem
                            title="Total Cost"
                            value={`$${stats.totalCost.toLocaleString()}`}
                            icon={<></>}
                        />
                        {/* <StatItem
                            title="Material Shipped"
                            value={`${stats.materialShipped.toLocaleString()} kg`}
                            icon={Package}
                        />
                        <StatItem
                            title="Pending Status"
                            value={stats.pendingStatus}
                            icon={Clock}
                        /> */}
                    </div>
                </Card>
        </div>
    )
}


const StatItem = ({ title, value, icon: Icon }:
    { title: string; value: string; icon: JSX.Element }): JSX.Element => (
    <div className="flex items-center space-x-4">
        <div className="p-2 bg-primary/10 rounded-full">
            {/* <Icon className="h-2 w-2 text-primary" /> */}
        </div>
        <div className="flex flex-row justify-between w-full space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-sm font-bold">{value}</p>
        </div>
    </div>
);

export default ProductDashboardStats;