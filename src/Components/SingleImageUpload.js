import { useState } from "react";
import axios from "axios";

const SingleImageUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [units, setUnits] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUnitsChange = (event) => {
    setUnits(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !units) {
      alert("Please select an image and enter units.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("units", units);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload success:", response.data);
      alert("Image uploaded successfully!");
      setFile(null);
      setUnits("");
      onUploadSuccess(); // Refresh gallery
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md w-96 mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} required  className="mb-3"/>
        <input
          type="number"
          placeholder="Enter units"
          value={units}
          onChange={handleUnitsChange}
          required
          className="block w-full p-2 border border-gray-300 rounded-md mb-3"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Upload</button>
      </form>
    </div>
  );
};

export default SingleImageUpload;
