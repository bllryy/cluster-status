export interface Metric {
  timestamp: Date;
  value: number;
  [key: string]: number | Date;
}

export interface MemoryDetails {
  total: Metric[];
  free: Metric[];
  available: Metric[];
  used: Metric[];
  cached: Metric[];
  buffers: Metric[];
}

export interface SwapDetails {
  total: Metric[];
  free: Metric[];
  used: Metric[];
}

export interface NodeDetails {
  details: {
    cpuModel?: string;
    cpuCores: number;
    totalMemory: number;
  };
  nodename: string;
}

export interface NodeDetailsMap {
  [instance: string]: NodeDetails;
}

export interface Node {
  scrapePool: string;
  scrapeUrl: string;
  globalUrl: string;
  health: string;
  labels: {
    instance: string;
    job: string;
    nodename: string;
  };
  lastError: string;
  lastScrape: string;
  lastScrapeDuration: number;
  uptime?: number;
  lastUptimeFetch?: number;
  details?: {
    cpuModel: string;
    cpuCores: number;
    totalMemory: number;
  };
}

export interface MergedNode extends Node {
  details: {
    cpuModel: string;
    cpuCores: number;
    totalMemory: number;
  };
  labels: {
    instance: string;
    job: string;
    nodename: string;
    displayName: string;
  };
}

export interface Metrics {
  cpu: Metric[];
  memory: Metric[];
  disk: Metric[];
  diskIO: Metric[];
  netIO: Metric[];
  uptime: number;
  memoryDetails?: MemoryDetails;
  swapDetails?: SwapDetails;
  loadAverage?: Metric[];
  cpuPerCore?: { [core: string]: Metric[] };
  // Minecraft-specific metrics
  tps?: Metric[];
  playerCount?: Metric[];
  loadedChunks?: Metric[];
  entities?: Metric[];
  tickTime?: Metric[];
  [key: string]:
    | Metric[]
    | number
    | MemoryDetails
    | SwapDetails
    | { [core: string]: Metric[] }
    | undefined;
}

export interface ClusterAverages {
  cpu: Metric[];
  memory: Metric[];
  disk: Metric[];
  diskIO: Metric[];
  netIO: Metric[];
  loadAverage: Metric[];
  [key: string]: Metric[];
}

export interface MetricCardData extends Metric {
  value: number;
  timestamp: Date;
}

export interface PrometheusResponse {
  data: {
    result: Array<{
      values: [number, string][];
    }>;
  };
}

// Minecraft-specific types

export type ServerType = "lobby" | "survival" | "creative" | "minigame" | "proxy";
export type ServerFilter = "all" | "lobby" | "survival" | "creative" | "minigame" | "proxy";

export interface MinecraftServer extends Node {
  instance: string;
  serverName: string;
  serverType: ServerType;
  health: "online" | "offline";
  playerCount: number;
  maxPlayers: number;
  version: string;
  onlineMode: boolean;
}

export interface MinecraftServerMetrics {
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

export interface ProxyMetrics {
  proxy: {
    type: string;
    version: string;
    uptime: number;
  };
  network: {
    totalPlayers: number;
    maxPlayers: number;
    onlineServers: number;
    totalServers: number;
  };
  performance: {
    connectionRate: number;
    packetRate: number;
    bandwidth: number;
  };
  timeSeries: {
    playerCount: Array<{ timestamp: number; value: number }>;
    connectionRate: Array<{ timestamp: number; value: number }>;
    packetRate: Array<{ timestamp: number; value: number }>;
    bandwidth: Array<{ timestamp: number; value: number }>;
  };
}

export interface ClusterMetrics {
  totalPlayers: number;
  onlineServers: number;
  totalServers: number;
  averages: {
    tps: number;
    cpu: number;
    memory: number;
    loadedChunks: number;
  };
  timeSeries: {
    tps: Array<{ timestamp: number; value: number }>;
    cpu: Array<{ timestamp: number; value: number }>;
    memory: Array<{ timestamp: number; value: number }>;
    playerCount: Array<{ timestamp: number; value: number }>;
  };
}
