import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";

interface IProps {
  lat?: number;
  lng?: number;
  height?: string;
  disableClick?: boolean;
  latLngChange?: (lat: number, lng: number) => void;
}

const GeoMap = ({ lat, lng, height = "375px", disableClick = false, latLngChange = (lat, lng) => {} }: IProps) => {
  const [mapCenter, setMapCenter] = useState({ lat: lat || 19.086022922443416, lng: lng || 72.90804243684849 });
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCaKbVhcX_22R_pRKDYuNA7vox-PtGaDkI",
  });

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (disableClick) {
      return;
    }
    const lat = e.latLng?.lat() as number;
    const lng = e.latLng?.lng() as number;

    setMapCenter({ lat, lng });
    latLngChange(lat, lng);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height }}
      center={mapCenter}
      zoom={16}
      options={{ streetViewControl: false, disableDoubleClickZoom: true }}
      onClick={handleMapClick}
    >
      <Marker position={mapCenter}></Marker>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(GeoMap);
