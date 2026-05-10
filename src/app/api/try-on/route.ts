import { NextRequest, NextResponse } from "next/server";
import { callRapidApiTryOn } from "@/lib/rapidapiTryOn";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const result = await callRapidApiTryOn(formData);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Try-on API error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Failed to process try-on request", details: message }, { status: 500 });
  }
}
