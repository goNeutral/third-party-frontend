// Map.tsx
import React from "react";
import { MapContainer, Popup, TileLayer, Marker, Polyline } from "react-leaflet";
import { CustomLine, CustomMarker } from "./MarkerUtils";
import 'leaflet/dist/leaflet.css';

const generateSequentialCoordinates = (count = 10,
    latMin = 21, latMax = 28,
    lngMin = 72, lngMax = 82) => {
    // Create a random starting point
    let currentLat = Math.floor(Math.random() * (latMax - latMin + 1)) + latMin;
    let currentLng = Math.floor(Math.random() * (lngMax - lngMin + 1)) + lngMin;

    const coordinates = Array.from({ length: count }, () => {
        // Small random walks for lat and lng
        const latStep = Math.abs(Math.random());
        const lngStep = Math.abs(Math.random());

        // Update coordinates with slight random walk
        currentLat = Math.min(Math.max(currentLat + latStep, latMin), latMax);
        currentLng = Math.min(Math.max(currentLng + lngStep, lngMin), lngMax);

        return {
            lat: Number(currentLat.toFixed(4)),
            lng: Number(currentLng.toFixed(4))
        };
    });

    return coordinates;
}

const data = [
    {
        "readerReadTime": "2023-05-19 16:18:45.0",
        "seqNo": "4eb70376-2bbe-422f-8d98-b59bda007230",
        "laneDirection": "E",
        "tollPlazaGeocode": "29.197881,75.533697",
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

export default function Map({ markerPositions, linePositions }: any) {
    const coordinates = data.map((item) => {
        return [item.tollPlazaGeocode.split(',')[0], item.tollPlazaGeocode.split(',')[1]]
    })

    console.log(coordinates)

    return (
        <div>
            <MapContainer center={[30.731947, 75.041365]} zoom={7} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {coordinates?.map((position, index: any) => (
                    <div key={index}>
                        <CustomMarker variant="red" position={position}>
                            <Popup>{data[index].tollPlazaName}</Popup>
                        </CustomMarker>
                    </div>
                ))}
                <CustomMarker variant="green" position={coordinates[coordinates.length - 1]}>
                    <Popup>WARYAM NANGAL TOLL PLAZA</Popup>
                </CustomMarker>
                {coordinates && coordinates.length > 0 && <CustomLine positions={coordinates} />}
            </MapContainer >
        </div>
    );
}

