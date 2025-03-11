import React, { useEffect, useState } from "react";
import axios from "axios";
import DemoNavbar from "./DemoNavbar";
import DemoFooter from "./Footer";
import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";
import {
  LocationCity,
  HomeWork,
  CurrencyRupee,
  Apartment,
  PhotoLibrary,
  LocalHotel,
  LocalHospital,
  LocalMall,
  Movie,
  KingBed,
} from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const LatestEntity = () => {
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/entities/latest")
      .then((response) => {
        setEntity(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching latest entity:", error);
        setError("Failed to load latest entity");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <CircularProgress color="secondary" />
      </div>
    );
  if (error)
    return <Typography color="error" textAlign="center">{error}</Typography>;

  return (
    <div>
      <DemoNavbar />
      <Card
        style={{
          maxWidth: 1200,
          margin: "40px auto",
          padding: "30px",
          backgroundColor: "#111",
          color: "white",
        }}
      >
        <Typography
          variant="h4"
          style={{ color: "gold", display: "flex", alignItems: "center", marginBottom: "20px" }}
        >
          <HomeWork style={{ marginRight: 8 }} /> Latest Real Estate Project
        </Typography>

        <CardContent>
          <Grid container spacing={3} alignItems="flex-start">
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Organisation Name:</strong> {entity.organisationName}
              </Typography>
              <Typography>
                <strong>Organisation CIN:</strong> {entity.organisationCin}
              </Typography>
              <Typography>
                <strong>Project Name:</strong> {entity.projectName}
              </Typography>
              <Typography>
                <LocationCity style={{ marginRight: 8 }} /> <strong>City:</strong> {entity.city}
              </Typography>
              <Typography>
                <Apartment style={{ marginRight: 8 }} /> <strong>Property Area:</strong> {entity.propertyAreaSqmt} sq.m
              </Typography>
              <Typography>
                <CurrencyRupee style={{ marginRight: 8 }} /> <strong>Price Range:</strong> ₹{entity.priceMin} - ₹{entity.priceMax}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" style={{ color: "gold", marginBottom: "10px" }}>
                <LocalHotel style={{ marginRight: 8 }} /> Amenities
              </Typography>
              <Typography>{entity.amenities || "No amenities listed"}</Typography>

              <Typography variant="h6" style={{ marginTop: 16, color: "gold" }}>
                Nearby Places
              </Typography>
              <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
                <li><strong>Schools:</strong> {entity.schools.join(", ")}</li>
                <li><strong>Hospitals:</strong> {entity.hospitals.join(", ")}</li>
                <li><strong>Malls:</strong> {entity.malls.join(", ")}</li>
                <li><strong>Movie Theaters:</strong> {entity.movieTheaters.join(", ")}</li>
              </ul>
            </Grid>
          </Grid>

          {(entity.onebhk_config || entity.twobhk_config) && (
            <div style={{ marginTop: 30 }}>
              <Typography variant="h5" style={{ color: "gold", marginBottom: "10px" }}>
                <KingBed style={{ marginRight: 8 }} /> Apartment Configurations
              </Typography>
              <Grid container spacing={3}>
                {entity.onebhk_config && (
                  <Grid item xs={12} md={6}>
                    <Card style={{ backgroundColor: "#222", padding: 16, borderRadius: 12 }}>
                      <Typography variant="h6" style={{ color: "gold" }}>1 BHK Configuration</Typography>
                      <Typography><strong>Size:</strong> {entity.onebhk_config.size} sq.ft</Typography>
                      <Typography><strong>Price:</strong> ₹{entity.onebhk_config.price}</Typography>
                    </Card>
                  </Grid>
                )}
                {entity.twobhk_config && (
                  <Grid item xs={12} md={6}>
                    <Card style={{ backgroundColor: "#222", padding: 16, borderRadius: 12 }}>
                      <Typography variant="h6" style={{ color: "gold" }}>2 BHK Configuration</Typography>
                      <Typography><strong>Size:</strong> {entity.twobhk_config.size} sq.ft</Typography>
                      <Typography><strong>Price:</strong> ₹{entity.twobhk_config.price}</Typography>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </div>
          )}

          <Typography variant="h6" style={{ marginTop: 16, color: "gold", marginBottom: "10px" }}>
            <PhotoLibrary style={{ marginRight: 8 }} /> Project Images
          </Typography>
          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            style={{ paddingBottom: "10px" }}
          >
            {entity.projectImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt="Project"
                  style={{ height: 180, width: "100%", borderRadius: 12, objectFit: "cover" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </CardContent>
      </Card>
      <DemoFooter />
    </div>
  );
};

export default LatestEntity;
