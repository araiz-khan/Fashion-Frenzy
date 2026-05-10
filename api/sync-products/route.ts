import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb/connection";
import { ProductModel } from "@/lib/mongodb/models/Product";

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all products from MongoDB
    const products = await ProductModel.find().sort({ createdAt: -1 }).lean();

    const productCount = products.length;

    console.log(`✅ Successfully synced ${productCount} products from MongoDB`);

    return NextResponse.json({
      success: true,
      message: `Synced ${productCount} products from MongoDB`,
      count: productCount,
      products: products.map((p: any) => ({
        id: p._id.toString(),
        name: p.name,
        category: p.category,
        price: p.price,
        imageUrl: p.imageUrl,
        sellerId: p.sellerId,
      })),
    });
  } catch (error: any) {
    console.error("❌ Error syncing products:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to sync products",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
