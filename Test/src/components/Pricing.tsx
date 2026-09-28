import { useState } from 'react'
import { plans } from '../data/plans'
import type { BillingCycle } from '../types'
import PricingCard from './PricingCard'
import './Pricing.css'

function Pricing() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly')
  const annualSavingPercent = Math.round(
    (1 - (plans[0]?.annualPrice ?? 0) / (plans[0]?.monthlyPrice ?? 1)) * 100,
  )

  return (
    <section
      id="pricing"
      className="section pricing"
      aria-labelledby="pricing-title"
    >
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">Pricing</p>
          <h2 id="pricing-title">Plans that scale with your team</h2>
          <p className="section-lead">
            Every plan starts with a 14-day free trial. Switch billing period at
            any time — no sales call required.
          </p>
        </div>

        <div className="billing-toggle" role="group" aria-label="Billing period">
          <button
            type="button"
            className="billing-toggle__option"
            aria-pressed={cycle === 'monthly'}
            onClick={() => setCycle('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className="billing-toggle__option"
            aria-pressed={cycle === 'annual'}
            onClick={() => setCycle('annual')}
          >
            Annual
            <span className="billing-toggle__badge">
              Save {annualSavingPercent}%
            </span>
          </button>
        </div>

        <p className="pricing__hint" aria-live="polite">
          {cycle === 'annual'
            ? 'Showing annual pricing, billed once a year per editor.'
            : 'Showing monthly pricing, billed each month per editor.'}
        </p>

        <div className="pricing__grid">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} cycle={cycle} />
          ))}
        </div>

        <p className="pricing__footnote">
          Prices in USD, excluding tax. Volume discounts start at 25 editors —
          talk to sales for a custom quote.
        </p>
      </div>
    </section>
  )
}

export default Pricing
