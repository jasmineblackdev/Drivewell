import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './screens/Dashboard'
import Workouts from './screens/Workouts'
import WorkoutSession from './screens/WorkoutSession'
import Locations from './screens/Locations'
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import Progress from './screens/Progress'
import CheckIn from './screens/CheckIn'
import Achievements from './screens/Achievements'
import Wearables from './screens/Wearables'
import MentalWellness from './screens/MentalWellness'
import Telehealth from './screens/Telehealth'
import Nutrition from './screens/Nutrition'
import SleepHealth from './screens/SleepHealth'
import TrainerMarketplace from './screens/TrainerMarketplace'
import Pricing from './screens/Pricing'
import Onboarding from './screens/Onboarding'
import { OnboardingProvider, useOnboarding } from './context/OnboardingContext'
import './App.css'

const AppRoutes = () => {
  const { completed } = useOnboarding()

  if (!completed) return <Onboarding />

  return (
    <Layout>
      <Routes>
        <Route path="/"                element={<Dashboard />} />
        <Route path="/workouts"        element={<Workouts />} />
        <Route path="/workouts/:id"    element={<WorkoutSession />} />
        <Route path="/locations"       element={<Locations />} />
        <Route path="/profile"         element={<Profile />} />
        <Route path="/progress"        element={<Progress />} />
        <Route path="/settings"        element={<Settings />} />
        <Route path="/checkin"         element={<CheckIn />} />
        <Route path="/achievements"    element={<Achievements />} />
        <Route path="/wearables"       element={<Wearables />} />
        <Route path="/mental-wellness"    element={<MentalWellness />} />
        <Route path="/telehealth"         element={<Telehealth />} />
        <Route path="/nutrition"          element={<Nutrition />} />
        <Route path="/sleep-health"       element={<SleepHealth />} />
        <Route path="/trainers"           element={<TrainerMarketplace />} />
        <Route path="/pricing"            element={<Pricing />} />
      </Routes>
    </Layout>
  )
}

function App() {
  return (
    <OnboardingProvider>
      <Router>
        <AppRoutes />
      </Router>
    </OnboardingProvider>
  )
}

export default App
