"use client"
import React from 'react'

// Campaigns list page  
// TODO: Implement campaigns management

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    setLoading(true)
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(data => {
        setCampaigns(data.campaigns || [])
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load campaigns.')
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading campaigns...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div>
      <h1>Campaigns</h1>
      {campaigns.length === 0 ? (
        <div>No campaigns found.</div>
      ) : (
        <ul className="mt-4 space-y-2">
          {campaigns.map(campaign => (
            <li key={campaign.id} className="border rounded px-4 py-2">
              <div className="font-semibold">{campaign.name}</div>
              <div className="text-sm text-gray-600">{campaign.status}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
