"use client";

import React from "react";
import OrderStatusGraph from "./graph-order-status";
import { Card } from "@/components/ui/card";

const GraphStats = ({ className }: { className?: string }): JSX.Element => {
    return (
        <div className={className}>
            <Card className="rounded-sm">
                <OrderStatusGraph />
            </Card>
        </div>
    );
};

export default GraphStats;