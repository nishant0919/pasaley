"use client";
import { useEffect, useState } from "react";
import StoreTemplate from "@/components/templates/StoreTemplates"; // Import the StoreTemplate component

const StorePage = ({ params }) => {
  const [storeData, setStoreData] = useState(null);
  const [error, setError] = useState(null); // To capture any errors
  const { storeId } = params; // Get the storeId from URL params

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        // Log the storeId to ensure it's correct
        console.log("Fetching data for storeId:", storeId);

        // Call the API endpoint to get store data
        const res = await fetch(`/api/getStoreData/${storeId}`);
        
        if (!res.ok) {
          throw new Error("Store not found");
        }

        const data = await res.json();
        setStoreData(data); // Set the fetched store data
      } catch (error) {
        setError(error.message); // Capture error if fetching fails
        console.error("Error fetching store data:", error);
      }
    };

    if (storeId) {
      fetchStoreData(); // Fetch data when storeId changes
    }
  }, [storeId]);

  if (error) {
    return <div>Error: {error}</div>; // Display error if something went wrong
  }

  if (!storeData) {
    return <div>Loading...</div>; // Show loading until the data is fetched
  }

  return <StoreTemplate storeData={storeData} />;
};

export default StorePage;
