import { NextResponse } from "next/server";
import { getExpenseCategories } from "@/lib/utils/api";

export async function GET() {
  try {
    const categories = getExpenseCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch expense categories" },
      { status: 500 }
    );
  }
}
