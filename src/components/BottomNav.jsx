import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Dumbbell, 
  MapPin, 
  User, 
  Settings 
} from 'lucide-react'

const BottomNav = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
    { path: '/locations', icon: MapPin, label: 'Locations' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <nav style={styles.nav}>
      {navItems.map(({ path, icon: Icon, label }) => (
        <Link
          key={path}
          to={path}
          style={{
            ...styles.navItem,
            color: location.pathname === path ? '#2563eb' : '#6b7280'
          }}
        >
          <Icon size={20} />
          <span style={styles.navLabel}>{label}</span>
        </Link>
      ))}
    </nav>
  )
}

const styles = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '480px',
    background: 'white',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '8px 0',
    zIndex: 100,
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    padding: '8px',
  },
  navLabel: {
    fontSize: '11px',
    marginTop: '4px',
    fontWeight: '500',
  }
}

export default BottomNav