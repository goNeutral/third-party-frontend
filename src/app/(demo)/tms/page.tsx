import React, { type JSX } from "react";
import OrderTracking from "./OrderTracking";

const response = {
    "response": {
        "result": "SUCCESS",
        "respCode": "000",
        "ts": "2023-05-22T15:26:03",
        "vehicle": {
            "errCode": "000",
            "vehltxnList": {
                "totalTagsInMsg": "5",
                "msgNum": "1",
                "totalTagsInresponse": "5",
                "totalMsg": "1",
                "txn": [
                    {
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
                ]
            }
        }
    },
    "responseStatus": "SUCCESS"
};


const Page = (): JSX.Element => {
    return (
        <div>
            <OrderTracking response={response.response} />
        </div>
    );
};

export default Page;
