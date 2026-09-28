import type { Plan } from '../types'

/**
 * Pricing tiers. `annualPrice` is the effective per-editor monthly rate when
 * the plan is billed yearly — roughly 20% off the monthly rate.
 */
export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For small teams validating an idea.',
    monthlyPrice: 29,
    annualPrice: 23,
    priceNote: 'per editor / month',
    ctaLabel: 'Start free trial',
    featured: false,
    features: [
      { label: 'Up to 3 projects', included: true },
      { label: '50k events per month', included: true },
      { label: '30-day data retention', included: true },
      { label: 'Email support', included: true },
      { label: 'Custom dashboards', included: false },
      { label: 'SSO and audit logs', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For growing teams that ship every week.',
    monthlyPrice: 79,
    annualPrice: 63,
    priceNote: 'per editor / month',
    ctaLabel: 'Start free trial',
    featured: true,
    features: [
      { label: 'Unlimited projects', included: true },
      { label: '5M events per month', included: true },
      { label: '13-month data retention', included: true },
      { label: 'Custom dashboards', included: true },
      { label: 'Anomaly alerts in Slack', included: true },
      { label: 'SSO and audit logs', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For platforms with compliance requirements.',
    monthlyPrice: 249,
    annualPrice: 199,
    priceNote: 'per editor / month',
    ctaLabel: 'Talk to sales',
    featured: false,
    features: [
      { label: 'Everything in Pro', included: true },
      { label: 'Unlimited events', included: true },
      { label: 'Warehouse sync and CDC', included: true },
      { label: 'SSO, SCIM and audit logs', included: true },
      { label: '99.99% uptime SLA', included: true },
      { label: 'Dedicated solutions engineer', included: true },
    ],
  },
]
