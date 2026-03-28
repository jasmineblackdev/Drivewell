import React from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  Activity,
  MapPin,
  TrendingUp,
  Clock,
  Target,
  AlertCircle,
  CheckCircle2,
  Bell,
  ClipboardCheck,
  Brain,
} from 'lucide-react'
import { mockUser, getDotReadinessStatus, mockWorkouts, calculateBMI, loadCheckIns, getCheckInStreak, getTodayStr } from '../data/mockData'
import { useOnboarding } from '../context/OnboardingContext'
import { useAuth } from '../context/AuthContext'

const DOT_MILESTONES = [90, 60, 30, 14, 7]

const ScoreBadge = ({ status, score }) => {
  const colors = {
    green:  { bg: '#dcfce7', text: '#15803d', border: '#86efac' },
    yellow: { bg: '#fef9c3', text: '#a16207', border: '#fde047' },
    red:    { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5' },
  }
  const c = colors[status]
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '999px',
      background: c.bg,
      border: `1.5px solid ${c.border}`,
    }}>
      {status === 'green'
        ? <CheckCircle2 size={20} color={c.text} />
        : <AlertCircle size={20} color={c.text} />
      }
      <span style={{ fontWeight: '700', fontSize: '16px', color: c.text }}>
        {score}/100 — {status === 'green' ? 'DOT Ready' : status === 'yellow' ? 'At Risk' : 'High Risk'}
      </span>
    </div>
  )
}

