# Status Dashboard

A real-time monitoring dashboard for server infrastructure. It provides performance and health metrics for your entire cluster and individual nodes.

## Features

- Real-time server monitoring with Prometheus integration
- CPU, memory, disk, and network I/O metrics
- Cluster-wide averages and individual node details
- Customizable time ranges for historical data
- Live status updates

## Configuration

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_METRICS_API_URL=http://your-prometheus-server:9090
```

This should point to your Prometheus instance that's collecting metrics from your servers via node_exporter.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.
