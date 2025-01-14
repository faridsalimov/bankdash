import { NextResponse } from "next/server";
import { updateUserPreferences } from "@/lib/utils/api";

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const updatedPreferences = updateUserPreferences("1", data);
    return NextResponse.json(updatedPreferences);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update preferences" },
      { status: 500 }
    );
  }
}
