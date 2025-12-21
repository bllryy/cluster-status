import { NextResponse } from "next/server";
import { getMockServers } from "@/lib/mockData";

// GET /api/servers - List all Minecraft servers
export async function GET() {
  try {
    // TODO: Replace with real Kubernetes service discovery
    // For now, return mock data
    const servers = getMockServers();

    return NextResponse.json({
      status: "success",
      data: {
        servers,
        count: servers.length,
        onlineCount: servers.filter((s) => s.health === "online").length,
      },
    });
  } catch (error) {
    console.error("Error fetching servers:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch servers",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
