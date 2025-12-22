/**
 * Donor Form Component 
 * TODO: Implement form for creating/editing donors
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { createDonorSchema } from '@/lib/validation/donor-schema'

export function DonorForm({ donor, onSubmit, onCancel }) {
  // TODO: Import and use donor validation schema

  const schema = createDonorSchema // TODO: Import from validation
  
  // TODO: Initialize form with react-hook-form and zod resolver
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: donor || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
      status: 'ACTIVE',
      retentionRisk: 'LOW',
      notes: '',
    },
  });

  // TODO: Implement form submission handler
  const handleSubmit = async (data) => {
    // TODO: Call onSubmit prop with form data
    try {
      await onSubmit(data);
      reset();
    } catch (err) {
      // TODO: Handle form errors
      // For now, just log
      console.error(err);
    }
  }

  return (
    <Form onSubmit={rhfHandleSubmit(handleSubmit)}>
      {/* TODO: Implement donor form with fields: */}
      <FormField name="firstName" control={register('firstName')}>
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input {...register('firstName')} />
          </FormControl>
          <FormMessage>{errors.firstName?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="lastName" control={register('lastName')}>
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input {...register('lastName')} />
          </FormControl>
          <FormMessage>{errors.lastName?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="email" control={register('email')}>
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" {...register('email')} />
          </FormControl>
          <FormMessage>{errors.email?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="phone" control={register('phone')}>
        <FormItem>
          <FormLabel>Phone</FormLabel>
          <FormControl>
            <Input {...register('phone')} />
          </FormControl>
          <FormMessage>{errors.phone?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="address.street" control={register('address.street')}>
        <FormItem>
          <FormLabel>Street Address</FormLabel>
          <FormControl>
            <Input {...register('address.street')} />
          </FormControl>
          <FormMessage>{errors.address?.street?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="address.city" control={register('address.city')}>
        <FormItem>
          <FormLabel>City</FormLabel>
          <FormControl>
            <Input {...register('address.city')} />
          </FormControl>
          <FormMessage>{errors.address?.city?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="address.state" control={register('address.state')}>
        <FormItem>
          <FormLabel>State</FormLabel>
          <FormControl>
            <Input {...register('address.state')} />
          </FormControl>
          <FormMessage>{errors.address?.state?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="address.zip" control={register('address.zip')}>
        <FormItem>
          <FormLabel>Zip Code</FormLabel>
          <FormControl>
            <Input {...register('address.zip')} />
          </FormControl>
          <FormMessage>{errors.address?.zip?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="status" control={register('status')}>
        <FormItem>
          <FormLabel>Status</FormLabel>
          <FormControl>
            <select {...register('status')} className="border rounded px-3 py-2 w-full">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="LAPSED">Lapsed</option>
              <option value="DO_NOT_CONTACT">Do Not Contact</option>
            </select>
          </FormControl>
          <FormMessage>{errors.status?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="retentionRisk" control={register('retentionRisk')}>
        <FormItem>
          <FormLabel>Retention Risk</FormLabel>
          <FormControl>
            <select {...register('retentionRisk')} className="border rounded px-3 py-2 w-full">
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </FormControl>
          <FormMessage>{errors.retentionRisk?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="notes" control={register('notes')}>
        <FormItem>
          <FormLabel>Notes</FormLabel>
          <FormControl>
            <textarea {...register('notes')} className="border rounded px-3 py-2 w-full" rows={3} />
          </FormControl>
          <FormMessage>{errors.notes?.message}</FormMessage>
        </FormItem>
      </FormField>

      {/* TODO: Add form validation and error handling */}
      {Object.keys(errors).length > 0 && (
        <div className="text-red-600 text-sm mb-2">Please fix the errors above.</div>
      )}

      {/* TODO: Add submit and cancel buttons */}
      <div className="flex gap-2 mt-4">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Submit'}</Button>
        {onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>}
      </div>

      {/* TODO: Handle loading state during submission */}
      {isSubmitting && <div className="text-gray-500 mt-2">Submitting...</div>}
    </Form>
  )
}

// TODO: Example usage:
// <DonorForm 
//   donor={editingDonor} 
//   onSubmit={handleCreateDonor}
//   onCancel={() => setShowForm(false)}
// />
