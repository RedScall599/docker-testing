// Workflows API - List and Create
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET(request) {
  try {
    // TODO: List workflows with filtering
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { prisma } = await import('@/lib/db')
    const workflows = await prisma.workflow.findMany({
      where: { organizationId: session.user.organizationId },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ workflows })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}


export async function POST(request) {
  try {
    // TODO: Create workflow
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const data = await request.json()
    // Optionally: validate data here (e.g., with Zod)
    const { prisma } = await import('@/lib/db')
    const workflow = await prisma.workflow.create({
      data: {
        ...data,
        organizationId: session.user.organizationId
      }
    })
    return NextResponse.json({ workflow })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

