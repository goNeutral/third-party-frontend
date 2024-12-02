// Map.tsx
import React from "react";
import { MapContainer, Popup, TileLayer, Marker, Polyline } from "react-leaflet";
import { CustomLine, CustomMarker } from "./MarkerUtils";


// generate 10 random coordinates of india


export default function Map({ markerPositions, linePositions }: any) {
    const redCoordinates = Array.from({ length: 10 }, () => ({
        lat: Math.floor(Math.random() * (28 - 21 + 1)) + 21,
        lng: Math.floor(Math.random() * (82 - 72 + 1)) + 72,
    }))

    const greenCoordinates = Array.from({ length: 32 }, () => ({
        lat: Math.floor(Math.random() * (28 - 21 + 1)) + 21,
        lng: Math.floor(Math.random() * (82 - 72 + 1)) + 72,
    }))

    return (
        <MapContainer center={[25.5937, 78.9629]} zoom={5} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {redCoordinates?.map((position: any) => (
                <CustomMarker variant="red" position={position}>
                </CustomMarker>
            ))}
            {greenCoordinates?.map((position: any) => (
                <CustomMarker variant="green" position={position}>
                </CustomMarker>
            ))}
            {/* <CustomMarker position={[30.2476529, 75.6396108]}>
                <Popup>This is a custom marker popup</Popup>
            </CustomMarker> */}
            {linePositions && linePositions.length > 0 && <CustomLine positions={linePositions} />}
        </MapContainer >
    );
}