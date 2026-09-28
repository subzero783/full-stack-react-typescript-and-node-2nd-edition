import type { BillingCycle, Plan } from '../types'

type PricingCardProps = {
  plan: Plan
  cycle: BillingCycle
}

function PricingCard({ plan, cycle }: PricingCardProps) {
  const price = cycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice
  const yearlySaving = (plan.monthlyPrice - plan.annualPrice) * 12

  return (
    <article
      className={`plan-card${plan.featured ? ' plan-card--featured' : ''}`}
      aria-labelledby={`plan-${plan.id}`}
    >
      {plan.featured && <p className="plan-card__badge">Most popular</p>}

      <h3 id={`plan-${plan.id}`} className="plan-card__name">
        {plan.name}
      </h3>
      <p className="plan-card__tagline">{plan.tagline}</p>

      <p className="plan-card__price">
        <span className="plan-card__currency">$</span>
        <span className="plan-card__amount">{price}</span>
        <span className="plan-card__period">/month</span>
      </p>
      <p className="plan-card__note">
        {cycle === 'annual'
          ? `${plan.priceNote}, billed annually — save $${yearlySaving} per editor a year`
          : `${plan.priceNote}, billed monthly`}
      </p>

      <a
        className={`button button--block ${
          plan.featured ? 'button--primary' : 'button--ghost'
        }`}
        href="#contact"
      >
        {plan.ctaLabel}
      </a>

      <ul className="plan-card__features">
        {plan.features.map((feature) => (
          <li
            key={feature.label}
            className={
              feature.included
                ? 'plan-card__feature'
                : 'plan-card__feature plan-card__feature--muted'
            }
          >
            <svg
              className="icon icon--sm"
              role="presentation"
              aria-hidden="true"
            >
              <use
                href={`/icons.svg#${feature.included ? 'check' : 'dash'}`}
              ></use>
            </svg>
            <span>{feature.label}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default PricingCard
