import React, { useState } from "react";
import axios from "axios";

const MultipleImageUpload = () => {
  const [files, setFiles] = useState([]);
  const [units, setUnits] = useState("");
  const [uploadResponse, setUploadResponse] = useState(null);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUnitChange = (event) => {
    setUnits(event.target.value);
  };

  const handleUpload = async () => {
    if (files.length === 0 || !units) {
      alert("Please select images and enter units");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("units", units);

    try {
      const response = await axios.post("http://localhost:5000/multiple-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadResponse(response.data);
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md w-96 mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Upload Multiple Images</h2>
      <input type="file" multiple onChange={handleFileChange} className="mb-3" />
      <input
        type="number"
        placeholder="Enter Units"
        value={units}
        onChange={handleUnitChange}
        className="block w-full p-2 border border-gray-300 rounded-md mb-3"
      />
      <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded-md">
        Upload
      </button>

      {uploadResponse && (
        <div className="mt-4">
          <h3 className="font-semibold">Upload Result:</h3>
          <pre className="bg-gray-200 p-2 rounded-md">{JSON.stringify(uploadResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MultipleImageUpload;
