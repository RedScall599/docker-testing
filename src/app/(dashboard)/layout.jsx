// Dashboard layout - Protected area
import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Home, Users, Gift, TrendingUp, CheckSquare, FolderTree, Workflow } from 'lucide-react'

const baseNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Donations', href: '/donations', icon: Gift },
  { name: 'Campaigns', href: '/campaigns', icon: TrendingUp },
  { name: 'Workflows', href: '/workflows', icon: Workflow },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
]

export default async function DashboardLayout({ children }) {
  // TODO: Get session user and redirect if not authenticated
  const user = await getSessionUser();
  if (!user) redirect('/login');

  // Build nav; show Donors link only to ADMINs
  const navigation = user?.role === 'ADMIN'
    ? [{ name: 'Donors', href: '/donors', icon: Users }, { name: 'Segments', href: '/segments', icon: FolderTree }, ...baseNavigation]
    : baseNavigation

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TODO: Implement navigation header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <nav className="flex gap-6">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <form action="/api/auth/logout" method="POST">
              <button type="submit" className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            </form>
          </div>
        </div>
      </header>
      {/* TODO: Implement main content area */}
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}