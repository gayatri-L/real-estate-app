import React, { useEffect, useState } from "react";
import axios from "axios";

const WingDetails = () => {
  const [wingDetails, setWingDetails] = useState([]);

  useEffect(() => {
    const fetchWingDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/wing-details");
        setWingDetails(response.data);
      } catch (error) {
        console.error("Error fetching wing details:", error);
      }
    };

    fetchWingDetails();
  }, []);

  return (
    <div>
      <h1>Wing Details</h1>
      {wingDetails.length === 0 ? (
        <p>No wing details found.</p>
      ) : (
        wingDetails.map((wing) => (
          <div key={wing.wing_id}>
            <p>Balcony: {wing.bhk2_type1_balcony}</p>
            <p>Units: {wing.bhk2_type1_units}</p>
            <p>Project ID: {wing.project_id}</p>
            {wing.image_url && (
            <img src={wing.image_url} alt={`Wing ${wing.wing_id}`} width="300" />
            )}

          </div>
        ))
      )}
    </div>
  );
};

export default WingDetails;
