import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Activity, 
  MapPin, 
  TrendingUp,
  Clock,
  Target
} from 'lucide-react'
import { mockUser, getDotReadinessStatus, mockWorkouts } from '../data/mockData'
import { useOnboarding } from '../context/OnboardingContext'

const Dashboard = () => {
  const { data: ob } = useOnboarding()

  // Prefer onboarding data, fall back to mock defaults
  const name           = ob.name           || mockUser.name
  const cdlNumber      = ob.cdlNumber      || mockUser.cdlNumber
  const dotPhysicalDate = ob.dotPhysicalDate || mockUser.dotPhysicalDate
  const weight         = ob.weight         || mockUser.metrics.weight
  const systolic       = ob.systolic       || mockUser.metrics.bloodPressure.systolic
  const diastolic      = ob.diastolic      || mockUser.metrics.bloodPressure.diastolic

  const metrics = {
    ...mockUser.metrics,
    weight,
    bloodPressure: { systolic: Number(systolic), diastolic: Number(diastolic) },
  }

  const dotStatus   = getDotReadinessStatus(metrics)
  const nextWorkout = mockWorkouts[0]

  const daysUntilDot = Math.ceil(
    (new Date(dotPhysicalDate) - new Date()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="screen">
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
          Welcome back, {name.split(' ')[0]}
        </h1>
        <p style={{ color: '#6b7280' }}>
          CDL: {cdlNumber}
        </p>
      </header>

      {/* DOT Readiness Card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Activity className={`status-${dotStatus.status}`} size={24} />
          <h2 style={{ marginLeft: '12px', fontSize: '20px', fontWeight: '600' }}>
            DOT Physical Status
          </h2>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p className={`status-${dotStatus.status}`} style={{ fontSize: '18px', fontWeight: '600' }}>
              {dotStatus.message}
            </p>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Next physical in {daysUntilDot} days
            </p>
          </div>
          <Link to="/profile" className="btn-secondary">
            View Details
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          Current Metrics
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
              {metrics.weight}
            </p>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Weight (lbs)</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
              {metrics.bloodPressure.systolic}/{metrics.bloodPressure.diastolic}
            </p>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Blood Pressure</p>
          </div>
        </div>
      </div>

      {/* Quick Workout */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Target size={20} style={{ color: '#2563eb' }} />
          <h3 style={{ marginLeft: '8px', fontSize: '18px', fontWeight: '600' }}>
            Suggested Workout
          </h3>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>
            {nextWorkout.title}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '14px' }}>
            <Clock size={16} style={{ marginRight: '4px' }} />
            {nextWorkout.duration} min • {nextWorkout.space.replace('-', ' ')}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/workouts" className="btn-primary" style={{ flex: 1, textAlign: 'center' }}>
            Start Workout
          </Link>
          <Link to="/workouts" className="btn-secondary">
            View All
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Link to="/locations" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <MapPin size={20} style={{ color: '#2563eb' }} />
            <span style={{ marginLeft: '8px', fontWeight: '500' }}>Find Gyms</span>
          </div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Nearby locations</p>
        </Link>

        <Link to="/profile" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <TrendingUp size={20} style={{ color: '#2563eb' }} />
            <span style={{ marginLeft: '8px', fontWeight: '500' }}>Track Health</span>
          </div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Update metrics</p>
        </Link>
      </div>

      {/* Upgrade Prompt (Free Users) */}
      {mockUser.subscription === 'free' && (
        <div className="card" style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)', color: 'white' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
            Upgrade to Premium
          </h3>
          <p style={{ fontSize: '14px', marginBottom: '16px', opacity: 0.9 }}>
            Unlock full workout library, DOT reminders, and personalized plans
          </p>
          <button className="btn-secondary" style={{ background: 'white', color: '#2563eb' }}>
            Learn More
          </button>
        </div>
      )}
    </div>
  )
}

export default Dashboard