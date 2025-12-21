// Mock data generator for Minecraft servers
// This will be replaced with real Kubernetes/Plugin API integration later

export interface MockMinecraftServer {
  instance: string;
  serverName: string;
  serverType: "lobby" | "survival" | "creative" | "minigame" | "proxy";
  health: "online" | "offline";
  playerCount: number;
  maxPlayers: number;
  version: string;
  onlineMode: boolean;
  labels: {
    instance: string;
    job: string;
    nodename: string;
  };
}

export interface MockServerMetrics {
  server: {
    name: string;
    type: string;
    version: string;
    onlineMode: boolean;
    playerCount: number;
    maxPlayers: number;
  };
  performance: {
    tps: number;
    tickTime: number;
    loadedChunks: number;
    entities: number;
  };
  system: {
    cpuUsage: number;
    memoryUsed: number;
    memoryMax: number;
    uptime: number;
  };
  timeSeries: {
    tps: Array<{ timestamp: number; value: number }>;
    playerCount: Array<{ timestamp: number; value: number }>;
    cpu: Array<{ timestamp: number; value: number }>;
    memory: Array<{ timestamp: number; value: number }>;
    loadedChunks: Array<{ timestamp: number; value: number }>;
    entities: Array<{ timestamp: number; value: number }>;
  };
}

// Mock server configurations
const MOCK_SERVERS: MockMinecraftServer[] = [
  {
    instance: "lobby-1:25565",
    serverName: "lobby-1",
    serverType: "lobby",
    health: "online",
    playerCount: 45,
    maxPlayers: 100,
    version: "1.20.4",
    onlineMode: true,
    labels: {
      instance: "lobby-1:25565",
      job: "minecraft-server",
      nodename: "lobby-1",
    },
  },
  {
    instance: "lobby-2:25565",
    serverName: "lobby-2",
    serverType: "lobby",
    health: "online",
    playerCount: 38,
    maxPlayers: 100,
    version: "1.20.4",
    onlineMode: true,
    labels: {
      instance: "lobby-2:25565",
      job: "minecraft-server",
      nodename: "lobby-2",
    },
  },
  {
    instance: "survival-1:25565",
    serverName: "survival-1",
    serverType: "survival",
    health: "online",
    playerCount: 67,
    maxPlayers: 100,
    version: "1.20.4",
    onlineMode: true,
    labels: {
      instance: "survival-1:25565",
      job: "minecraft-server",
      nodename: "survival-1",
    },
  },
  {
    instance: "survival-2:25565",
    serverName: "survival-2",
    serverType: "survival",
    health: "online",
    playerCount: 52,
    maxPlayers: 100,
    version: "1.20.4",
    onlineMode: true,
    labels: {
      instance: "survival-2:25565",
      job: "minecraft-server",
      nodename: "survival-2",
    },
  },
  {
    instance: "creative-1:25565",
    serverName: "creative-1",
    serverType: "creative",
    health: "online",
    playerCount: 23,
    maxPlayers: 50,
    version: "1.20.4",
    onlineMode: true,
    labels: {
      instance: "creative-1:25565",
      job: "minecraft-server",
      nodename: "creative-1",
    },
  },
  {
    instance: "minigame-1:25565",
    serverName: "minigame-1",
    serverType: "minigame",
    health: "online",
    playerCount: 34,
    maxPlayers: 80,
    version: "1.20.4",
    onlineMode: true,
    labels: {
      instance: "minigame-1:25565",
      job: "minecraft-server",
      nodename: "minigame-1",
    },
  },
];

// Generate realistic time-series data
function generateTimeSeries(
  baseValue: number,
  variance: number,
  points: number = 60,
): Array<{ timestamp: number; value: number }> {
  const now = Date.now();
  const data: Array<{ timestamp: number; value: number }> = [];

  for (let i = points; i >= 0; i--) {
    const timestamp = now - i * 60000; // 1 minute intervals
    const randomVariance = (Math.random() - 0.5) * variance;
    const value = Math.max(0, baseValue + randomVariance);
    data.push({ timestamp, value: parseFloat(value.toFixed(2)) });
  }

  return data;
}

// Get mock server list
export function getMockServers(): MockMinecraftServer[] {
  return MOCK_SERVERS;
}

