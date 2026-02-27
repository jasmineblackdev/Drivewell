import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './screens/Dashboard'
import Workouts from './screens/Workouts'
import Locations from './screens/Locations'
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import Onboarding from './screens/Onboarding'
import { OnboardingProvider, useOnboarding } from './context/OnboardingContext'
import './App.css'

const AppRoutes = () => {
  const { completed } = useOnboarding()

  if (!completed) return <Onboarding />

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
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