const Dashboard = () => {
  const { data: ob } = useOnboarding()
  const { user: authUser } = useAuth()
  const isPro = authUser?.subscriptionTier === 'driver_pro'

  const name            = ob.name            || mockUser.name
  const cdlNumber       = ob.cdlNumber       || mockUser.cdlNumber
  const dotPhysicalDate = ob.dotPhysicalDate || mockUser.dotPhysicalDate
  const weight          = Number(ob.weight)  || mockUser.metrics.weight
  const height          = Number(ob.height)  || mockUser.metrics.height
  const systolic        = Number(ob.systolic)  || mockUser.metrics.bloodPressure.systolic
  const diastolic       = Number(ob.diastolic) || mockUser.metrics.bloodPressure.diastolic
  const bloodGlucose    = Number(ob.bloodGlucose) || mockUser.metrics.bloodGlucose

  const metrics = {
    ...mockUser.metrics,
    weight,
    height,
    bloodPressure: { systolic, diastolic },
    bloodGlucose,
  }

  const checkIns       = loadCheckIns()
  const checkInStreak  = getCheckInStreak()
  const todayDone      = !!checkIns[getTodayStr()]

  const dotStatus   = getDotReadinessStatus(metrics, checkInStreak)
  const nextWorkout = mockWorkouts[0]
  const bmi         = calculateBMI(weight, height)

  const daysUntilDot = Math.ceil(
    (new Date(dotPhysicalDate) - new Date()) / (1000 * 60 * 60 * 24)
  )

  // Getting started checklist — shown until all steps complete
  const hasHealthRecord   = !!localStorage.getItem('dw_health_records')
  const hasDotReminder    = !!localStorage.getItem('dw_dot_reminders')
  const gsSteps = [
    { done: todayDone,       label: 'Complete your first daily check-in', path: '/checkin'        },
    { done: hasHealthRecord, label: 'Log a health reading (BP, glucose)',  path: '/health-history' },
    { done: hasDotReminder,  label: 'Set a DOT physical reminder',        path: '/dot-reminders'  },
  ]
  const gsAllDone  = gsSteps.every(s => s.done)
  const showGS     = checkInStreak === 0 && !gsAllDone

  // Milestone badges: show only upcoming ones within 90 days
  const activeMilestones = DOT_MILESTONES.filter(
    (d) => daysUntilDot <= d && daysUntilDot > 0
  )

  const bmiColor = bmi
    ? bmi < 25 ? '#15803d' : bmi < 30 ? '#a16207' : '#dc2626'
    : '#2563eb'

  const glucoseColor = bloodGlucose < 100 ? '#15803d' : bloodGlucose < 126 ? '#a16207' : '#dc2626'

  return (
    <div className="screen">
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
          Welcome back, {name.split(' ')[0]}
        </h1>
        <p style={{ color: '#6b7280' }}>CDL: {cdlNumber}</p>
      </header>

      {/* Getting Started Checklist */}
      {showGS && (
        <div className="card" style={{ border: '1.5px solid #bfdbfe', background: '#eff6ff', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <CheckCircle2 size={20} color="#2563eb" />
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1e40af' }}>Getting Started</h3>
            <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#3b82f6', fontWeight: '600' }}>
              {gsSteps.filter(s => s.done).length}/{gsSteps.length} done
            </span>
          </div>
          {gsSteps.map((s) => (
            <Link
              key={s.label}
              to={s.path}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', textDecoration: 'none', borderBottom: '1px solid #dbeafe', color: 'inherit' }}
            >
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${s.done ? '#16a34a' : '#93c5fd'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: s.done ? '#dcfce7' : 'white' }}>
                {s.done && <CheckCircle2 size={12} color="#16a34a" />}
              </div>
              <span style={{ fontSize: '14px', color: s.done ? '#6b7280' : '#1e40af', textDecoration: s.done ? 'line-through' : 'none', flex: 1 }}>{s.label}</span>
              {!s.done && <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: '600' }}>→</span>}
            </Link>
          ))}
        </div>
      )}

      {/* DOT Readiness Card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <Activity className={`status-${dotStatus.status}`} size={22} />
          <h2 style={{ marginLeft: '10px', fontSize: '18px', fontWeight: '600' }}>
            DOT Physical Status
          </h2>
        </div>

        <ScoreBadge status={dotStatus.status} score={dotStatus.score} />

        <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            {daysUntilDot > 0
              ? `Next physical in ${daysUntilDot} days`
              : 'DOT physical is overdue!'}
          </p>
          <Link to="/profile" className="btn-secondary" style={{ fontSize: '13px' }}>
            View Details
          </Link>
        </div>

        {/* DOT Milestone Countdown */}
        {activeMilestones.length > 0 && (
          <div style={{ marginTop: '14px', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Bell size={14} style={{ color: '#6b7280' }} />
              <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase' }}>
                Upcoming Milestones
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {activeMilestones.map((milestone) => (
                <span key={milestone} style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: daysUntilDot <= 14 ? '#fee2e2' : daysUntilDot <= 30 ? '#fef9c3' : '#dbeafe',
                  color: daysUntilDot <= 14 ? '#dc2626' : daysUntilDot <= 30 ? '#a16207' : '#1d4ed8',
                }}>
                  {milestone}-day mark
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Current Metrics — 4-cell grid */}
      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          Current Metrics
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#2563eb' }}>{weight}</p>
            <p style={{ color: '#6b7280', fontSize: '13px' }}>Weight (lbs)</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#2563eb' }}>
              {systolic}/{diastolic}
            </p>
            <p style={{ color: '#6b7280', fontSize: '13px' }}>Blood Pressure</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '22px', fontWeight: 'bold', color: bmiColor }}>
              {bmi ?? '—'}
            </p>
            <p style={{ color: '#6b7280', fontSize: '13px' }}>BMI</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '22px', fontWeight: 'bold', color: glucoseColor }}>
              {bloodGlucose}
            </p>
            <p style={{ color: '#6b7280', fontSize: '13px' }}>Glucose (mg/dL)</p>
          </div>
        </div>
      </div>

      {/* Suggested Workout */}
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
            {nextWorkout.duration} min • {nextWorkout.space.replace(/-/g, ' ')}
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

      {/* Check-In Card */}
      <Link to="/checkin" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ClipboardCheck size={22} style={{ color: '#2563eb', flexShrink: 0 }} />
          <div>
            <p style={{ fontWeight: '600', fontSize: '16px', marginBottom: '2px' }}>Daily Check-In</p>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>
              {todayDone ? 'Completed today!' : 'Not done yet today'}
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          {todayDone
            ? <CheckCircle2 size={24} color="#22c55e" />
            : (
              <div>
                <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#2563eb' }}>{checkInStreak}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>day streak</p>
              </div>
            )
          }
        </div>
      </Link>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Link to="/locations" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <MapPin size={20} style={{ color: '#2563eb' }} />
            <span style={{ marginLeft: '8px', fontWeight: '500' }}>Find Gyms</span>
          </div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Nearby locations</p>
        </Link>

        <Link to="/progress" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <TrendingUp size={20} style={{ color: '#2563eb' }} />
            <span style={{ marginLeft: '8px', fontWeight: '500' }}>Progress</span>
          </div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>View trends</p>
        </Link>

        <Link to="/mental-wellness" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Brain size={20} style={{ color: '#2563eb' }} />
            <span style={{ marginLeft: '8px', fontWeight: '500' }}>Mental Wellness</span>
          </div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Breathing & stress tips</p>
        </Link>

        <Link to="/achievements" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Target size={20} style={{ color: '#2563eb' }} />
            <span style={{ marginLeft: '8px', fontWeight: '500' }}>Achievements</span>
          </div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Badges & streaks</p>
        </Link>
      </div>

      {/* Upgrade Prompt (Free Users) */}
      {!isPro && (
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
