import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Dumbbell, 
  MapPin, 
  User, 
  Settings 
} from 'lucide-react'

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
  { path: '/locations', icon: MapPin, label: 'Locations' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

const BottomNav = () => {
  const location = useLocation()

  return (
    <nav className="bottom-nav">
      {navItems.map(({ path, icon: Icon, label }) => (
        <Link
          key={path}
          to={path}
          className={`bottom-nav-item ${location.pathname === path ? 'active' : ''}`}
        >
          <Icon size={20} />
          <span className="bottom-nav-label">{label}</span>
        </Link>
      ))}
    </nav>
  )
}

export default BottomNav
