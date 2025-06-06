import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import StoreSettings from "@/models/StoreSettings";

export async function GET() {
  try {
    await connectDB();

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
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(
        JSON.stringify({ message: "Unauthorized", success: false }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json();
    console.log("Received POST payload:", body);

    const { storeName, logoUrl, primaryColor, secondaryColor, fontFamily } = body;

    if (!storeName || !primaryColor || !secondaryColor || !fontFamily) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const existingSettings = await StoreSettings.findOne({});
    console.log("Existing settings:", existingSettings);

    if (existingSettings) {
      await StoreSettings.updateOne(
        {},
        { storeName, logoUrl, primaryColor, secondaryColor, fontFamily }
      );
      console.log("Settings updated");
    } else {
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
      { status: 500 }
    );
  }
}
