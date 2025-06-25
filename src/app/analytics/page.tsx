"use client";

import { DashboardLayout } from "~/components/dashboard/DashboardLayout";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">Deep dive into your portfolio performance and market insights.</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Performance Analytics</h2>
          <p className="text-gray-400">Advanced analytics features coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
} 