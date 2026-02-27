import React, { createContext, useContext, useState } from 'react'

const OnboardingContext = createContext(null)

const STORAGE_KEY = 'dw_onboarding_data'

const defaultData = {
  name: '',
  cdlNumber: '',
  dotPhysicalDate: '',
  goals: [],
  weight: '',
  systolic: '',
  diastolic: '',
}

const loadData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData
  } catch {
    return defaultData
  }
}

export const OnboardingProvider = ({ children }) => {
  const [completed, setCompleted] = useState(
    () => localStorage.getItem('dw_onboarded') === 'true'
  )
  const [data, setData] = useState(loadData)

  const updateData = (fields) => {
    setData((prev) => {
      const next = { ...prev, ...fields }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const complete = () => {
    localStorage.setItem('dw_onboarded', 'true')
    setCompleted(true)
  }

  const reset = () => {
    localStorage.removeItem('dw_onboarded')
    localStorage.removeItem(STORAGE_KEY)
    setData(defaultData)
    setCompleted(false)
  }

  return (
    <OnboardingContext.Provider value={{ completed, data, updateData, complete, reset }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboarding = () => useContext(OnboardingContext)
