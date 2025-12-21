import { NextResponse } from "next/server";
import { getMockProxyMetrics } from "@/lib/mockData";

// GET /api/proxy/metrics - Get Velocity proxy metrics
export async function GET() {
  try {
    // TODO: Replace with real Velocity proxy API call
    // For now, return mock data
    const metrics = getMockProxyMetrics();

    return NextResponse.json({
      status: "success",
      data: {
        metrics,
        timestamp: Date.now(),
      },
    });
  } catch (error) {
    console.error("Error fetching proxy metrics:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch proxy metrics",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
