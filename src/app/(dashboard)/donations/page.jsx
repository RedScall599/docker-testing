"use client"
import React from 'react'
// Donations list page
export default function DonationsPage() {
  const [donations, setDonations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

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
      <h1>Donations</h1>
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
                <td colSpan={4} style={{ textAlign: 'center', padding: 16 }}>No donations found.</td>
              </tr>
            ) : (
              donations.map((donation) => (
                <tr key={donation.id}>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{donation.donor?.name || 'Unknown'}</td>
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
