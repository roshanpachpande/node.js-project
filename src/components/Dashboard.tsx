import React from 'react';
import { Activity, Box, Cpu, Server } from 'lucide-react';
import { format } from 'date-fns';
import { Pipeline, SystemMetrics } from '../types';

const mockPipeline: Pipeline = {
  id: '1',
  name: 'Main Pipeline',
  status: 'running',
  startTime: new Date(),
  duration: 360,
  stages: [
    { name: 'Build', status: 'success', duration: 120 },
    { name: 'Test', status: 'running', duration: 240 },
    { name: 'Deploy', status: 'running', duration: 0 },
  ],
};

const mockMetrics: SystemMetrics = {
  cpu: 45,
  memory: 68,
  disk: 72,
  network: 30,
};

const MetricCard = ({ title, value, icon: Icon }: { title: string; value: number; icon: React.ElementType }) => (
  <div className="bg-white rounded-lg p-6 shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}%</p>
      </div>
      <Icon className="w-8 h-8 text-blue-500" />
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: Pipeline['status'] }) => {
  const colors = {
    success: 'bg-green-100 text-green-800',
    running: 'bg-blue-100 text-blue-800',
    failed: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">DevOps Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-500" />
            <span className="text-green-700">System Online</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard title="CPU Usage" value={mockMetrics.cpu} icon={Cpu} />
          <MetricCard title="Memory Usage" value={mockMetrics.memory} icon={Box} />
          <MetricCard title="Disk Usage" value={mockMetrics.disk} icon={Server} />
          <MetricCard title="Network Load" value={mockMetrics.network} icon={Activity} />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Latest Pipeline</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">{mockPipeline.name}</h3>
                <p className="text-sm text-gray-500">
                  Started {format(mockPipeline.startTime, 'MMM d, HH:mm')}
                </p>
              </div>
              <StatusBadge status={mockPipeline.status} />
            </div>

            <div className="space-y-2">
              {mockPipeline.stages.map((stage, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-24">
                    <p className="text-sm font-medium">{stage.name}</p>
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        stage.status === 'success'
                          ? 'bg-green-500'
                          : stage.status === 'running'
                          ? 'bg-blue-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${(stage.duration / mockPipeline.duration) * 100}%` }}
                    />
                  </div>
                  <div className="w-20 text-right">
                    <p className="text-sm text-gray-500">{stage.duration}s</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}