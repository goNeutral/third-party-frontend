"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import { Button } from "@/components/ui/button";
import { TimelineLayout } from "./TimelineLayout";
// import Map from "./Map";
import dynamic from "next/dynamic";
import { Card, CardTitle } from "@/components/ui/card";
import displayCost from '@/utils/display';
const DynamicMap = dynamic(() => import('./Map'), {
    ssr: false,
});

const DynamicMapCollection = dynamic(() => import('./MapCollection'), {
    ssr: false,
});

const DynamicMapCaller = ({ markerPositions, linePositions }) => {
    return <DynamicMap markerPositions={markerPositions} linePositions={linePositions} />
}
const OrderTracking = ({ response }) => {
    const transactions = response.vehicle.vehltxnList.txn;
    const markerPositions = transactions.map((txn) => [txn.latitude, txn.longitude]);
    return (
        <div className="w-[49rem]">
            <Sheet >
                <SheetTrigger asChild>
                    <Button>Track</Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                    <SheetHeader>
                        <SheetTitle className="pl-6 mb-4 text-2xl ">Tracking vehicle: {transactions[0].vehicleRegNo}</SheetTitle>
                        <SheetDescription asChild>
                            <>
                                <div></div>
                                <TimelineLayout transactions={transactions} />
                                <DynamicMap />
                            </>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            <div className="flex w-fit gap-4">
                <Card className="flex flex-row justify-between w-96 p-8">
                    <h1 className=" text-2xl">Delivered</h1>
                    <h3 className="text-3xl">32</h3>
                </Card>
                <Card className="flex flex-row justify-between w-96 p-8">
                    <h1 className=" text-2xl">In Transit</h1>
                    <h3 className="text-3xl">10</h3>
                </Card>
            </div>
            <Card className="h-40">
                <DynamicMapCollection />
            </Card>
        </div>
    );
};

export default OrderTracking;