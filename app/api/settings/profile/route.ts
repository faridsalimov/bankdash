import { NextResponse } from "next/server";
import { updateUserProfile } from "@/lib/utils/api";

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const updatedUser = updateUserProfile("1", data);
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
