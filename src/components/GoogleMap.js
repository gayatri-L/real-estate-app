// import React from "react";
// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

// const mapStyles = {
//   width: "100%",
//   height: "300px",
//   borderRadius: "10px",
// };

// const locations = [
//   { lat: 18.530430, lng: 73.856743, name: "Shivaji Nagar" },
//   { lat: 18.550430, lng: 73.870743, name: "Kalyan Nagar" },
// ];

// const GoogleMap = (props) => {
//   return (
//     <div className="w-full h-[300px] rounded-lg overflow-hidden">
//       <Map
//         google={props.google}
//         zoom={12}
//         style={mapStyles}
//         initialCenter={{ lat: 18.520430, lng: 73.856743 }}
//       >
//         {locations.map((location, index) => (
//           <Marker key={index} position={{ lat: location.lat, lng: location.lng }} title={location.name} />
//         ))}
//       </Map>
//     </div>
//   );
// };

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyA2ddaLdvbkN_17pvuYqXp1YoM7zJAm2qg",
// })(GoogleMap);

// =======imp=====
// import React from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const MapComponent = ({ center, properties }) => {
//   console.log("Properties for Markers:", properties);
//   return (
//     <LoadScript googleMapsApiKey="AIzaSyA2ddaLdvbkN_17pvuYqXp1YoM7zJAm2qg">
//       <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
//         {/* {properties.map((property) => (
//           <Marker key={property.id} position={{ lat: property.lat, lng: property.lng }} />
//         ))} */}

//           {properties.map((property) => (
//           <Marker
//           key={property.id}
//           position={{
//             lat: property.latitude,
//             lng: property.longitude,
//           }}
//           title={property.name || "Property Location"}
//         />
//         ))}
//       </GoogleMap>
      
//     </LoadScript>
   
//   );
// };

// export default MapComponent;
import React, { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapComponent = ({ center, properties }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const onLoad = useCallback(() => {
    console.log("Google Maps Loaded");
    setMapLoaded(true);
  }, []);

  console.log("Properties for Markers:", properties);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyA2ddaLdvbkN_17pvuYqXp1YoM7zJAm2qg"
      onLoad={onLoad}
      onError={() => console.error("Error loading Google Maps API")}
    >
      {mapLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={{
                lat: parseFloat(property.latitude),
                lng: parseFloat(property.longitude),
              }}
              title={property.name || "Property Location"}
            />
          ))}
        </GoogleMap>
      ) : (
        <p>Loading Map...</p>
      )}
    </LoadScript>
  );
};

export default MapComponent;
