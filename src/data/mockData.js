// Mock data for DriveWell MVP

export const mockUser = {
  name: "Jake Miller",
  cdlNumber: "CDL-TX-123456",
  dotPhysicalDate: "2024-08-15", // Next DOT physical
  metrics: {
    weight: 245, // lbs
    bloodPressure: { systolic: 138, diastolic: 88 }, // mmHg
    waistMeasurement: 42, // inches
    restingHeartRate: 78 // bpm
  },
  subscription: "free" // "free" or "premium"
}

export const mockWorkouts = [
  {
    id: 1,
    title: "5-Minute In-Cab Stretch",
    duration: 5,
    space: "in-truck",
    dotGoal: "mobility",
    difficulty: "easy",
    description: "Neck, shoulder, and back stretches you can do in your driver's seat",
    exercises: [
      "Neck rolls (30s)",
      "Shoulder shrugs (30s)", 
      "Seated spinal twist (60s each side)",
      "Ankle circles (30s each)"
    ]
  },
  {
    id: 2,
    title: "Parking Lot Cardio Blast",
    duration: 20,
    space: "beside-truck",
    dotGoal: "weight",
    difficulty: "moderate",
    description: "High-intensity bodyweight workout for truck stop parking lots",
    exercises: [
      "Jumping jacks (45s)",
      "Push-ups (30s)",
      "Mountain climbers (45s)",
      "Bodyweight squats (45s)",
      "Rest (60s) - Repeat 3 rounds"
    ]
  },
  {
    id: 3,
    title: "Blood Pressure Reduction Routine",
    duration: 10,
    space: "beside-truck",
    dotGoal: "blood-pressure",
    difficulty: "easy",
    description: "Gentle exercises proven to help lower blood pressure",
    exercises: [
      "Deep breathing (2 minutes)",
      "Wall push-ups (2 sets of 10)",
      "Calf raises (2 sets of 15)",
      "Walking in place (3 minutes)",
      "Cool-down stretches (2 minutes)"
    ]
  },
  {
    id: 4,
    title: "Truck Stop Gym Session",
    duration: 45,
    space: "gym",
    dotGoal: "weight",
    difficulty: "hard",
    description: "Full-body workout for when you have gym access",
    exercises: [
      "Treadmill warm-up (5 min)",
      "Chest press (3 sets of 12)",
      "Lat pulldown (3 sets of 12)",
      "Leg press (3 sets of 15)",
      "Core circuit (10 min)"
    ]
  }
]

export const mockLocations = [
  {
    id: 1,
    name: "TA Travel Center - Austin",
    type: "truck-stop",
    distance: 0.2,
    address: "8028 US-290, Austin, TX 78724",
    amenities: ["Showers", "Parking", "Food", "WiFi"],
    coordinates: { lat: 30.2672, lng: -97.7431 },
    notes: "Large truck parking area, well-lit"
  },
  {
    id: 2,
    name: "Planet Fitness - Cedar Park",
    type: "gym",
    distance: 0.8,
    address: "1890 Ranch Shopping Center, Cedar Park, TX",
    amenities: ["24/7 Access", "Day Pass: $15", "Showers"],
    coordinates: { lat: 30.5055, lng: -97.8203 },
    notes: "Walk from truck stop parking. No overnight truck parking on-site",
    truckParkingNotes: "Park at HEB across street, 5min walk"
  },
  {
    id: 3,
    name: "DOT Physical - Dr. Martinez",
    type: "dot-center",
    distance: 2.1,
    address: "3401 Esperanza Crossing, Austin, TX 78758",
    amenities: ["CDL Physical", "Same-day results", "Drug testing"],
    coordinates: { lat: 30.3672, lng: -97.6981 },
    notes: "Accepts walk-ins, truck-friendly location",
    hours: "Mon-Fri 7AM-6PM, Sat 8AM-2PM"
  },
  {
    id: 4,
    name: "Anytime Fitness - Round Rock",
    type: "gym",
    distance: 1.5,
    address: "2120 N Mays St, Round Rock, TX 78664",
    amenities: ["24/7 Access", "Day Pass: $20", "Personal Training"],
    coordinates: { lat: 30.5155, lng: -97.6789 },
    notes: "Truck parking available in back lot",
    truckParkingNotes: "Large vehicles welcome in rear parking"
  }
]

export const getDotReadinessStatus = (metrics) => {
  const { weight, bloodPressure, waistMeasurement } = metrics
  
  // Simplified DOT physical criteria
  const bpHigh = bloodPressure.systolic >= 140 || bloodPressure.diastolic >= 90
  const weightHigh = weight >= 250 // Simplified threshold
  const waistHigh = waistMeasurement >= 43
  
  const riskFactors = [bpHigh, weightHigh, waistHigh].filter(Boolean).length
  
  if (riskFactors === 0) return { status: 'green', message: 'DOT Ready' }
  if (riskFactors <= 1) return { status: 'yellow', message: 'At Risk' }
  return { status: 'red', message: 'High Risk' }
}

export const getWorkoutFilters = () => ({
  duration: [5, 10, 20, 45],
  space: [
    { value: 'in-truck', label: 'In Truck' },
    { value: 'beside-truck', label: 'Beside Truck' },
    { value: 'gym', label: 'Gym Access' }
  ],
  dotGoal: [
    { value: 'weight', label: 'Weight Loss' },
    { value: 'blood-pressure', label: 'Blood Pressure' },
    { value: 'mobility', label: 'Mobility' }
  ]
})