import { NextResponse } from "next/server";
import { getQuickTransferContacts } from "@/lib/utils/api";

export async function GET() {
  try {
    const contacts = getQuickTransferContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
