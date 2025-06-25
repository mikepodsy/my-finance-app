"use client";

import { DashboardLayout } from "~/components/dashboard/DashboardLayout";

export default function PortfolioPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
          <p className="text-gray-400">Manage your investments and track performance.</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Portfolio Overview</h2>
          <p className="text-gray-400">Portfolio management features coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
} 