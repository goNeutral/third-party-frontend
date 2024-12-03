// Map.tsx
import React from "react";
import { MapContainer, Popup, TileLayer, Marker, Polyline } from "react-leaflet";
import { CustomLine, CustomMarker } from "./MarkerUtils";


// generate 10 random coordinates of india
const generateUniqueCoordinates = (count, precision = 4) => {
    const uniqueCoordinates = new Set();
    while (uniqueCoordinates.size < count) {
        const lat = (Math.floor(Math.random() * (28 - 21 + 1)) + 21).toFixed(precision);
        const lng = (Math.floor(Math.random() * (82 - 72 + 1)) + 72).toFixed(precision);
        uniqueCoordinates.add(`${lat},${lng}`);
    }

    return Array.from(uniqueCoordinates).map(coordKey => {
        const [lat, lng] = coordKey.split(',').map(Number);
        return { lat, lng };
    });
}


export default function Map({ markerPositions, linePositions }: any) {

    const redCoordinates = generateUniqueCoordinates(10);
    const greenCoordinates = generateUniqueCoordinates(32);

    return (
        <MapContainer center={[25.5937, 78.9629]} zoom={5} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {redCoordinates?.map((position, idx: any) => (
                <CustomMarker variant="red" position={position} key={100 + idx}>
                </CustomMarker>
            ))}
            {greenCoordinates?.map((position, idx: any) => (
                <CustomMarker variant="green" position={position} key={100 + idx}>
                </CustomMarker>
            ))}
            {/* <CustomMarker position={[30.2476529, 75.6396108]}>
                <Popup>This is a custom marker popup</Popup>
            </CustomMarker> */}
            {linePositions && linePositions.length > 0 && <CustomLine positions={linePositions} />}
        </MapContainer >
    );
}