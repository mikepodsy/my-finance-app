"use client";

import { DashboardLayout } from "~/components/dashboard/DashboardLayout";

export default function AlertsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Alerts</h1>
          <p className="text-gray-400">Manage your impact alerts and notification settings.</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Impact Alerts</h2>
          <p className="text-gray-400">Alert management features coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
} 