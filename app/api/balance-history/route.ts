import { NextResponse } from "next/server";
import { getBalanceHistory } from "@/lib/utils/api";

export async function GET() {
  try {
    const history = getBalanceHistory();
    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch balance history" },
      { status: 500 }
    );
  }
}
