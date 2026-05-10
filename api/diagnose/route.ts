import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb/connection";
import { ProductModel } from "@/lib/mongodb/models/Product";

export async function GET() {
  try {
    console.log("🔍 Diagnosing MongoDB connection...");
    console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✅ Set" : "❌ Not set");

    await connectToDatabase();
    console.log("✅ Connected to MongoDB");

    // Get database stats
    const count = await ProductModel.countDocuments();
    console.log(`📊 Total products in database: ${count}`);

    // Fetch all products
    const products = await ProductModel.find().sort({ createdAt: -1 }).lean();

    // Get some sample data
    const sample = products.slice(0, 3);

    return NextResponse.json({
      success: true,
      mongodbUri: process.env.MONGODB_URI ? "✅ Configured" : "❌ Not set",
      connectionStatus: "✅ Connected",
      totalProducts: count,
      returnedProducts: products.length,
      sampleProducts: sample.map((p: any) => ({
        id: p._id.toString(),
        name: p.name,
        category: p.category,
        price: p.price,
      })),
    });
  } catch (error: any) {
    console.error("❌ Diagnostic error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to diagnose connection",
        mongodbUri: process.env.MONGODB_URI ? "✅ Configured" : "❌ Not set",
        details: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
