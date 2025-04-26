// api/store/settings/route.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import {connectDB} from "@/lib/mongodb";
import StoreSettings from "@/models/StoreSettings";

export async function GET() {
  try {
    await connectDB();

    // Fetch the session for authorization
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(
        JSON.stringify({ message: "Unauthorized", success: false }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch the store settings
    const settings = await StoreSettings.findOne({});
    return new Response(JSON.stringify(settings || {}), { status: 200 });
  } catch (error) {
    console.error("Error fetching settings:", error.message, error.stack);
    return new Response(
      JSON.stringify({ message: "Error fetching store settings", error: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Ensure that the user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(
        JSON.stringify({ message: "Unauthorized", success: false }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse incoming request body
    const body = await request.json();
    console.log("Received POST payload:", body);

    const { storeName, logoUrl, primaryColor, secondaryColor, fontFamily } = body;

    // Validate the required fields
    if (!storeName || !primaryColor || !secondaryColor || !fontFamily) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    await connectDB();

    // Check if settings already exist
    const existingSettings = await StoreSettings.findOne({});
    console.log("Existing settings:", existingSettings);

    if (existingSettings) {
      // Update existing settings
      await StoreSettings.updateOne(
        {},
        { storeName, logoUrl, primaryColor, secondaryColor, fontFamily }
      );
      console.log("Settings updated");
    } else {
      // Create new settings if they don't exist
      const newSettings = new StoreSettings({
        storeName,
        logoUrl,
        primaryColor,
        secondaryColor,
        fontFamily,
      });
      await newSettings.save();
      console.log("Settings created");
    }

    return new Response(
      JSON.stringify({ message: "Settings updated successfully", success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error saving settings:", error.message, error.stack);
    return new Response(
      JSON.stringify({ message: "Error saving store settings", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
