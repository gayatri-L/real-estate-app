import SearchIcon from '@mui/icons-material/Search';

const PropertyFilters = ({ filters, updateFilter }) => {
  return (
    <div className="rounded-lg flex items-center gap-4 justify-center">
      {/* Budget Dropdown */}
      <select
        value={filters.budget}
        onChange={(e) => updateFilter("budget", e.target.value)}
        className="p-3 w-52 bg-white text-gray-700 rounded-lg shadow-md focus:outline-none"
      >
        <option value="">Budget</option>
        <option value="500000">₹5 Lakh</option>
        <option value="1000000">₹10 Lakh</option>
        <option value="5000000">₹50 Lakh</option>
      </select>

      {/* Location Dropdown */}
      <select
        value={filters.location}
        onChange={(e) => updateFilter("location", e.target.value)}
        className="p-3 w-52 bg-white text-gray-700 rounded-lg shadow-md focus:outline-none"
      >
        <option value="">Location</option>
        <option value="Pune">Pune</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Bangalore">Bangalore</option>
      </select>

      {/* BHK Dropdown */}
      <select
        value={filters.bhk}
        onChange={(e) => updateFilter("bhk", e.target.value)}
        className="p-3 w-52 bg-white text-gray-700 rounded-lg shadow-md focus:outline-none"
      >
        <option value="">Bedrooms</option>
        <option value="1">1 BHK</option>
        <option value="2">2 BHK</option>
        <option value="3">3 BHK</option>
      </select>

      {/* Find Button */}
      <button
        onClick={() => alert("Search Initiated")}
        className="p-3 w-32 bg-yellow-500 text-black font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 hover:bg-yellow-400 transition"
      >
        FIND <SearchIcon />
      </button>
    </div>
  );
};

export default PropertyFilters;
