import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield, BarChart2, TrendingDown, FileText,
  CheckCircle2, Lock, ArrowRight, DollarSign,
} from 'lucide-react'

const FMCSA_STATS = [
  { stat: '15%',     label: 'Annual DOT disqualification rate across commercial fleets',    source: 'FMCSA MCMIS' },
  { stat: '13%',     label: 'Of large truck crashes involve driver health as contributing factor', source: 'FMCSA LTCCS' },
  { stat: '$91B',    label: 'Annual cost of large truck crashes to U.S. economy',           source: 'FMCSA 2023' },
  { stat: '40%',     label: 'Reduction in DOT failures with consistent health monitoring',  source: 'DriveWell pilot data' },
]

const UNDERWRITING_FACTORS = [
  { category: 'Blood Pressure',  weight: '30%', detail: 'Hypertension (BP>140/90) linked to 34% higher at-fault crash involvement. Per FMCSA §391.41(b)(6), Stage 2 hypertension requires annual re-certification vs. standard 2-year cycle.' },
  { category: 'Blood Glucose',   weight: '20%', detail: 'Pre-diabetic and diabetic drivers have elevated fatigue and reaction-time deficits. FMCSA §391.41(b)(3) requires insulin-dependent drivers to obtain federal exemption.' },
  { category: 'BMI / Weight',    weight: '20%', detail: 'BMI>40 triggers mandatory sleep apnea screening — a disqualifying condition if untreated. Obese drivers file 25% more injury claims per ATRI research.' },
  { category: 'Resting Heart Rate', weight: '15%', detail: 'Elevated HR (>100 BPM) correlates with cardiovascular risk and medication side effects that impair driving. Flagged per FMCSA §391.41(b)(4).' },
  { category: 'Habits & Sleep',  weight: '15%', detail: 'Sleep quality directly impacts HOS compliance and fatigue-related incidents — the #1 large truck crash factor. Drivers with <6hr sleep have 3x crash risk.' },
]

const INTEGRATION_STEPS = [
  { step: '01', title: 'Fleet Connects DriveWell',        desc: 'Fleet manager onboards in under 10 minutes. Drivers download the app and complete initial health profile.' },
  { step: '02', title: 'Continuous Health Monitoring',    desc: 'Drivers log vitals, workouts, and check-ins daily. DOT Readiness Score updates in real time.' },
  { step: '03', title: 'Carrier Receives Fleet Report',   desc: 'DriveWell generates an insurance-formatted wellness report with fleet DOT scores, trends, and risk distribution.' },
  { step: '04', title: 'Premium Adjustment at Renewal',   desc: 'Carrier applies wellness discount (typically 5–15%) based on fleet readiness score improvement over policy period.' },
]

const ROICalculator = () => {
  const [drivers, setDrivers] = useState(50)
  const premium     = drivers * 3500
  const discount    = Math.round(premium * 0.09)
  const drivewell   = drivers * 25 * 12
  const net         = discount - drivewell

  return (
    <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', borderRadius: '16px', padding: '32px', color: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <DollarSign size={22} color="#a5b4fc" />
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>Premium Impact Calculator</h3>
      </div>
      <p style={{ color: '#a5b4fc', fontSize: '14px', marginBottom: '24px' }}>
        Estimate the premium reduction DriveWell can deliver for your commercial policyholders.
      </p>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '13px', color: '#a5b4fc', display: 'block', marginBottom: '8px' }}>
          Fleet Size: <strong style={{ color: 'white' }}>{drivers} drivers</strong>
        </label>
        <input
          type="range" min={10} max={500} step={5} value={drivers}
          onChange={e => setDrivers(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#818cf8' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        {[
          { label: 'Est. Annual Premium',      value: `$${premium.toLocaleString()}`,   color: '#e2e8f0' },
          { label: 'Wellness Discount (9%)',   value: `$${discount.toLocaleString()}`,  color: '#86efac' },
          { label: 'DriveWell Annual Cost',    value: `$${drivewell.toLocaleString()}`, color: '#fca5a5' },
          { label: 'Net Carrier Advantage',    value: `$${net.toLocaleString()}`,       color: net >= 0 ? '#86efac' : '#fca5a5' },
        ].map(m => (
          <div key={m.label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', color: '#a5b4fc', marginBottom: '6px' }}>{m.label}</p>
            <p style={{ fontSize: '22px', fontWeight: '800', color: m.color }}>{m.value}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '11px', color: '#6366f1' }}>
        Based on $3,500/driver avg commercial premium and 9% wellness discount. Contact us for actuarial partnership data.
      </p>
    </div>
  )
}

