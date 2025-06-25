"use client";

import { DashboardLayout } from "~/components/dashboard/DashboardLayout";

export default function NewsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">News</h1>
          <p className="text-gray-400">Stay updated with the latest financial news and market analysis.</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Financial News</h2>
          <p className="text-gray-400">News feed and analysis features coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
} 