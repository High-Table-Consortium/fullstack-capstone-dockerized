"use client"

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Custom icon for the markers
const icon = L.icon({
  iconUrl: "/placeholder.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

// South Africa GeoJSON data
const southAfricaGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Western Cape" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [18.4, -34.3],
          [20.0, -34.0],
          [23.0, -34.0],
          [23.0, -31.5],
          [19.0, -31.5],
          [18.4, -34.3]
        ]]
      }
    }
  ]
}

// Major cities in South Africa
const cities = [
  { name: "Cape Town", coordinates: [-33.9249, 18.4241], province: "Western Cape" },
  { name: "Johannesburg", coordinates: [-26.2041, 28.0473], province: "Gauteng" },
  { name: "Durban", coordinates: [-29.8587, 31.0218], province: "KwaZulu-Natal" },
  { name: "Pretoria", coordinates: [-25.7479, 28.2293], province: "Gauteng" },
  { name: "Port Elizabeth", coordinates: [-33.9608, 25.6022], province: "Eastern Cape" },
  { name: "Bloemfontein", coordinates: [-29.0852, 26.1596], province: "Free State" },
  { name: "Nelspruit", coordinates: [-25.4653, 30.9785], province: "Mpumalanga" },
  { name: "Kimberley", coordinates: [-28.7282, 24.7499], province: "Northern Cape" },
  { name: "Polokwane", coordinates: [-23.9045, 29.4688], province: "Limpopo" },
  { name: "Mahikeng", coordinates: [-25.8560, 25.6403], province: "North West" },
]

export default function Map() {
  // South Africa boundaries for map restriction
  const southAfricaBounds = [
    [-35.0, 16.0],  // Southwest corner
    [-22.0, 33.0]   // Northeast corner
  ]

  return (
    <div>
      <div style={{ width: "60%", height: "600px", border: "2px solid #ddd", borderRadius: "8px", overflow: "hidden", zIndex: 0 }}>
        <MapContainer
          center={[-29.0, 25.0]}  // Center on South Africa
          zoom={5}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          maxBounds={southAfricaBounds}  // Restrict movement to South Africa bounds
          minZoom={5}  // Prevent zooming out too far
          maxBoundsViscosity={1.0}  // Strong restriction to the bounds
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <GeoJSON
            data={southAfricaGeoJSON}
            style={() => ({
              color: 'gray',
              weight: 2,
              fillColor: 'lightgray',
              fillOpacity: 0.3,
            })}
          />
          {cities.map((city) => (
            <Marker
              key={city.name}
              position={city.coordinates}
              icon={icon}
            >
              <Popup>
                <strong>{city.name}</strong>
                <br />
                {city.province}
              </Popup>
            </Marker>
          ))}
          <ZoomControl position="bottomright" />
        </MapContainer>
      </div>
    </div>
  )
}


