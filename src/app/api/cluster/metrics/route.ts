import { NextResponse } from "next/server";
import { getMockClusterMetrics } from "@/lib/mockData";

// GET /api/cluster/metrics - Get cluster-wide aggregated metrics
export async function GET() {
  try {
    // TODO: Replace with real aggregation from all servers
    // For now, return mock data
    const metrics = getMockClusterMetrics();

    return NextResponse.json({
      status: "success",
      data: {
        metrics,
        timestamp: Date.now(),
      },
    });
  } catch (error) {
    console.error("Error fetching cluster metrics:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch cluster metrics",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
