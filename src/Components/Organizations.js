import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchOrganizations, createOrganization } from "../api/OrganizationApi";
 
const schema = yup.object().shape({
  orgName: yup
    .string()
    .required("Organization name is required")
    .max(100, "Organization name cannot exceed 100 characters")
    .matches(/^[a-zA-Z\s]+$/, "Organization name contains unsupported characters"),
  orgCin: yup
    .string()
    .required("CIN is required")
    .max(21, "CIN cannot exceed 21 characters")
    .matches(/^[a-zA-Z0-9]+$/, "CIN must contain only letters and numbers"),
  orgOwners: yup
    .string()
    .required("Owner name is required")
    .matches(/^[a-zA-Z\s]+$/, "Owner Name must contain only letters"),
  projectsCompleted: yup
    .number()
    .typeError("Projects Completed must be a number")
    .min(0, "Projects completed cannot be negative")
    .max(999, "Projects completed cannot exceed 999"),
});
 
const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [backendErrors, setBackendErrors] = useState({}); // Store backend errors
 
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
 
  useEffect(() => {
    const getOrganizations = async () => {
      const data = await fetchOrganizations();
      setOrganizations(data);
    };
    getOrganizations();
  }, []);
 
  const onSubmit = async (data) => {
    try {
      const createdOrg = await createOrganization(data);
      setOrganizations([...organizations, createdOrg]);
      reset();
      setBackendErrors({}); // Clear backend errors on success
    } catch (error) {
      if (error.response && error.response.data) {
        setBackendErrors(error.response.data); // Capture backend errors
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
 
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Organizations</h1>
 
      {/* List of Organizations */}
      <ul className="mb-4">
        {organizations.map((org) => (
          <li key={org.orgId} className="border p-2 my-2">
            <strong>{org.orgName}</strong> - CIN: {org.orgCin} - Owners: {org.orgOwners} - Completed: {org.projectsCompleted}
          </li>
        ))}
      </ul>
 
      {/* Form to Add Organization */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input {...register("orgName")} type="text" placeholder="Organization Name" className="border p-2" />
        <p className="text-red-500">{errors.orgName?.message || backendErrors?.orgName}</p>
 
        <input {...register("orgCin")} type="text" placeholder="CIN Number" className="border p-2" />
        <p className="text-red-500">{errors.orgCin?.message || backendErrors?.orgCin}</p>
 
        <input {...register("orgOwners")} type="text" placeholder="Owners" className="border p-2" />
        <p className="text-red-500">{errors.orgOwners?.message || backendErrors?.orgOwners}</p>
 
        <input {...register("projectsCompleted")} type="number" placeholder="Projects Completed" className="border p-2" />
        <p className="text-red-500">{errors.projectsCompleted?.message || backendErrors?.projectsCompleted}</p>
 
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Organization</button>
      </form>
    </div>
  );
};
 
export default Organizations;
 
 