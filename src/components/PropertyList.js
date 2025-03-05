
import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { LocationOn, SquareFoot, Hotel } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PropertyList = ({ properties }) => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 ">
      <h3 className="text-3xl font-bold text-yellow-500 mb-6 text-center uppercase">
        Available Properties
      </h3>

      {properties.length === 0 ? (
        <p className="text-center text-gray-400">No properties found for selected filters.</p>
      ) : (
        <Grid container spacing={4} justifyContent="center" className="bg-black">
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
              <Card className="bg-black text-white shadow-lg rounded-xl overflow-hidden border border-yellow-500">

                {/* ✅ Image Slider (Swiper) */}
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  className="h-52"
                >
                  {property.images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`${property.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* <CardContent className="p-4 bg-black">
                  {/* Property Name */}
                {/* <Typography variant="h6" className="text-yellow-400 font-semibold">
                    {property.name}
                  </Typography>
                    {/* Price */}
                {/* <Typography className="flex items-center text-gray-300 mt-1">
                    <AttachMoney className="text-yellow-500 mr-1" /> ₹{property.price.toLocaleString()}
                  </Typography>  */}

                {/* Location */}
                {/* <Typography className="flex items-center text-gray-300 mt-2">
                    <LocationOn className="text-yellow-500 mr-1" /> {property.location}
                  </Typography> */}

                {/* Area */}
                {/* <Typography className="flex items-center text-gray-300 mt-1">
                    <SquareFoot className="text-yellow-500 mr-1" /> {property.area} sqft
                  </Typography> */}



                {/* BHK */}
                {/* <Typography className="flex items-center text-gray-300 mt-1">
                    <Hotel className="text-yellow-500 mr-1" /> {property.bhk} BHK
                  </Typography>
                </CardContent>  */}
                <CardContent className="p-4 bg-black">
                  {/* ✅ Name and Price in the Same Row */}
                  <div className="flex justify-between items-center">
                    <Typography variant="h6" className="text-yellow-400 font-semibold">
                      {property.name}
                    </Typography>
                    <Typography className="flex items-center text-gray-300">
                      ₹{property.price.toLocaleString()}
                    </Typography>
                  </div>

                  {/* ✅ Location in One Row */}
                  <Typography className="flex items-center text-gray-300 mt-2">
                    <LocationOn className="text-yellow-500" /> {property.location}
                  </Typography>

                  {/* ✅ BHK and Sqft in the Same Row */}
                  <div className="flex justify-between items-center mt-1">
                    <Typography className="flex items-center text-gray-300">
                      <SquareFoot className="text-yellow-500 mr-1" /> {property.area} sqft
                    </Typography>
                    <Typography className="flex items-center text-gray-300">
                      <Hotel className="text-yellow-500 mr-1" /> {property.bhk} BHK
                    </Typography>
                  </div>
                </CardContent>

              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default PropertyList;
