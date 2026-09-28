/** Billing periods offered on the pricing section. */
export type BillingCycle = 'monthly' | 'annual'

/** One line inside a pricing card's feature list. */
export type PlanFeature = {
  label: string
  included: boolean
}

/** A single pricing tier. */
export type Plan = {
  id: string
  name: string
  tagline: string
  /** Price per editor per month when billed monthly, in USD. */
  monthlyPrice: number
  /** Price per editor per month when billed annually, in USD. */
  annualPrice: number
  priceNote: string
  ctaLabel: string
  featured: boolean
  features: PlanFeature[]
}

/** A product capability shown in the features grid. */
export type Feature = {
  id: string
  /** Symbol id inside /icons.svg. */
  icon: string
  title: string
  description: string
}

/** An in-page anchor link used by the header and the footer. */
export type NavLink = {
  label: string
  href: string
}

/** A footer link column. */
export type FooterColumn = {
  title: string
  links: NavLink[]
}

/** A social profile rendered with a sprite icon. */
export type SocialLink = {
  label: string
  href: string
  /** Symbol id inside /icons.svg. */
  icon: string
}

/** Company contact details shown next to the contact form. */
export type ContactDetails = {
  email: string
  phone: string
  phoneHref: string
  address: string
  hours: string
}

/** Controlled values of the contact form. */
export type ContactFormValues = {
  name: string
  email: string
  company: string
  plan: string
  message: string
}

/** Per-field validation messages keyed by field name. */
export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

/** Lifecycle of the contact form submission. */
export type SubmitStatus = 'idle' | 'submitting' | 'success'
