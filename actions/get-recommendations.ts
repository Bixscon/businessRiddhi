"use server";

import axios, { AxiosError } from "axios";
import * as z from "zod";

// Define the schema for the recommendation request
const recommendationSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  industry: z.string(),
  sector: z.string(),
  trllevel: z.number().min(0).max(9).default(1), // Default value set to 1 if not provided
});

// Function to get recommendations
export const getRecommendations = async (
  startupDetails: z.infer<typeof recommendationSchema>,
  limit: number = 10,
) => {
  // Validate the input fields
  const validatedFields = recommendationSchema.safeParse(startupDetails);

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error);
    console.error("Input data:", startupDetails);
    return { 
      error: "Invalid fields!", 
      details: validatedFields.error.issues 
    };
  }

  try {
    // Make the API call to get recommendations
    const response = await axios.post(
      `https://viseyreccomendation-23e913815003.herokuapp.com/business/get_reccomendations/?limit=${limit}`,
      validatedFields.data,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return {
          error: "Failed to fetch recommendations",
          details: error.response.data,
        };
      } else if (error.request) {
        // The request was made but no response was received
        return { error: "No response received from server" };
      }
    }
    // Something happened in setting up the request that triggered an Error
    return { error: "Error in setting up request" };
  }
};

// Replace the above URL with your API endpoint if needed
