import React, { useState } from 'react'
import { Utensils, MapPin, Plus, CheckCircle2, Target, Flame, Droplets, AlertCircle } from 'lucide-react'

// ── Mock nearby healthy-option restaurants ────────────────────────────────────
const NEARBY_SPOTS = [
  {
    id: 1,
    name: 'Subway',
    type: 'Fast Casual',
    distance: 0.1,
    truckParking: true,
    dotFriendly: true,
    tip: 'Order on whole wheat with double veggies, no mayo. 6" turkey = ~280 cal.',
    tags: ['Low Sodium', 'High Protein'],
  },
  {
    id: 2,
    name: 'Pilot Flying J — Fresh Market',
    type: 'Truck Stop',
    distance: 0.2,
    truckParking: true,
    dotFriendly: true,
    tip: 'Grab a hard-boiled egg pack + string cheese + apple. Skip the hot dogs.',
    tags: ['Truck Parking', 'Grab & Go'],
  },
  {
    id: 3,
    name: 'Chipotle',
    type: 'Fast Casual',
    distance: 0.9,
    truckParking: false,
    dotFriendly: true,
    tip: 'Burrito bowl with chicken, black beans, fajita veggies, salsa. No sour cream.',
    tags: ['High Protein', 'Customizable'],
  },
  {
    id: 4,
    name: 'Cracker Barrel',
    type: 'Sit-Down',
    distance: 1.4,
    truckParking: true,
    dotFriendly: false,
    tip: 'Stick to grilled chicken + steamed veggies. Avoid biscuits and gravy.',
    tags: ['Truck Parking', 'Watch Portions'],
  },
]

// ── Quick-add meal templates ──────────────────────────────────────────────────
const QUICK_MEALS = [
  { id: 1, name: 'Grilled Chicken + Veggies', cal: 380, protein: 42, carbs: 18, fat: 12, sodium: 520 },
  { id: 2, name: 'Subway 6" Turkey (no mayo)', cal: 280, protein: 18, carbs: 40, fat: 4,  sodium: 610 },
  { id: 3, name: 'Protein Bar (Quest / RXBar)', cal: 200, protein: 20, carbs: 22, fat: 8,  sodium: 190 },
  { id: 4, name: 'Hard-boiled Eggs (3)', cal: 210, protein: 18, carbs: 2,  fat: 14, sodium: 210 },
  { id: 5, name: 'Chipotle Bowl (chicken)', cal: 620, protein: 48, carbs: 62, fat: 16, sodium: 1140 },
  { id: 6, name: 'Mixed Nuts (1 oz)',          cal: 170, protein: 5,  carbs: 6,  fat: 15, sodium: 0   },
]

const DOT_DAILY_TARGETS = { cal: 2200, protein: 150, carbs: 220, fat: 70, sodium: 2300 }

const STORAGE_KEY = 'dw_nutrition_log'

const loadTodayLog = () => {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const today = new Date().toISOString().split('T')[0]
    return all[today] || []
  } catch { return [] }
}

const saveTodayLog = (items) => {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const today = new Date().toISOString().split('T')[0]
    all[today] = items
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch { /* ignore */ }
}

const MacroBar = ({ label, value, target, color, unit = 'g' }) => {
  const pct = Math.min((value / target) * 100, 100)
  const over = value > target
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
        <span style={{ color: '#374151', fontWeight: '500' }}>{label}</span>
        <span style={{ color: over ? '#dc2626' : '#6b7280' }}>
          {value}{unit} / {target}{unit} {over && '⚠️'}
        </span>
      </div>
      <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: over ? '#ef4444' : color, borderRadius: '999px', transition: 'width 0.3s' }} />
      </div>
    </div>
  )
}

