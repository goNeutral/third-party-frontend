"use client"

import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerUrl from "./red-marker.png";
// import { Circle as MakrerUrl } from "lucide-react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import { CircleAlert } from "lucide-react";
import { Customer } from '../customers/utils/columns';

interface CustomMarkerProps {
    position: L.LatLngExpression;
    children: React.ReactNode; // Content to display inside the marker
}

const markerPng = 'https://img.icons8.com/?size=100&id=U1cbNtgDXO2m&format=png&color=000000'
const greenMarkerPng = 'https://img.icons8.com/?size=100&id=gejeldAcScwa&format=png&color=000000'
const redMarkerUrl = 'https://img.icons8.com/?size=100&id=FqwL2jwJCq2o&format=png&color=000000'

const variantIconUrl = (variant: 'red' | 'green') => {
    switch (variant) {
        case 'red':
            return redMarkerUrl;
        case 'green':
            return greenMarkerPng;
        default:
            return markerPng;
    }
}
const CustomMarker: React.FC<CustomMarkerProps> = ({ variant, position, children }) => {

    const customIcon = L.icon({
        iconUrl: variantIconUrl(variant),
        iconSize: [35, 35], // size of the icon
        iconAnchor: [15, 25], // point of the icon which will correspond to marker's location
    });

    return (
        <Marker position={position} icon={customIcon}>
            {children}
        </Marker>
    );
};

const CustomLine = ({ positions }: { positions: L.LatLngExpression[] }) => {
    return (
        <Polyline positions={positions} />
    )
}

export {
    CustomMarker,
    CustomLine

};