"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
// Donations list page
export default function DonationsPage() {
  const [donations, setDonations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const router = useRouter();

  React.useEffect(() => {
    async function fetchDonations() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/donations');
        if (!res.ok) throw new Error('Failed to fetch donations');
        const data = await res.json();
        setDonations(data.donations || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDonations();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Donations</h1>
        <Button onClick={() => router.push('/donations/new')}>Add Donation</Button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Donor</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Amount</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Date</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {donations.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: 16 }}>
                  No donations found.{' '}
                  <Link href="/donations/new" style={{ color: '#2563eb' }}>Record one now</Link>
                </td>
              </tr>
            ) : (
              donations.map((donation) => (
                <tr key={donation.id}>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>
                    {([donation.donor?.firstName, donation.donor?.lastName].filter(Boolean).join(' ')) || 'Unknown'}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>${donation.amount}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{donation.date ? new Date(donation.date).toLocaleDateString() : ''}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{donation.type || ''}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
