"use client"
import React from 'react'
// Workflows page
export default function WorkflowsPage() {
  // Automation Workflows state
  const [workflows, setWorkflows] = React.useState([
    { id: 1, name: 'Welcome New Donor', enabled: true, steps: 3 },
    { id: 2, name: 'Lapsed Donor Re-engagement', enabled: false, steps: 4 },
  ]);
  const [newWorkflow, setNewWorkflow] = React.useState('');

  function addWorkflow(e) {
    e.preventDefault();
    if (!newWorkflow) return;
    setWorkflows([
      ...workflows,
      {
        id: Date.now(),
        name: newWorkflow,
        enabled: false,
        steps: 0,
      },
    ]);
    setNewWorkflow('');
  }

  function toggleWorkflow(id) {
    setWorkflows(wfs =>
      wfs.map(wf =>
        wf.id === id ? { ...wf, enabled: !wf.enabled } : wf
      )
    );
  }

  function removeWorkflow(id) {
    setWorkflows(wfs => wfs.filter(wf => wf.id !== id));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Automation Workflows</h1>
      <form className="flex gap-2 items-end" onSubmit={addWorkflow}>
        <div>
          <label className="block text-sm font-medium">Workflow Name</label>
          <input
            className="border rounded px-3 py-2"
            type="text"
            value={newWorkflow}
            onChange={e => setNewWorkflow(e.target.value)}
            placeholder="Enter a new workflow..."
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Add Workflow
        </button>
      </form>
      <ul className="space-y-2">
        {workflows.length === 0 && <li className="text-gray-500">No workflows yet.</li>}
        {workflows.map(wf => (
          <li key={wf.id} className="flex items-center gap-3 border rounded px-3 py-2">
            <span className="font-medium">{wf.name}</span>
            <span className="text-xs text-gray-500">Steps: {wf.steps}</span>
            <span className={wf.enabled ? 'text-green-600' : 'text-gray-400'}>
              {wf.enabled ? 'Enabled' : 'Disabled'}
            </span>
            <button
              className="ml-2 text-blue-600 hover:underline"
              onClick={() => toggleWorkflow(wf.id)}
            >
              {wf.enabled ? 'Disable' : 'Enable'}
            </button>
            <button
              className="ml-auto text-red-600 hover:underline"
              onClick={() => removeWorkflow(wf.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
