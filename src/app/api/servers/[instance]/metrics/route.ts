import { NextResponse } from "next/server";
import { getMockServerMetrics } from "@/lib/mockData";

// GET /api/servers/[instance]/metrics - Get metrics for a specific server
export async function GET(
  request: Request,
  { params }: { params: Promise<{ instance: string }> },
) {
  try {
    const { instance } = await params;

    // Decode the instance parameter (URL encoded)
    const decodedInstance = decodeURIComponent(instance);

    // TODO: Replace with real plugin API call
    // For now, return mock data
    const metrics = getMockServerMetrics(decodedInstance);

    if (!metrics) {
      return NextResponse.json(
        {
          status: "error",
          message: `Server not found: ${decodedInstance}`,
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      status: "success",
      data: {
        instance: decodedInstance,
        metrics,
        timestamp: Date.now(),
      },
    });
  } catch (error) {
    console.error("Error fetching server metrics:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch server metrics",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