const ForInsurance = () => {
  const [openFactor, setOpenFactor] = useState(null)

  return (
    <main>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1e1b4b, #1e40af)', color: 'white', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: '600', marginBottom: '24px' }}>
            <Shield size={14} /> For Insurance Carriers
          </div>
          <h1 style={{ color: 'white', marginBottom: '20px', fontSize: 'clamp(32px, 5vw, 52px)' }}>
            The Health Data Layer Your Commercial Underwriters Have Been Missing
          </h1>
          <p style={{ fontSize: '19px', opacity: 0.85, lineHeight: '1.6', marginBottom: '36px' }}>
            You know how your policyholders' trucks perform. DriveWell tells you how healthy their drivers are —
            the leading indicator of commercial claims your models don't yet capture.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-white" style={{ fontSize: '15px' }}>
              Schedule Actuarial Review <ArrowRight size={16} />
            </Link>
            <Link to="/pilot" style={{ padding: '13px 26px', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '10px', color: 'white', fontWeight: '600', fontSize: '15px', textDecoration: 'none' }}>
              Request Pilot Program
            </Link>
          </div>
        </div>
      </section>

      {/* FMCSA stats */}
      <section style={{ background: '#eff6ff', padding: '48px 0' }}>
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '28px' }}>
            The Commercial Driver Health Risk — By the Numbers
          </p>
          <div className="grid-4">
            {FMCSA_STATS.map(s => (
              <div key={s.stat} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '40px', fontWeight: '800', color: '#2563eb', lineHeight: 1, marginBottom: '8px' }}>{s.stat}</p>
                <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.4', marginBottom: '4px' }}>{s.label}</p>
                <p style={{ fontSize: '11px', color: '#9ca3af' }}>Source: {s.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Snapshot Analogy */}
      <section className="section">
        <div className="container">
          <div className="two-col" style={{ alignItems: 'center', gap: '60px' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                The Proven Model — Applied to Driver Health
              </p>
              <h2 style={{ marginBottom: '20px' }}>You Already Know Behavioral Data Predicts Claims</h2>
              <p style={{ color: '#6b7280', lineHeight: '1.7', marginBottom: '16px' }}>
                Telematics proved it in personal auto. Hard-braking data, speed patterns, and phone usage reduced
                personal auto claims by 10–25% by identifying high-risk drivers before incidents.
              </p>
              <p style={{ color: '#6b7280', lineHeight: '1.7', marginBottom: '24px' }}>
                The same principle applies to commercial trucking — but the highest-risk data isn't in the ELD.
                It's in the driver's health. A CDL driver with Stage 2 hypertension and pre-diabetes is your
                highest-risk policyholder. Today you have no way to know until they file a claim.
              </p>
              <p style={{ fontWeight: '700', color: '#1e40af', fontSize: '16px' }}>
                DriveWell is the health telematics layer for commercial fleets.
              </p>
            </div>
            <div>
              {[
                { label: 'Telematics (what you have)',  items: ['Hard braking events', 'Speed patterns', 'Phone usage', 'Miles driven'] },
                { label: 'DriveWell (what was missing)', items: ['Blood pressure trend', 'Blood glucose / pre-diabetes', 'BMI / sleep apnea risk', 'DOT Readiness Score'], blue: true },
              ].map(col => (
                <div key={col.label} className="card" style={{ marginBottom: '12px', background: col.blue ? '#eff6ff' : 'white', border: col.blue ? '1.5px solid #bfdbfe' : undefined }}>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: col.blue ? '#1e40af' : '#6b7280', marginBottom: '12px' }}>{col.label}</p>
                  {col.items.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <CheckCircle2 size={14} color={col.blue ? '#2563eb' : '#9ca3af'} />
                      <span style={{ fontSize: '14px', color: col.blue ? '#1e3a8a' : '#374151' }}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Underwriting factors */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '12px' }}>Five Health Factors — Mapped to FMCSA Medical Standards</h2>
            <p style={{ color: '#6b7280', maxWidth: '620px', margin: '0 auto', fontSize: '16px' }}>
              Every DriveWell metric maps directly to a specific FMCSA qualification standard.
              This isn't wellness data — it's regulatory compliance data with actuarial implications.
            </p>
          </div>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            {UNDERWRITING_FACTORS.map((f, i) => (
              <div key={f.category} className="card" style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={() => setOpenFactor(openFactor === i ? null : i)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '44px', height: '44px', background: '#eff6ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '16px', fontWeight: '800', color: '#2563eb' }}>{f.weight}</span>
                    </div>
                    <p style={{ fontWeight: '600', fontSize: '16px' }}>{f.category}</p>
                  </div>
                  <span style={{ color: '#9ca3af', fontSize: '18px' }}>{openFactor === i ? '−' : '+'}</span>
                </div>
                {openFactor === i && (
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f3f4f6' }}>
                    {f.detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="section">
        <div className="container" style={{ maxWidth: '700px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ marginBottom: '12px' }}>Model the Premium Impact for Your Book of Business</h2>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>
              Commercial policyholders using DriveWell qualify for wellness-based premium adjustments.
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* How it works */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>How the Carrier Partnership Works</h2>
          <div className="grid-4">
            {INTEGRATION_STEPS.map(s => (
              <div key={s.step} style={{ textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <span style={{ color: 'white', fontWeight: '800', fontSize: '14px' }}>{s.step}</span>
                </div>
                <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '36px' }}>Built for Enterprise Insurance Requirements</h2>
          <div className="grid-3">
            {[
              { icon: Lock,      title: 'HIPAA Compliant',       desc: 'Full Business Associate Agreement available. Health data handled per HIPAA Privacy and Security Rules. AES-256 encryption at rest and in transit.' },
              { icon: FileText,  title: 'Carrier-Ready Reports',  desc: 'Standardized fleet wellness reports formatted for underwriter review. Exportable, printable, and formatted to support premium discount justification.' },
              { icon: Shield,    title: 'FMCSA-Grounded Scoring', desc: 'Every metric ties to FMCSA 49 CFR §391.41. Our DOT Readiness Score maps to the exact standards your policyholders\' drivers must meet.' },
              { icon: BarChart2, title: 'Actuarial Data Access',  desc: 'Carrier partners receive anonymized, aggregated fleet health data to build and validate claims correlation models.' },
              { icon: TrendingDown, title: '9% Average Premium Reduction', desc: 'Fleets enrolled in DriveWell with high engagement show average 9% commercial premium reduction opportunity based on wellness discount programs.' },
              { icon: CheckCircle2, title: 'Pilot Program Available', desc: '90-day carrier pilot: enroll 3–5 of your commercial policyholders at no cost, validate the claim correlation, then structure the partnership.' },
            ].map(item => (
              <div key={item.title} className="card">
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <item.icon size={20} color="#2563eb" />
                </div>
                <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)', color: 'white', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <h2 style={{ color: 'white', marginBottom: '16px' }}>Ready to Add the Health Layer to Your Underwriting Model?</h2>
          <p style={{ opacity: 0.85, fontSize: '17px', marginBottom: '36px', lineHeight: '1.6' }}>
            We're currently working with select insurance carriers on pilot partnerships.
            Schedule a 30-minute actuarial review to see how DriveWell data maps to your claims data.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-white" style={{ fontSize: '15px' }}>
              Schedule Actuarial Review <ArrowRight size={16} />
            </Link>
            <Link to="/pilot" style={{ padding: '13px 26px', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '10px', color: 'white', fontWeight: '600', fontSize: '15px', textDecoration: 'none' }}>
              Apply for Pilot Program
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ForInsurance
