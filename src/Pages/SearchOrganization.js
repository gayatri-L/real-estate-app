import React, { useState } from "react";
import axios from "axios";

const OrganizationSearch = () => {
  const [orgName, setOrgName] = useState(""); // Organization name input
  const [data, setData] = useState([]); // Stores API response
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error messages
  const [selectedOrg, setSelectedOrg] = useState(null); // Stores selected row details

  // Function to fetch details
  const fetchDetails = async () => {
    if (!orgName.trim()) {
      setError("Please enter an organization name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:5000/api/projects/details?org_name=${encodeURIComponent(orgName)}`
      );
      setData(response.data);
    } catch (err) {
      setError(`Failed to fetch data. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg flex gap-6">
      {/* Left: Search & Results Table */}
      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-4">Search Organization</h2>

        {/* Input & Button */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Enter Organization Name"
            className="p-2 border rounded-md flex-grow"
          />
          <button
            onClick={fetchDetails}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {loading && <p className="mt-4 text-blue-600">Loading...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* Results Table */}
        {data.length > 0 && (
          <table className="w-full mt-3 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Org Name</th>
                <th className="border p-2">Project Name</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.org_id} className="text-center">
                  <td className="border p-2">{item.org_name}</td>
                  <td className="border p-2">{item.project_name}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => setSelectedOrg(item)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Right: Detailed View Table */}
      <div className="w-1/2">
        {selectedOrg && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Project Details</h3>
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="border p-2 font-semibold">Org ID</td>
                  <td className="border p-2">{selectedOrg.org_id}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Org Name</td>
                  <td className="border p-2">{selectedOrg.org_name}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Organization Email</td>
                  <td className="border p-2">{selectedOrg.org_email}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Project Name</td>
                  <td className="border p-2">{selectedOrg.project_name}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Location</td>
                  <td className="border p-2">{selectedOrg.location}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">RERA Contact</td>
                  <td className="border p-2">{selectedOrg.rera_contact}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Project Launch</td>
                  <td className="border p-2">{selectedOrg.project_launch}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">BHK 1 </td>
                  <td className="border p-2">{selectedOrg.bhk_1 ? "✔ Yes" : "✖ NO"}  BHK 2 :{selectedOrg.bhk_2 ? "✔ Yes" : "✖ NO"}  BHK 3 :{selectedOrg.bhk_3 ? "✔ Yes" : "✖ NO"} </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Parking</td>
                  <td className="border p-2">{selectedOrg.parking}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Project Contact</td>
                  <td className="border p-2">{selectedOrg.project_contact}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">BHK2 Type1 Balcony</td>
                  <td className="border p-2">{selectedOrg.bhk2_type1_balcony}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">BHK2 Type1 Units</td>
                  <td className="border p-2">{selectedOrg.bhk2_type1_units}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationSearch;
