import { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
 
const ImageUpload = ({ handleChange, section, field, label, limit = 1 ,error}) => {
  const [previews, setPreviews] = useState([]); // Store multiple previews
 
  const handleFileChange = (event) => {
    if (!event.target.files || event.target.files.length === 0) return;
 
    const files = Array.from(event.target.files).slice(0, limit); // Limit number of files
 
    // Generate previews for images
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
 
      {/* Image Previews */}
      <div className="flex flex-wrap gap-2 mb-1">
        {previews.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Preview ${index}`}
            className="w-32 h-32 object-cover rounded-md"
          />
        ))}
      </div>
 
      {/* Input for Images */}
      <input
        id={`${section}-${field}`}
        type="file"
        accept="image/*"
        multiple={limit > 1} // Enable 'multiple' if more than 1 image is allowed
        onChange={handleFileChange}
        className="hidden"
        error={Boolean(error)}
        helperText={error || ''}
      />
 
      {/* Custom Button */}
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
 
export default ImageUpload;
 