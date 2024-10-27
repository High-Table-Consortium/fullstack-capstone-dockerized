"use client"

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

// Dynamically import the MapContainer and other components from react-leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const GeoJSON = dynamic(() => import('react-leaflet').then(mod => mod.GeoJSON), { ssr: false });
const ZoomControl = dynamic(() => import('react-leaflet').then(mod => mod.ZoomControl), { ssr: false });

const Map = () => {
  const [L, setL] = useState(null);

  useEffect(() => {
    // Dynamically import leaflet only on the client side
    import('leaflet').then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  if (!L) {
    return null; // Render nothing until leaflet is loaded
  }

  // Custom icon for the markers
  const icon = L.icon({
    iconUrl: "/placeholder.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  // South Africa GeoJSON data
  const southAfricaGeoJSON = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Western Cape" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [18.4, -34.3],
              [20.0, -34.0],
              [23.0, -34.0],
              [23.0, -31.5],
              [19.0, -31.5],
              [18.4, -34.3]
            ]
          ]
        }
      }
    ]
  };

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
  ];

  // South Africa boundaries for map restriction
  const southAfricaBounds = [
    [-35.0, 16.0],  // Southwest corner
    [-22.0, 33.0]   // Northeast corner
  ];

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center py-9 font-mono">
        Our <span className="text-yellow-500">Provinces</span>
      </h2>
      <div className='flex justify-center'>
        <div className="w-full mr-1 ml-1 lg:w-1/2 " style={{ height: "400px", width: "800px", border: "2px solid #f1c40f", borderRadius: "8px", overflow: "hidden", zIndex: 0 }}>
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
    </div>
  );
};

export default Map;