import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Dumbbell, 
  MapPin, 
  User, 
  Settings,
  Truck
} from 'lucide-react'

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
  { path: '/locations', icon: MapPin, label: 'Locations' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

const SidebarNav = () => {
  const location = useLocation()

  return (
    <aside className="sidebar-nav">
      {/* Brand */}
      <div className="sidebar-brand">
        <Truck size={26} className="sidebar-brand-icon" />
        <span className="sidebar-brand-name">DriveWell</span>
      </div>

      {/* Nav links */}
      <nav className="sidebar-links">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`sidebar-link ${location.pathname === path ? 'active' : ''}`}
          >
            <Icon size={20} />
            <span className="sidebar-link-label">{label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <p className="sidebar-footer-text">DriveWell v1.0</p>
      </div>
    </aside>
  )
}

export default SidebarNav
