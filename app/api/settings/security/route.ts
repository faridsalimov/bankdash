import { NextResponse } from "next/server";
import { updateUserSecurity } from "@/lib/utils/api";

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const updatedSecurity = updateUserSecurity("1", data);
    return NextResponse.json(updatedSecurity);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update security settings" },
      { status: 500 }
    );
  }
}
