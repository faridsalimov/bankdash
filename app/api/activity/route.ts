import { NextResponse } from "next/server";
import { getActivityData } from "@/lib/utils/api";

export async function GET() {
  try {
    const activityData = getActivityData();
    return NextResponse.json(activityData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch activity data" },
      { status: 500 }
    );
  }
}
