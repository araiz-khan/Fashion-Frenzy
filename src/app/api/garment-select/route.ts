import { NextResponse } from "next/server";
import { callGradioGarmentSelect } from "@/lib/gradioClient";

export async function GET() {
  try {
    const result = await callGradioGarmentSelect();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Garment select API error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch garment selection", details: message },
      { status: 500 }
    );
  }
}
