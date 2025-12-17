// New donation form page
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function NewDonationPage() {
  // TODO: Implement donation creation form
  const [amount, setAmount] = useState('')
  const [donorId, setDonorId] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // For simplicity, donorId is a text input. In a real app, use a select with donor names.
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (!amount || !donorId || !date) {
      setError('All fields are required.')
      setLoading(false)
      return
    }
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount), donorId, date })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to create donation.')
      } else {
        router.push('/donations')
      }
    } catch (err) {
      setError('Failed to create donation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Record New Donation</h1>
      {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          placeholder="Donor ID"
          value={donorId}
          onChange={e => setDonorId(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          type="date"
          placeholder="Date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          disabled={loading}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Saving...' : 'Save Donation'}
        </Button>
      </form>
    </div>
  )
}
