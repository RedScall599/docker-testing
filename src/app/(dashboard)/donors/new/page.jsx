'use client'

// New donor form page

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// TODO: Use React Hook Form with Zod validation
const donorSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  status: z.string().optional(),
});

export default function NewDonorPage() {
  // TODO: Implement donor creation form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(donorSchema),
    defaultValues: { name: '', email: '', status: '' },
  });

  // TODO: Handle form submission and API calls
  const [submitError, setSubmitError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  async function onSubmit(data) {
    setSubmitError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/donors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Failed to create donor');
      }
      setSuccess(true);
      reset();
    } catch (err) {
      setSubmitError(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Donor</h1>
        <p className="text-gray-600 mt-2">
          Create a new donor profile
        </p>
      </div>

      {/* TODO: Implement donor form component */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block font-medium">Name</label>
          <input
            className="border rounded px-3 py-2 w-full"
            type="text"
            {...register('name')}
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            className="border rounded px-3 py-2 w-full"
            type="email"
            {...register('email')}
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block font-medium">Status</label>
          <input
            className="border rounded px-3 py-2 w-full"
            type="text"
            {...register('status')}
          />
        </div>
        {submitError && <p className="text-red-600 text-sm">{submitError}</p>}
        {success && <p className="text-green-600 text-sm">Donor created successfully!</p>}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Add Donor'}
        </button>
      </form>
    </div>
  );
}