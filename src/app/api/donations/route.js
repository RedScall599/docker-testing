// Donations API - List and Create
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET(request) {
  try {
    // TODO: Get and validate session
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!session.user || !session.user.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // TODO: Query donations with filtering/pagination
    const searchParams = request.nextUrl?.searchParams ?? new URL(request.url).searchParams
    const pageRaw = searchParams.get('page') || '1'
    const pageSizeRaw = searchParams.get('pageSize') || '20'
    const page = Number.isFinite(Number(pageRaw)) ? parseInt(pageRaw, 10) : 1
    const pageSize = Number.isFinite(Number(pageSizeRaw)) ? parseInt(pageSizeRaw, 10) : 20
    const skip = (page - 1) * pageSize
    const take = pageSize

    const { prisma } = await import('@/lib/db')
    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where: { donor: { organizationId: session.user.organizationId } },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: { donor: true, campaign: true }
      }),
      prisma.donation.count({ where: { donor: { organizationId: session.user.organizationId } } })
    ])

    // TODO: Return donations list
    return NextResponse.json({ donations, total, page, pageSize })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}


export async function POST(request) {
  try {
    // TODO: Get and validate session
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // TODO: Check permissions (ADMIN, STAFF)
    const allowedRoles = ['ADMIN', 'STAFF']
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // TODO: Create donation and update donor metrics
    const data = await request.json()
    // Optionally: validate data here (e.g., with Zod)
    const { prisma } = await import('@/lib/db')
    const donation = await prisma.donation.create({
      data: {
        ...data,
        organizationId: session.user.organizationId
      }
    })
    // Update donor metrics (totalAmount, totalGifts, lastGiftDate)
    if (donation.donorId) {
      await prisma.donor.update({
        where: { id: donation.donorId, organizationId: session.user.organizationId },
        data: {
          totalAmount: { increment: donation.amount },
          totalGifts: { increment: 1 },
          lastGiftDate: donation.date
        }
      })
    }

    // TODO: Return created donation
    return NextResponse.json({ donation })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

