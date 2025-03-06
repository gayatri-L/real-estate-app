
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapComponent = ({ center, properties }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyA2ddaLdvbkN_17pvuYqXp1YoM7zJAm2qg">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {properties.map((property) => (
          <Marker key={property.id} position={{ lat: property.lat, lng: property.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
