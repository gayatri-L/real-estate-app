import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PropertyList = ({ properties }) => {
  if (!properties || properties.length === 0) {
    return <p className="text-gray-600">No properties found.</p>;
  }

  console.log("Received Properties:", properties);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div
          key={property.Wing_Id || property.Project_Id}
          className="border border-yellow-500 p-5 rounded-lg shadow-2xl"
        >
           {/* ✅ Image Slider */}
           {property.bhk2_type1_images?.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="h-52"
            >
              {property.bhk2_type1_images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`${property.Project_Name || "Property"} ${index + 1}`}
                    className="w-full h-full object-cover"
                   
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-400">No images available.</p>
          )}
         <div className="p-1">
          {/* ✅ Project Name */}
          <h2 className="text-lg font-semibold text-white">
            {property.project_name || "Unnamed Property"}
          </h2>

          {/* ✅ BHK Types */}
          <p className="text-white">
            BHK:
            {property.bhk_1 ? " 1, " : ""}
            {property.bhk_2 ? " 2, " : ""}
            {property.bhk_3 ? " 3 " : ""}
            | Units: {property.bhk2_type1_units || "N/A "}
             {" "}| Location: {property.location || "Unknown"}
          </p>

          {/* ✅ Budget */}
          <p className="text-white">
            Budget: ₹{property.budget?.toLocaleString() || "N/A"}
          </p>

          </div>

         
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
