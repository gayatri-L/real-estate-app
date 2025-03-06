
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const DisplayImages = () => {
  const [imageGroups, setImageGroups] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/all-images");
      console.log("API Response:", response.data.data);
      setImageGroups(response.data.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Uploaded Images</h2>

      {imageGroups.length > 0 ? (
        imageGroups.map((group) => (
          <div key={group.id} className="mb-8">
            <h3 className="text-center text-lg font-semibold mb-2">
              Units: {group.units ? group.units : "N/A"}
            </h3>
            
            {/* Swiper Slider */}
            {/* <Swiper
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              className="w-full max-w-lg mx-auto"
            >
              {group.urls.map((imgUrl, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <img
                    src={`http://localhost:5000/uploads/${imgUrl}`}
                    alt={`Property ${index}`}
                    className="w-full h-60 object-cover rounded-lg shadow-lg"
                    onError={(e) => (e.target.src = "/default-placeholder.png")}
                  />
                </SwiperSlide>
              ))}
            </Swiper> */}
            <Swiper
  spaceBetween={10}
  slidesPerView={1}  // Show 2 images per row
  navigation
  pagination={{ clickable: true }}
  modules={[Navigation, Pagination]}
  className="w-full max-w-lg mx-auto"
>
  {group.urls.map((imgUrl, index) => (
    <SwiperSlide key={index} className="flex justify-center">
      <img
        src={`http://localhost:5000/uploads/${imgUrl}`}
        alt={`Property ${index}`}
        className="w-full h-60 object-cover rounded-lg shadow-lg"
        onError={(e) => (e.target.src = "/default-placeholder.png")}
      />
    </SwiperSlide>
  ))}
</Swiper>

          </div>
        ))
      ) : (
        <p className="text-center">No images found.</p>
      )}
    </div>
  );
};

export default DisplayImages;
