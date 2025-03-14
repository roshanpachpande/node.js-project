export interface Pipeline {
  id: string;
  name: string;
  status: 'success' | 'running' | 'failed';
  startTime: Date;
  duration: number;
  stages: Stage[];
}

export interface Stage {
  name: string;
  status: 'success' | 'running' | 'failed';
  duration: number;
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}