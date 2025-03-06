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
// *-----important--0*
// import React, { useState, useCallback } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const MapComponent = ({ center, properties }) => {
//   const [mapLoaded, setMapLoaded] = useState(false);

//   const onLoad = useCallback(() => {
//     console.log("Google Maps Loaded");
//     setMapLoaded(true);
//   }, []);

//   console.log("Properties for Markers:", properties);

//   return (
//     <LoadScript
//       googleMapsApiKey="AIzaSyA2ddaLdvbkN_17pvuYqXp1YoM7zJAm2qg"
//       onLoad={onLoad}
//       onError={() => console.error("Error loading Google Maps API")}
//     >
//       {mapLoaded ? (
//         <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
//           {properties.map((property) => (
//             <Marker
//               key={property.id}
//               position={{
//                 lat: parseFloat(property.latitude),
//                 lng: parseFloat(property.longitude),
//               }}
//               title={property.name || "Property Location"}
//             />
//           ))}
//         </GoogleMap>
//       ) : (
//         <p>Loading Map...</p>
//       )}
//     </LoadScript>
//   );
// };

// // export default MapComponent;
// import React, { useState, useCallback } from "react";
// import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const MapComponent = ({ center, properties }) => {
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);

//   const onLoad = useCallback(() => {
//     console.log("Google Maps Loaded");
//     setMapLoaded(true);
//   }, []);

//   const handleMarkerClick = (property) => {
//     setSelectedProperty(property);
//   };

//   const handleCloseInfoWindow = () => {
//     setSelectedProperty(null);
//   };

//   console.log("Properties for Markers:", properties);

//   return (
//     <LoadScript
//       googleMapsApiKey="AIzaSyA2ddaLdvbkN_17pvuYqXp1YoM7zJAm2qg"
//       onLoad={onLoad}
//       onError={() => console.error("Error loading Google Maps API")}
//     >
//       {mapLoaded ? (
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={12}
//           options={{ fullscreenControl: false }}
//         >
//           {properties.map((property) => (
//             <Marker
//               key={property.id}
//               position={{
//                 lat: parseFloat(property.latitude),
//                 lng: parseFloat(property.longitude),
//               }}
//               title={property.project_name || "Property Location"}
//               onClick={() => handleMarkerClick(property)}
//             />
//           ))}

//           {selectedProperty && (
//             <InfoWindow
//               position={{
//                 lat: parseFloat(selectedProperty.latitude),
//                 lng: parseFloat(selectedProperty.longitude),
//               }}
//               onCloseClick={handleCloseInfoWindow}
//             >
//               <div>
//                 <h3>{selectedProperty.name || "Property Location"}</h3>
//                 <p>BHK Available: {selectedProperty.bhk ? "Yes" : "No"}</p>
//               </div>
//             </InfoWindow>
//           )}
//         </GoogleMap>
//       ) : (
//         <p>Loading Map...</p>
//       )}
//     </LoadScript>
//   );
// };

// export default MapComponent;
//
import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, OverlayView } from "@react-google-maps/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapComponent = ({ center, properties }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const mapRef = useRef(null);

  const onLoad = useCallback((map) => {
    console.log("Google Maps Loaded");
    mapRef.current = map;
  }, []);

  const getAvailableBHKs = (property) => {
    const availableBHKs = [];
    if (property.bhk_1) availableBHKs.push("1");
    if (property.bhk_2) availableBHKs.push("2");
    if (property.bhk_3) availableBHKs.push("3");
    if (property.bhk_4) availableBHKs.push("4");
    return availableBHKs.length > 0 ? availableBHKs.join(", ") : "None";
  };

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);

    if (mapRef.current) {
      mapRef.current.panTo({
        lat: parseFloat(property.latitude) - 0.03, // Adjust latitude to shift the map higher
        lng: parseFloat(property.longitude),
      });
    }
  };

  const closePropertyCard = () => {
    setSelectedProperty(null);
  };

  const handleMapClick = (event) => {
    if (selectedProperty) {
      closePropertyCard();
    }
  };

  const stopPropagation = (event) => {
    if (event && typeof event.stopPropagation === "function") {
      event.stopPropagation();
    }
  };
  
  useEffect(() => {
    return () => {
      if (mapRef.current && window.google) {
        window.google.maps.event.clearInstanceListeners(mapRef.current);
      }
    };
  }, []);

  console.log("Properties for Markers:", properties);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyA2ddaLdvbkN_17pvuYqXp1YoM7zJAm2qg"
      onError={() => console.error("Error loading Google Maps API")}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{ fullscreenControl: false }}
        onLoad={onLoad}
        onClick={handleMapClick}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={{
              lat: parseFloat(property.latitude),
              lng: parseFloat(property.longitude),
            }}
            title={property.project_name || "Property Location"}
            onClick={() => handleMarkerClick(property)}
          />
        ))}

        {selectedProperty && (
          <OverlayView
            position={{
              lat: parseFloat(selectedProperty.latitude),
              lng: parseFloat(selectedProperty.longitude),
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              onClick={stopPropagation}
              style={{
                width: "250px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                borderRadius: "12px",
                padding: "12px",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {selectedProperty.bhk2_type1_images?.length > 0 ? (
               <Swiper
               modules={[Navigation, Pagination]}
               navigation
               pagination={{ clickable: true }}
               className="h-50 w-full"
               style={{ borderRadius: "8px", overflow: "hidden" }}
               onClick={(e) => stopPropagation(e)}
             >
               {selectedProperty.bhk2_type1_images.map((img, index) => (
                 <SwiperSlide key={index}>
                   <img
                     src={img}
                     alt={`${selectedProperty.project_name || "Property"} ${index + 1}`}
                     className="w-full h-full object-cover"
                   />
                 </SwiperSlide>
               ))}
             </Swiper>             
              ) : (
                <p className="text-gray-400">No images available.</p>
              )}
              <h2 style={{ margin: "10px 0 5px" }}><strong>₹{selectedProperty.budget || "Price Not Available"}</strong></h2>
              <p style={{ margin: "0" }}><strong>BHK :</strong> {getAvailableBHKs(selectedProperty)}</p>
              <p style={{ margin: "0", color: "#666" }}>{selectedProperty.address || "Address Not Available"}</p>
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
