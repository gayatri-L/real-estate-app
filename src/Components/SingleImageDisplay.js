
import { useEffect, useState } from "react";
import axios from "axios";

const SingleImageDisplay = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/images");
      setImages(response.data.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-center text-2xl font-semibold mb-6">Uploaded Images</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={`http://localhost:5000/images/${img.id}`}
              alt={img.filename}
              className="w-full h-48 object-cover"
            />
            <p className="text-center text-lg font-medium p-3 bg-gray-100">
              Units: {img.units}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleImageDisplay;
