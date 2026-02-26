import React, { useState } from 'react'
import { 
  Clock, 
  MapPin, 
  Target,
  Filter,
  Play,
  Star
} from 'lucide-react'
import { mockWorkouts, getWorkoutFilters, mockUser } from '../data/mockData'

const Workouts = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    duration: null,
    space: null,
    dotGoal: null
  })
  const [showFilters, setShowFilters] = useState(false)

  const filters = getWorkoutFilters()

  const filteredWorkouts = mockWorkouts.filter(workout => {
    if (selectedFilters.duration && workout.duration !== selectedFilters.duration) return false
    if (selectedFilters.space && workout.space !== selectedFilters.space) return false
    if (selectedFilters.dotGoal && workout.dotGoal !== selectedFilters.dotGoal) return false
    return true
  })

  // Limit free users to first 2 workouts
  const availableWorkouts = mockUser.subscription === 'free' 
    ? filteredWorkouts.slice(0, 2)
    : filteredWorkouts

  const lockedWorkouts = mockUser.subscription === 'free'
    ? filteredWorkouts.slice(2)
    : []

  const clearFilters = () => {
    setSelectedFilters({ duration: null, space: null, dotGoal: null })
  }

  return (
    <div className="screen">
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
          Workouts
        </h1>
        <p style={{ color: '#6b7280' }}>
          Designed for truck drivers on the road
        </p>
      </header>

      {/* Filter Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Filter size={16} style={{ marginRight: '8px' }} />
            Filters
          </button>
          
          {Object.values(selectedFilters).some(Boolean) && (
            <button onClick={clearFilters} style={{ color: '#2563eb', background: 'none', border: 'none' }}>
              Clear all
            </button>
          )}
        </div>

        {showFilters && (
          <div className="card" style={{ marginBottom: '16px' }}>
            {/* Duration Filter */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontWeight: '500', marginBottom: '8px' }}>Duration</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {filters.duration.map(duration => (
                  <button
                    key={duration}
                    onClick={() => setSelectedFilters(prev => ({ 
                      ...prev, 
                      duration: prev.duration === duration ? null : duration 
                    }))}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      background: selectedFilters.duration === duration ? '#2563eb' : 'white',
                      color: selectedFilters.duration === duration ? 'white' : '#374151',
                      fontSize: '14px'
                    }}
                  >
                    {duration} min
                  </button>
                ))}
              </div>
            </div>

            {/* Space Filter */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontWeight: '500', marginBottom: '8px' }}>Space Available</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {filters.space.map(space => (
                  <button
                    key={space.value}
                    onClick={() => setSelectedFilters(prev => ({ 
                      ...prev, 
                      space: prev.space === space.value ? null : space.value 
                    }))}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      background: selectedFilters.space === space.value ? '#2563eb' : 'white',
                      color: selectedFilters.space === space.value ? 'white' : '#374151',
                      fontSize: '14px'
                    }}
                  >
                    {space.label}
                  </button>
                ))}
              </div>
            </div>

            {/* DOT Goal Filter */}
            <div>
              <p style={{ fontWeight: '500', marginBottom: '8px' }}>DOT Goal</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {filters.dotGoal.map(goal => (
                  <button
                    key={goal.value}
                    onClick={() => setSelectedFilters(prev => ({ 
                      ...prev, 
                      dotGoal: prev.dotGoal === goal.value ? null : goal.value 
                    }))}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      background: selectedFilters.dotGoal === goal.value ? '#2563eb' : 'white',
                      color: selectedFilters.dotGoal === goal.value ? 'white' : '#374151',
                      fontSize: '14px'
                    }}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Available Workouts */}
      <div>
        {availableWorkouts.map(workout => (
          <WorkoutCard key={workout.id} workout={workout} isLocked={false} />
        ))}
      </div>

      {/* Locked Workouts (Free Users) */}
      {lockedWorkouts.length > 0 && (
        <div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            margin: '32px 0 16px 0',
            padding: '16px',
            background: '#f9fafb',
            borderRadius: '8px'
          }}>
            <Star size={20} style={{ color: '#eab308', marginRight: '8px' }} />
            <span style={{ fontSize: '16px', fontWeight: '500' }}>
              Upgrade to Premium for {lockedWorkouts.length} more workouts
            </span>
          </div>
          
          {lockedWorkouts.map(workout => (
            <WorkoutCard key={workout.id} workout={workout} isLocked={true} />
          ))}
        </div>
      )}
    </div>
  )
}

const WorkoutCard = ({ workout, isLocked }) => {
  return (
    <div className="card" style={{ opacity: isLocked ? 0.6 : 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600' }}>
          {workout.title}
        </h3>
        {isLocked && <Star size={16} style={{ color: '#eab308' }} />}
      </div>
      
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
        {workout.description}
      </p>
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '14px', color: '#6b7280' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Clock size={16} style={{ marginRight: '4px' }} />
          {workout.duration} min
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MapPin size={16} style={{ marginRight: '4px' }} />
          {workout.space.replace('-', ' ')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Target size={16} style={{ marginRight: '4px' }} />
          {workout.dotGoal.replace('-', ' ')}
        </div>
      </div>

      {/* Exercise List Preview */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
          Exercises:
        </p>
        <ul style={{ fontSize: '14px', color: '#374151', paddingLeft: '16px' }}>
          {workout.exercises.slice(0, 3).map((exercise, index) => (
            <li key={index} style={{ marginBottom: '4px' }}>{exercise}</li>
          ))}
          {workout.exercises.length > 3 && (
            <li style={{ color: '#6b7280' }}>+{workout.exercises.length - 3} more</li>
          )}
        </ul>
      </div>

      <button 
        className={isLocked ? "btn-secondary" : "btn-primary"}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%',
          ...(isLocked && { cursor: 'not-allowed' })
        }}
        disabled={isLocked}
      >
        <Play size={16} style={{ marginRight: '8px' }} />
        {isLocked ? 'Upgrade to Unlock' : 'Start Workout'}
      </button>
    </div>
  )
}

export default Workouts