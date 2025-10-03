import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    console.log("Test endpoint called");
    
    // Test 1: Environment variables
    console.log("Environment check:");
    console.log("- MONGODB_URI:", process.env.MONGODB_URI ? "✅ Set" : "❌ Missing");
    console.log("- CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY ? "✅ Set" : "❌ Missing");
    console.log("- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? "✅ Set" : "❌ Missing");
    
    // Test 2: Authentication
    console.log("Authentication check:");
    const { userId } = await auth();
    console.log("- User ID:", userId || "❌ Not authenticated");
    
    // Test 3: Database connection
    console.log("Database check:");
    await connectDB();
    console.log("- Database connection: ✅ Success");
    
    return NextResponse.json({
      success: true,
      tests: {
        mongodb: process.env.MONGODB_URI ? "✅ Set" : "❌ Missing",
        clerk: {
          secret: process.env.CLERK_SECRET_KEY ? "✅ Set" : "❌ Missing",
          publishable: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? "✅ Set" : "❌ Missing",
        },
        auth: userId ? "✅ Authenticated" : "❌ Not authenticated",
        database: "✅ Connected"
      },
      userId
    });
  } catch (error) {
    console.error("Test endpoint error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}