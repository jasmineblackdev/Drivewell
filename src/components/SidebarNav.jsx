import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Dumbbell,
  MapPin,
  User,
  Settings,
  TrendingUp,
  Truck,
  ClipboardCheck,
  Trophy,
  Watch,
  Brain,
  HeartPulse,
  Utensils,
  Moon,
  Users,
  Zap,
} from 'lucide-react'

const navItems = [
  { path: '/',               icon: Home,           label: 'Dashboard'      },
  { path: '/workouts',       icon: Dumbbell,       label: 'Workouts'       },
  { path: '/checkin',        icon: ClipboardCheck, label: 'Check-In'       },
  { path: '/nutrition',      icon: Utensils,       label: 'Nutrition'      },
  { path: '/sleep-health',   icon: Moon,           label: 'Sleep Health'   },
  { path: '/progress',       icon: TrendingUp,     label: 'Progress'       },
  { path: '/locations',      icon: MapPin,         label: 'Locations'      },
  { path: '/trainers',       icon: Users,          label: 'Find a Trainer' },
  { path: '/mental-wellness',icon: Brain,          label: 'Mental Wellness'},
  { path: '/telehealth',     icon: HeartPulse,     label: 'Telehealth'     },
  { path: '/wearables',      icon: Watch,          label: 'Wearables'      },
  { path: '/achievements',   icon: Trophy,         label: 'Achievements'   },
  { path: '/profile',        icon: User,           label: 'Profile'        },
  { path: '/pricing',        icon: Zap,            label: 'Upgrade to Pro' },
  { path: '/settings',       icon: Settings,       label: 'Settings'       },
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