const Nutrition = () => {
  const [log, setLog]             = useState(loadTodayLog)
  const [activeTab, setActiveTab] = useState('log')   // 'log' | 'find' | 'tips'
  const [added, setAdded]         = useState(null)

  const addMeal = (meal) => {
    const item = { ...meal, addedAt: Date.now() }
    const next = [...log, item]
    setLog(next)
    saveTodayLog(next)
    setAdded(meal.id)
    setTimeout(() => setAdded(null), 1200)
  }

  const removeItem = (idx) => {
    const next = log.filter((_, i) => i !== idx)
    setLog(next)
    saveTodayLog(next)
  }

  const totals = log.reduce(
    (acc, m) => ({ cal: acc.cal + m.cal, protein: acc.protein + m.protein, carbs: acc.carbs + m.carbs, fat: acc.fat + m.fat, sodium: acc.sodium + m.sodium }),
    { cal: 0, protein: 0, carbs: 0, fat: 0, sodium: 0 }
  )

  const Tab = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        flex: 1, padding: '10px', border: 'none', cursor: 'pointer',
        background: activeTab === id ? '#2563eb' : '#f3f4f6',
        color: activeTab === id ? 'white' : '#374151',
        fontWeight: activeTab === id ? '700' : '400',
        fontSize: '13px',
        borderRadius: '8px',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  )

  return (
    <div className="screen">
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '6px' }}>Nutrition</h1>
        <p style={{ color: '#6b7280' }}>Fuel right. Stay DOT-ready.</p>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <Tab id="log"  label="Today's Log" />
        <Tab id="find" label="Find Food"   />
        <Tab id="tips" label="DOT Tips"    />
      </div>

      {/* ── TODAY'S LOG ─────────────────────────────────────────────── */}
      {activeTab === 'log' && (
        <>
          {/* Daily summary */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Flame size={20} color="#f97316" />
              <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Daily Summary</h3>
              <span style={{ marginLeft: 'auto', fontSize: '22px', fontWeight: '700', color: '#2563eb' }}>
                {totals.cal} <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '400' }}>/ {DOT_DAILY_TARGETS.cal} cal</span>
              </span>
            </div>
            <MacroBar label="Protein"  value={totals.protein} target={DOT_DAILY_TARGETS.protein} color="#22c55e" />
            <MacroBar label="Carbs"    value={totals.carbs}   target={DOT_DAILY_TARGETS.carbs}   color="#3b82f6" />
            <MacroBar label="Fat"      value={totals.fat}     target={DOT_DAILY_TARGETS.fat}      color="#f97316" />
            <MacroBar label="Sodium"   value={totals.sodium}  target={DOT_DAILY_TARGETS.sodium}   color="#a855f7" unit="mg" />
            {totals.sodium > DOT_DAILY_TARGETS.sodium && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '10px 12px', background: '#fef2f2', borderRadius: '8px', marginTop: '8px' }}>
                <AlertCircle size={16} color="#dc2626" style={{ flexShrink: 0, marginTop: '1px' }} />
                <p style={{ fontSize: '13px', color: '#dc2626' }}>High sodium raises blood pressure — a key DOT disqualifier. Aim to stay under 2,300mg.</p>
              </div>
            )}
          </div>

          {/* Quick add */}
          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '14px' }}>Quick Add</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {QUICK_MEALS.map(meal => (
                <div key={meal.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', background: '#f9fafb', borderRadius: '8px',
                }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '2px' }}>{meal.name}</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                      {meal.cal} cal · {meal.protein}g protein · {meal.sodium}mg sodium
                    </p>
                  </div>
                  <button
                    onClick={() => addMeal(meal)}
                    style={{
                      width: '32px', height: '32px', borderRadius: '50%', border: 'none',
                      background: added === meal.id ? '#22c55e' : '#2563eb',
                      color: 'white', cursor: 'pointer', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                  >
                    {added === meal.id ? <CheckCircle2 size={16} /> : <Plus size={16} />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Today's logged items */}
          {log.length > 0 && (
            <div className="card">
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '14px' }}>Logged Today</h3>
              {log.map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 0', borderBottom: idx < log.length - 1 ? '1px solid #f3f4f6' : 'none',
                }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500' }}>{item.name}</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af' }}>{item.cal} cal</p>
                  </div>
                  <button
                    onClick={() => removeItem(idx)}
                    style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}
                  >×</button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── FIND FOOD ───────────────────────────────────────────────── */}
      {activeTab === 'find' && (
        <>
          <div className="card" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <MapPin size={18} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '13px', color: '#1d4ed8' }}>
                Showing options near your current location. Truck-parking-friendly spots are marked.
              </p>
            </div>
          </div>
          {NEARBY_SPOTS.map(spot => (
            <div key={spot.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '2px' }}>{spot.name}</h3>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>{spot.type} · {spot.distance} mi away</p>
                </div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {spot.truckParking && (
                    <span style={{ padding: '2px 8px', background: '#dbeafe', color: '#1d4ed8', borderRadius: '999px', fontSize: '11px', fontWeight: '600' }}>🚛 Parking</span>
                  )}
                  {spot.dotFriendly && (
                    <span style={{ padding: '2px 8px', background: '#dcfce7', color: '#15803d', borderRadius: '999px', fontSize: '11px', fontWeight: '600' }}>✓ DOT Friendly</span>
                  )}
                </div>
              </div>
              <div style={{ padding: '10px 12px', background: '#f9fafb', borderRadius: '8px', marginBottom: '10px' }}>
                <p style={{ fontSize: '13px', color: '#374151' }}>
                  <span style={{ fontWeight: '600' }}>Tip: </span>{spot.tip}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {spot.tags.map(t => (
                  <span key={t} style={{ padding: '3px 10px', background: '#f3f4f6', color: '#6b7280', borderRadius: '999px', fontSize: '12px' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* ── DOT TIPS ────────────────────────────────────────────────── */}
      {activeTab === 'tips' && (
        <>
          {[
            {
              icon: '🩸',
              title: 'Control Blood Pressure Through Diet',
              body: 'Sodium is the #1 dietary driver of high BP. Stay under 2,300mg/day. Avoid truck-stop fast food, canned soups, and processed meats — all are sodium bombs.',
            },
            {
              icon: '⚖️',
              title: 'DOT BMI Thresholds',
              body: 'BMI over 40 can trigger a sleep apnea evaluation, which limits your medical certificate to 1 year instead of 2. Losing 10–15 lbs can change your certification length.',
            },
            {
              icon: '🍬',
              title: 'Blood Glucose & DOT',
              body: 'Insulin-treated diabetes (ITDM) requires FMCSA exemption. Keeping fasting glucose under 126 mg/dL avoids diabetes diagnosis. Cut sugary drinks — a single 20oz soda is 65g of sugar.',
            },
            {
              icon: '💧',
              title: 'Hydration Reduces Fatigue',
              body: 'Even mild dehydration (1–2%) causes slower reaction times — a direct safety risk. Aim for 80–100 oz of water per day. Coffee and energy drinks don\'t count.',
            },
            {
              icon: '🥚',
              title: 'Best High-Protein Truck Stop Picks',
              body: 'Hard-boiled eggs, beef jerky (low-sodium), protein bars (RXBar, Quest), Greek yogurt, string cheese, and nuts. These are found at most Pilot and TA locations.',
            },
          ].map((tip, i) => (
            <div key={i} className="card">
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '28px', flexShrink: 0 }}>{tip.icon}</div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '6px' }}>{tip.title}</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5' }}>{tip.body}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Nutrition
