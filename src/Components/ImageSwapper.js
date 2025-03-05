// // import React, { useEffect, useState } from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import { Navigation } from "swiper/modules";

// // const ImageSwiper = ({ wingId }) => {
// //     const [images, setImages] = useState([]);

// //     useEffect(() => {
// //         fetch(`http://localhost:5000/getWing/${wingId}`)
// //             .then((res) => res.json())
// //             .then((data) => setImages(data.bhk_2_type1_images));
// //     }, [wingId]);

// //     return (
// //         <div className="w-full max-w-lg mx-auto">
// //             <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
// //                 {images.map((img, index) => (
// //                     <SwiperSlide key={index}>
// //                         <img src={`http://localhost:5000${img}`} alt={`Slide ${index}`} className="w-full h-64 object-cover rounded-lg" />
// //                     </SwiperSlide>
// //                 ))}
// //             </Swiper>
// //         </div>
// //     );
// // };

// // export default ImageSwiper;
// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";

// const ImageSwapper = ({ projectId }) => {
//     const [project, setProject] = useState(null);
//     const [wings, setWings] = useState([]);

//     // useEffect(() => {
//     //     if (!projectId) return;

//     //     // ✅ Fetch Project Details
//     //     fetch(`http://localhost:5000/getProject/${projectId}`)
//     //         .then((res) => res.json())
//     //         .then((data) => setProject(data))
//     //         .catch((err) => console.error("Error fetching project:", err));

//     //     // ✅ Fetch Wing Details
//     //     fetch(`http://localhost:5000/getWing/${projectId}`)
//     //         .then((res) => res.json())
//     //         .then((data) => setWings(data))
//     //         .catch((err) => console.error("Error fetching wings:", err));

//     // }, [projectId]);
//     useEffect(() => {
//         console.log("Fetching project for ID:", projectId); // ✅ Debug log
    
//         if (!projectId) {
//             console.error("❌ projectId is undefined!");
//             return;
//         }
    
//         fetch(`http://localhost:5000/getProject/${projectId}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log("API Response:", data); // ✅ Debug API response
//                 setProject(data);
//             })
            
//             .catch((err) => console.error("❌ Error fetching project:", err));
//     }, [projectId]);
//     return (
//         <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
//             {project === null ? (
//                 <p className="text-yellow-500 font-semibold">⏳ Loading project details...</p>
//             ) : project.error ? (
//                 <p className="text-red-500 font-semibold">❌ {project.error}</p>
//             ) : (
//                 <>
//                     <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
//                     <p className="text-gray-700 mb-4">📍 {project.location}</p>
//                 </>
//             )}
//         </div>
//     );
//     // return (
//     //     <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
//     //         {project ? (
//     //             <>
//     //                 <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
//     //                 <p className="text-gray-700 mb-4">📍 {project.location}</p>
//     //             </>
//     //         ) : (
//     //             <p>Loading project details...</p>
//     //         )}

//     //         {wings.length > 0 ? (
//     //             wings.map((wing, index) => (
//     //                 <div key={index} className="mb-6 p-4 border rounded-lg">
//     //                     <h2 className="text-xl font-semibold mb-2">Wing {wing.wing_id}</h2>
//     //                     <p>🏠 2BHK Units: {wing.bhk2_type1_units}</p>
//     //                     <p>🌿 Balcony: {wing.bhk2_type1_balcony}</p>

//     //                     {/* ✅ Image Swiper */}
//     //                     {wing.bhk_2_type1_images && wing.bhk_2_type1_images.length > 0 && (
//     //                         <Swiper navigation={true} modules={[Navigation]} className="mySwiper mt-4">
//     //                             {wing.bhk_2_type1_images.map((img, i) => (
//     //                                 <SwiperSlide key={i}>
//     //                                     <img 
//     //                                         src={`http://localhost:5000${img}`} 
//     //                                         alt={`Slide ${i}`} 
//     //                                         className="w-full h-64 object-cover rounded-lg"
//     //                                     />
//     //                                 </SwiperSlide>
//     //                             ))}
//     //                         </Swiper>
//     //                     )}
//     //                 </div>
//     //             ))
//     //         ) : (
//     //             <p>No wings found for this project.</p>
//     //         )}
//     //     </div>
//     // );
// };

// export default ImageSwapper;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ImageSwiper = () => {
    const { projectId } = useParams(); // ✅ Get projectId from URL
    const [project, setProject] = useState(null);
    const [wings, setWings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    console.log("Project ID:", projectId);
    useEffect(() => {
        if (!projectId) {
            setError("❌ Project ID is missing!");
            setLoading(false);
            return;
        }

        fetch(`http://localhost:5000/getProject/${projectId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setProject(data.project);
                    setWings(data.wings);
                }
                setLoading(false);
            })
            .catch((err) => {
                setError("❌ Failed to fetch project details!");
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, [projectId]);

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            {/* 🟢 Loading or Error Message */}
            {loading && <p className="text-yellow-500 font-semibold">⏳ Loading project details...</p>}
            {error && <p className="text-red-500 font-semibold">{error}</p>}

            {/* 🟢 Project Details */}
            {project && (
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">{project.name}</h1>
                    <p className="text-gray-700">📍 {project.location}</p>
                </div>
            )}

            {/* 🟢 Wing Details with Swiper */}
            {wings.length > 0 ? (
                wings.map((wing) => (
                    <div key={wing.wing_id} className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Wing {wing.wing_id} - {wing.bhk2_type1_units} Units
                        </h2>
                        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                            {JSON.parse(wing.bhk_2_type1_images).map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={`http://localhost:5000${img}`}
                                        alt={`Wing ${wing.wing_id} Slide ${index}`}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">No wings found for this project.</p>
            )}
        </div>
    );
};

export default ImageSwiper;
