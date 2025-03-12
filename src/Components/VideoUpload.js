import { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
 
const VideoUpload = ({ handleChange, section, field, label, limit = 1 }) => {
  const [previews, setPreviews] = useState([]); // Store video previews
 
  const handleFileChange = (event) => {
    if (!event.target.files || event.target.files.length === 0) return;
 
    const files = Array.from(event.target.files).slice(0, limit); // Limit number of videos
 
    // Generate previews for videos
    const newPreviews = files.map((file) => URL.createObjectURL(file));
 
    setPreviews(newPreviews); // Store only up to limit
    handleChange(section, field, files); // Update form state
  };
 
  return (
    <div className="flex flex-col w-3/4">
      {/* Dynamic Label */}
      {label && (
        <label
          htmlFor={`${section}-${field}`}
          className="mb-2 font-semibold text-[#9CA3AF] mt-3"
        >
          {label}
        </label>
      )}
 
      {/* Video Previews */}
      <div className="flex flex-wrap gap-2 mb-1">
        {previews.map((src, index) => (
          <video
            key={index}
            src={src}
            controls
            className="w-48 h-32 object-cover rounded-md"
          />
        ))}
      </div>
 
      {/* Input for Videos */}
      <input
        id={`${section}-${field}`}
        type="file"
        accept="video/*"
        multiple={limit > 1} // Enable 'multiple' only if limit > 1
        onChange={handleFileChange}
        className="hidden"
      />
 
      {/* Custom Upload Button */}
      <label
        htmlFor={`${section}-${field}`}
        className="inline-flex items-center justify-between text-white font-semibold cursor-pointer border-b w-full"
      >
        <span>Choose {limit === 1 ? "File" : `Up to ${limit} Files`}</span>
        <FolderIcon className="text-white" />
      </label>
    </div>
  );
};
 
export default VideoUpload;