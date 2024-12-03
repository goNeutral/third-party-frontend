"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import { Button } from "@/components/ui/button";
import { TimelineLayout } from "./TimelineLayout";
// import Map from "./Map";
import dynamic from "next/dynamic";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
const DynamicMap = dynamic(async () => await import('./Map'), {
    ssr: false,
});

const DynamicMapCollection = dynamic(async () => await import('./MapCollection'), {
    ssr: false,
});

const DynamicMapCaller = ({ markerPositions, linePositions }) => {
    return <DynamicMap markerPositions={markerPositions} linePositions={linePositions} />
}

const transacts = [{
    "readerReadTime": "2023-05-19 16:18:45.0",
    "seqNo": "4eb70376-2bbe-422f-8d98-b59bda007230",
    "laneDirection": "E",
    "tollPlazaGeocode": "32.197881,75.533697",
    "tollPlazaName": "LADPALWAN TOLL PLAZA",
    "vehicleType": "VC11",
    "vehicleRegNo": "AB03Y8611"
},
{
    "readerReadTime": "2023-05-20 21:14:16.0",
    "seqNo": "e6ff5422-5a6d-49b9-98ec-21094850d748",
    "laneDirection": "N",
    "tollPlazaGeocode": "30.2476529,75.6396108",
    "tollPlazaName": "Badbar",
    "vehicleType": "VC11",
    "vehicleRegNo": "AB03Y8611"
},
{
    "readerReadTime": "2023-05-20 05:07:14.0",
    "seqNo": "4baf2938-c7e1-4e6c-8d57-98be9345c2b4",
    "laneDirection": "N",
    "tollPlazaGeocode": "31.053694, 75.049833",
    "tollPlazaName": "Karahewala Toll Plaza",
    "vehicleType": "VC11",
    "vehicleRegNo": "AB03Y8611"
},
{
    "readerReadTime": "2023-05-20 03:14:59.0",
    "seqNo": "60ed09bf-6fde-42ad-ad01-888541e2e632",
    "laneDirection": "N",
    "tollPlazaGeocode": "31.37004,74.9525751",
    "tollPlazaName": "Usma Toll Plaza",
    "vehicleType": "VC11",
    "vehicleRegNo": "AB03Y8611"
},
{
    "readerReadTime": "2023-05-20 01:10:43.0",
    "seqNo": "a2b48c5d-2df6-46c8-96fb-89dcd79d230e",
    "laneDirection": "E",
    "tollPlazaGeocode": "31.731947,75.041365",
    "tollPlazaName": "WARYAM NANGAL TOLL PLAZA",
    "vehicleType": "VC11",
    "vehicleRegNo": "AB03Y8611"
}
];

const greenMarkerPng = 'https://img.icons8.com/?size=100&id=gejeldAcScwa&format=png&color=000000'
const redMarkerUrl = 'https://img.icons8.com/?size=100&id=FqwL2jwJCq2o&format=png&color=000000'

const OrderTracking = ({ response }) => {
    const transactions = response.vehicle.vehltxnList.txn;
    // const markerPositions = transactions.map((txn) => [txn.latitude, txn.longitude]);
    return (
        <div className="w-full p-4">
            <div className="flex w-fit gap-5 mb-4">
                <Card className="flex flex-row justify-between w-[36vw] p-8">
                    <h1 className="flex flex-row gap-2 text-2xl">
                        <Image src={greenMarkerPng} width={30} height={30} alt="" />
                        Delivered</h1>
                    <h3 className="text-3xl">32</h3>
                </Card>
                <Card className="flex flex-row justify-between w-[36vw] p-8">
                    <h1 className="flex flex-row gap-2 text-2xl">
                        <Image src={redMarkerUrl} width={30} height={30} alt="" />
                        In Transit</h1>
                    <h3 className="text-3xl">10</h3>
                </Card>
            </div>
            <Card className="h-40">
                <DynamicMapCollection />
            </Card>
        </div>
    );
};

export const OrderTrackingButton = () => {
    return (
        <Sheet >
            <SheetTrigger asChild>
                <Button>Track</Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle className="pl-6 mb-4 text-2xl ">Tracking vehicle: {transacts[0].vehicleRegNo}</SheetTitle>
                    <SheetDescription asChild>
                        <div>
                            <TimelineLayout transactions={transacts} />
                            <DynamicMap />
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default OrderTracking;