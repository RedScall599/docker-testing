// Workflows API - Individual Operations
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET(request, { params }) {
  try {
    // TODO: Get workflow by ID
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = params
    const { prisma } = await import('@/lib/db')
    const workflow = await prisma.workflow.findUnique({
      where: { id, organizationId: session.user.organizationId }
    })
    if (!workflow) {
      return NextResponse.json({ error: 'Workflow not found' }, { status: 404 })
    }
    return NextResponse.json({ workflow })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}


export async function PATCH(request, { params }) {
  try {
    // TODO: Update workflow
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = params
    const data = await request.json()
    // Optionally: validate data here (e.g., with Zod)
    const { prisma } = await import('@/lib/db')
    const updated = await prisma.workflow.update({
      where: { id, organizationId: session.user.organizationId },
      data
    })
    return NextResponse.json({ workflow: updated })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}


export async function DELETE(request, { params }) {
  try {
    // TODO: Delete workflow
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = params
    const { prisma } = await import('@/lib/db')
    await prisma.workflow.delete({
      where: { id, organizationId: session.user.organizationId }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

