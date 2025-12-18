import { getSessionUser } from '@/lib/session'
import RetentionChart from '@/components/charts/retention-chart'

export default async function DashboardPage() {
  // TODO: Get session user
  const user = await getSessionUser()
  if (!user) {
    // Optionally: redirect('/login')
    return <div>Unauthorized</div>
  }

  // TODO: Fetch dashboard metrics (total donors, donations, at-risk donors, etc.)
  // Replace with real API/database calls as needed
  const metrics = {
    totalDonors: 75,
    totalDonations: 200,
    atRiskDonors: 12,
    totalAmount: 50000,
    retentionRate: 0.68,
    retentionHistory: [0.55, 0.58, 0.61, 0.6, 0.63, 0.65, 0.66, 0.64, 0.67, 0.68, 0.69, 0.68],
    retentionLabels: getLast12MonthLabels()
  }
  // TODO: Render dashboard cards with key metrics
  // TODO: Add charts/visualizations for retention data
  // TODO: Show recent activity and alerts

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to your donor retention platform
        </p>
      </div>

      {/* Dashboard metrics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-lg font-semibold">Total Donors</div>
          <div className="text-2xl font-bold">{metrics.totalDonors}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-lg font-semibold">Total Donations</div>
          <div className="text-2xl font-bold">{metrics.totalDonations}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-lg font-semibold">At-Risk Donors</div>
          <div className="text-2xl font-bold">{metrics.atRiskDonors}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-lg font-semibold">Total Raised</div>
          <div className="text-2xl font-bold">${metrics.totalAmount.toLocaleString()}</div>
        </div>
      </div>

      {/* Charts/visualizations for retention data */}
      <div className="bg-white rounded shadow p-4 mt-8">
        <div className="flex items-end justify-between mb-1">
          <div className="font-semibold">Retention Rate</div>
          <div className="text-2xl font-bold">{(metrics.retentionRate * 100).toFixed(1)}%</div>
        </div>
        <p className="text-sm text-gray-500 mb-2">Monthly donor retention over the last 12 months</p>
        <RetentionChart data={metrics.retentionHistory} labels={metrics.retentionLabels} seriesLabel="Monthly retention rate" />
      </div>

      

      {/* Recent activity and alerts */}
      <div className="bg-white rounded shadow p-4 mt-8">
        <div className="font-semibold mb-2">Recent Activity</div>
        <div className="text-gray-500">[Recent activity will appear here]</div>
      </div>
    </div>
  )
}

// Helpers
function getLast12MonthLabels() {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now = new Date()
  const out = []
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    out.push(months[d.getMonth()])
  }
  return out
}