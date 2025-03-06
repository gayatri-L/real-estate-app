import React, { useEffect, useState } from "react";
import axios from "axios";

const DisplayImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/all-images");
      console.log("API Response:", response.data.data); // Debugging

      setImages(response.data.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Uploaded Images</h2>
      <div className="grid grid-cols-3 gap-4">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="border p-2 rounded-md shadow-md">
              <img
                src={image.url} // Use the URL from API
                alt={image.filename}
                className="w-full h-40 object-cover" // Ensure proper rendering
                onError={(e) => (e.target.src = "/placeholder.png")} // Handle broken images
              />
              <p className="text-center mt-2">Units: {image.units ? image.units : "N/A"}</p>
            </div>
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>
    </div>
  );
};

export default DisplayImages;
