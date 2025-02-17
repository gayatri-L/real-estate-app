import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "900px",
  height: "300px", // Adjust height to fit the UI
  borderRadius: "10px", // Adds rounded corners
  overflow: "hidden",
};  

const locations = [
  { lat: 18.530430, lng: 73.856743, name: "Shivaji Nagar" },
  { lat: 18.550430, lng: 73.870743, name: "Kalyan Nagar" },
];

const MapContainer = (props) => {
  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden">
      <Map
        google={props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: 18.520430, lng: 73.856743 }}
      >
        {locations.map((location, index) => (
          <Marker key={index} position={{ lat: location.lat, lng: location.lng }} title={location.name} />
        ))}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
    apiKey:"AIzaSyChbnyMWKgqPeh6ATYYxSFiTzSQVCFtPcY"
})(MapContainer)