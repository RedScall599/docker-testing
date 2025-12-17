/**
 * Workflow Form Component
 * TODO: Implement form for creating/editing automated workflows
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createWorkflowSchema } from '@/lib/validation/workflow-schema'

export function WorkflowForm({ workflow, onSubmit, onCancel }) {
  // ...existing code...
  // Use imported schema
  const schema = createWorkflowSchema

  // Initialize form with react-hook-form and zod resolver
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: workflow ? {
      name: workflow.name || '',
      description: workflow.description || '',
      isActive: workflow.isActive !== undefined ? workflow.isActive : true,
      triggerType: workflow.triggerType || 'DONATION_RECEIVED',
      conditions: workflow.conditions || {},
      actions: workflow.actions || [],
    } : {
      name: '',
      description: '',
      isActive: true,
      triggerType: 'DONATION_RECEIVED',
      conditions: {},
      actions: [],
    }
  })

  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState(null)

  // Form submission handler
  const handleSubmit = async (data) => {
    setLoading(true)
    setFormError(null)
    try {
      await onSubmit(data)
    } catch (err) {
      setFormError(err?.message || 'Failed to submit workflow')
    } finally {
      setLoading(false)
    }
  }

  // Dynamic action builder state
  const [actions, setActions] = useState(form.watch('actions') || [])

  // Add action handler
  const addAction = (type) => {
    let newAction = { type }
    if (type === 'EMAIL') newAction = { ...newAction, template: '', delay: 0 }
    if (type === 'TASK_CREATE') newAction = { ...newAction, taskName: '', dueDays: 1 }
    if (type === 'SEGMENT_ADD') newAction = { ...newAction, segmentId: '' }
    setActions([...actions, newAction])
    form.setValue('actions', [...actions, newAction])
  }

  // Remove action handler
  const removeAction = (idx) => {
    const updated = actions.filter((_, i) => i !== idx)
    setActions(updated)
    form.setValue('actions', updated)
  }

  // Update action handler
  const updateAction = (idx, field, value) => {
    const updated = actions.map((a, i) => i === idx ? { ...a, [field]: value } : a)
    setActions(updated)
    form.setValue('actions', updated)
  }

  // Watch triggerType for conditional logic
  const triggerType = form.watch('triggerType')

  // Preview capability (simple JSON preview)
  const [showPreview, setShowPreview] = useState(false)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Workflow name" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Description (optional)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Active</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="triggerType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trigger Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DONATION_RECEIVED">Donation Received</SelectItem>
                    <SelectItem value="FIRST_DONATION">First Donation</SelectItem>
                    <SelectItem value="RECURRING_DONATION">Recurring Donation</SelectItem>
                    <SelectItem value="SEGMENT_CHANGE">Segment Change</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Conditional logic for triggerType */}
        {triggerType === 'SEGMENT_CHANGE' && (
          <FormField
            control={form.control}
            name="conditions.segmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segment ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Segment ID" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {/* Dynamic Action Builder */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Actions</span>
            <Select onValueChange={addAction}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Add Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EMAIL">Email</SelectItem>
                <SelectItem value="TASK_CREATE">Create Task</SelectItem>
                <SelectItem value="SEGMENT_ADD">Add to Segment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {actions.length === 0 && <div className="text-sm text-muted-foreground">No actions added.</div>}
          {actions.map((action, idx) => (
            <div key={idx} className="border rounded p-3 mb-2 bg-muted">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{action.type}</span>
                <Button type="button" size="sm" variant="destructive" onClick={() => removeAction(idx)}>
                  Remove
                </Button>
              </div>
              {action.type === 'EMAIL' && (
                <>
                  <Input
                    value={action.template}
                    onChange={e => updateAction(idx, 'template', e.target.value)}
                    placeholder="Email template name"
                    className="mb-2"
                  />
                  <Input
                    type="number"
                    value={action.delay}
                    onChange={e => updateAction(idx, 'delay', Number(e.target.value))}
                    placeholder="Delay (days)"
                  />
                </>
              )}
              {action.type === 'TASK_CREATE' && (
                <>
                  <Input
                    value={action.taskName}
                    onChange={e => updateAction(idx, 'taskName', e.target.value)}
                    placeholder="Task name"
                    className="mb-2"
                  />
                  <Input
                    type="number"
                    value={action.dueDays}
                    onChange={e => updateAction(idx, 'dueDays', Number(e.target.value))}
                    placeholder="Due in (days)"
                  />
                </>
              )}
              {action.type === 'SEGMENT_ADD' && (
                <Input
                  value={action.segmentId}
                  onChange={e => updateAction(idx, 'segmentId', e.target.value)}
                  placeholder="Segment ID"
                />
              )}
            </div>
          ))}
        </div>
        {/* Form error display */}
        {formError && <div className="text-destructive text-sm">{formError}</div>}
        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Workflow'}</Button>
          <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>Cancel</Button>
          <Button type="button" variant="outline" onClick={() => setShowPreview(v => !v)}>
            {showPreview ? 'Hide Preview' : 'Preview'}
          </Button>
        </div>
        {/* Preview/testing capability */}
        {showPreview && (
          <pre className="bg-muted p-3 rounded mt-4 text-xs overflow-x-auto">
            {JSON.stringify(form.getValues(), null, 2)}
          </pre>
        )}
      </form>
    </Form>
  )
}

// TODO: Example usage:
// <WorkflowForm 
//   workflow={editingWorkflow} 
//   onSubmit={handleCreateWorkflow}
//   onCancel={() => setShowForm(false)}
// />