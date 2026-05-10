import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import { getUserModel, type UserRole } from "@/lib/mongodb/models/User";

const VALID_ROLES: UserRole[] = ["buyer", "seller"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body?.email || "").toLowerCase().trim();
    const password = String(body?.password || "");
    const role = body?.role as UserRole;

    if (!email || !password || !role) {
      return NextResponse.json({ error: "Email, password, and role are required." }, { status: 400 });
    }

    if (!VALID_ROLES.includes(role)) {
      return NextResponse.json({ error: "Invalid role selected." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long." }, { status: 400 });
    }

    const UserModel = await getUserModel();
    const existing = await UserModel.findOne({ email }).lean();

    if (existing) {
      return NextResponse.json({ error: "This email address is already in use." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await UserModel.create({ email, passwordHash, role });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Failed to create account." }, { status: 500 });
  }
}
