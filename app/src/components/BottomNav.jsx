import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Dumbbell,
  Utensils,
  Users,
  User,
} from 'lucide-react'

const navItems = [
  { path: '/',          icon: Home,      label: 'Home'      },
  { path: '/workouts',  icon: Dumbbell,  label: 'Workouts'  },
  { path: '/nutrition', icon: Utensils,  label: 'Nutrition' },
  { path: '/trainers',  icon: Users,     label: 'Trainers'  },
  { path: '/profile',   icon: User,      label: 'Profile'   },
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
