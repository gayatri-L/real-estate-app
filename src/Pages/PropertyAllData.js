import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import { LocationOn, Business, Home, AttachMoney } from "@mui/icons-material";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fetching data from the API
        axios.get("http://localhost:8080/api/entities/all") // Replace with your API URL
            .then((response) => {
                setProjects(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Latest Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <Card key={index} className="shadow-lg rounded-lg">
                        <CardHeader
                            title={project.projectName}
                            subheader={project.city + ", " + project.locality}
                        />
                        <CardMedia
                            component="img"
                            height="200"
                            image={project.projectImages.length > 0 ? project.projectImages[0] : "https://via.placeholder.com/400"}
                            alt={project.projectName}
                        />
                        <CardContent>
                            <div className="flex items-center mb-2">
                                <Business className="text-blue-500" />
                                <span className="ml-2 text-gray-700">{project.organisationName}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <LocationOn className="text-red-500" />
                                <span className="ml-2 text-gray-700">{project.address}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <Home className="text-green-500" />
                                <span className="ml-2 text-gray-700">{project.units} Units</span>
                            </div>
                            <div className="flex items-center">
                                <AttachMoney className="text-yellow-500" />
                                <span className="ml-2 text-gray-700">
                                    ₹{project.priceMin.toLocaleString()} - ₹{project.priceMax.toLocaleString()}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