// Get mock metrics for a specific server
export function getMockServerMetrics(instance: string): MockServerMetrics | null {
  const server = MOCK_SERVERS.find((s) => s.instance === instance);
  if (!server) return null;

  // Base values vary by server type
  const baseMetrics = {
    lobby: { tps: 19.8, cpu: 35, memory: 4, chunks: 1200, entities: 500 },
    survival: { tps: 19.5, cpu: 65, memory: 12, chunks: 3500, entities: 2800 },
    creative: { tps: 19.9, cpu: 25, memory: 6, chunks: 1800, entities: 1200 },
    minigame: { tps: 19.7, cpu: 45, memory: 8, chunks: 2200, entities: 1500 },
    proxy: { tps: 20, cpu: 15, memory: 2, chunks: 0, entities: 0 },
  };

  const base = baseMetrics[server.serverType];

  return {
    server: {
      name: server.serverName,
      type: server.serverType,
      version: server.version,
      onlineMode: server.onlineMode,
      playerCount: server.playerCount,
      maxPlayers: server.maxPlayers,
    },
    performance: {
      tps: parseFloat((base.tps + (Math.random() - 0.5) * 0.5).toFixed(2)),
      tickTime: parseFloat(((20 - base.tps) * 50).toFixed(2)),
      loadedChunks: Math.floor(base.chunks + (Math.random() - 0.5) * 200),
      entities: Math.floor(base.entities + (Math.random() - 0.5) * 100),
    },
    system: {
      cpuUsage: parseFloat((base.cpu + (Math.random() - 0.5) * 10).toFixed(2)),
      memoryUsed: base.memory * 1024 * 1024 * 1024, // Convert GB to bytes
      memoryMax: 16 * 1024 * 1024 * 1024, // 16GB
      uptime: Math.floor(Math.random() * 604800) + 86400, // 1-7 days
    },
    timeSeries: {
      tps: generateTimeSeries(base.tps, 0.5),
      playerCount: generateTimeSeries(server.playerCount, server.playerCount * 0.2),
      cpu: generateTimeSeries(base.cpu, 15),
      memory: generateTimeSeries((base.memory / 16) * 100, 5), // Memory as percentage
      loadedChunks: generateTimeSeries(base.chunks, 300),
      entities: generateTimeSeries(base.entities, 200),
    },
  };
}

// Get mock cluster-wide metrics
export function getMockClusterMetrics() {
  const servers = getMockServers().filter((s) => s.health === "online");

  // Calculate averages
  const totalPlayers = servers.reduce((sum, s) => sum + s.playerCount, 0);
  const avgCpu = servers.reduce((sum, s) => {
    const metrics = getMockServerMetrics(s.instance);
    return sum + (metrics?.system.cpuUsage || 0);
  }, 0) / servers.length;

  const avgMemory = servers.reduce((sum, s) => {
    const metrics = getMockServerMetrics(s.instance);
    if (!metrics) return sum;
    return sum + (metrics.system.memoryUsed / metrics.system.memoryMax) * 100;
  }, 0) / servers.length;

  const avgTps = servers.reduce((sum, s) => {
    const metrics = getMockServerMetrics(s.instance);
    return sum + (metrics?.performance.tps || 0);
  }, 0) / servers.length;

  return {
    totalPlayers,
    onlineServers: servers.length,
    totalServers: MOCK_SERVERS.length,
    averages: {
      tps: parseFloat(avgTps.toFixed(2)),
      cpu: parseFloat(avgCpu.toFixed(2)),
      memory: parseFloat(avgMemory.toFixed(2)),
      loadedChunks: Math.floor(
        servers.reduce((sum, s) => {
          const metrics = getMockServerMetrics(s.instance);
          return sum + (metrics?.performance.loadedChunks || 0);
        }, 0) / servers.length,
      ),
    },
    timeSeries: {
      tps: generateTimeSeries(avgTps, 0.3),
      cpu: generateTimeSeries(avgCpu, 10),
      memory: generateTimeSeries(avgMemory, 5),
      playerCount: generateTimeSeries(totalPlayers, totalPlayers * 0.15),
    },
  };
}

// Get mock proxy metrics
export function getMockProxyMetrics() {
  const servers = getMockServers().filter((s) => s.health === "online");
  const totalPlayers = servers.reduce((sum, s) => sum + s.playerCount, 0);
  const maxPlayers = servers.reduce((sum, s) => sum + s.maxPlayers, 0);

  return {
    proxy: {
      type: "velocity",
      version: "3.3.0-SNAPSHOT",
      uptime: 1234567,
    },
    network: {
      totalPlayers,
      maxPlayers,
      onlineServers: servers.length,
      totalServers: MOCK_SERVERS.length,
    },
    performance: {
      connectionRate: parseFloat((Math.random() * 10 + 5).toFixed(2)), // 5-15 connections/min
      packetRate: Math.floor(Math.random() * 5000 + 10000), // 10k-15k packets/sec
      bandwidth: parseFloat((Math.random() * 50 + 100).toFixed(2)), // 100-150 MB/s
    },
    timeSeries: {
      playerCount: generateTimeSeries(totalPlayers, totalPlayers * 0.15),
      connectionRate: generateTimeSeries(8, 3),
      packetRate: generateTimeSeries(12500, 2000),
      bandwidth: generateTimeSeries(125, 25),
    },
  };
}
