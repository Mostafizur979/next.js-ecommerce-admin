'use client';

import React, { useState, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';

const data = [
  {
    id: '1',
    name: 'Mostafizur',
    address: 'Mirpur-10, Dhaka-1216',
    position: { lat: 23.8041, lng: 90.3663 }
  },
  {
    id: '2',
    name: 'Tabassum',
    address: 'Shalikha, Jhenaidah',
    position: { lat: 23.5525, lng: 89.1532 }
  }
];

const AdvancedMarkerWithRef = ({ onMarkerClick, children, ...props }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      ref={markerRef}
      onClick={() => marker && onMarkerClick(marker)}
      {...props}
    >
      {children}
    </AdvancedMarker>
  );
};

export default function MapsPage() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);

  const onMarkerClick = useCallback((marker, info) => {
    setSelectedMarker(marker);
    setSelectedInfo(info);
  }, []);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="w-full h-screen">
      <APIProvider apiKey={apiKey} libraries={['marker']}>
        <Map
          defaultZoom={7}
          defaultCenter={{ lat: 23.7, lng: 90.4 }}
          className="w-full h-full"
        >
          {data.map(({ id, position, name, address }) => (
            <AdvancedMarkerWithRef
              key={id}
              position={position}
              onMarkerClick={(marker) => onMarkerClick(marker, { name, address })}
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg" />
            </AdvancedMarkerWithRef>
          ))}

          {selectedMarker && selectedInfo && (
            <InfoWindow
              anchor={selectedMarker}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="text-sm">
                <h2 className="font-semibold">{selectedInfo.name}</h2>
                <p>{selectedInfo.address}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
