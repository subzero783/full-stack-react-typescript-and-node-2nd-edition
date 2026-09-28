import type { Feature } from '../types'

/** Product capabilities rendered as the card grid in the features section. */
export const features: Feature[] = [
  {
    id: 'insights',
    icon: 'chart',
    title: 'Live product insights',
    description:
      'Funnels, retention and cohort charts that refresh the moment your events land — no nightly batch job required.',
  },
  {
    id: 'warehouse',
    icon: 'plug',
    title: 'Warehouse native',
    description:
      'Point Northstar at BigQuery, Snowflake or Postgres and query your own tables with the same visual builder.',
  },
  {
    id: 'alerts',
    icon: 'bolt',
    title: 'Alerts that matter',
    description:
      'Anomaly detection watches every metric and pings Slack the second a conversion rate drifts out of band.',
  },
  {
    id: 'security',
    icon: 'shield',
    title: 'Enterprise-grade security',
    description:
      'SOC 2 Type II, SSO with SAML, field-level access rules and a full audit log on every query.',
  },
  {
    id: 'collaboration',
    icon: 'users',
    title: 'Built for teams',
    description:
      'Shared dashboards, comments and saved segments so product, growth and finance argue with the same numbers.',
  },
  {
    id: 'ai',
    icon: 'sparkle',
    title: 'AI summaries',
    description:
      'Ask a question in plain English and get a chart, a written summary and the SQL that produced it.',
  },
]
