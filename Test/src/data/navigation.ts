import type {
  ContactDetails,
  FooterColumn,
  NavLink,
  SocialLink,
} from '../types'

export const brand = {
  name: 'Northstar',
  tagline: 'The analytics workspace for modern product teams.',
} as const

/** Anchor links rendered in the sticky header. */
export const navLinks: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

/** Third-party profiles shown in the contact section and the footer. */
export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/', icon: 'github' },
  { label: 'X', href: 'https://x.com/', icon: 'x' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
]

/** Company contact details rendered beside the contact form. */
export const contactDetails: ContactDetails = {
  email: 'hello@northstar.dev',
  phone: '+1 (415) 555-0142',
  phoneHref: 'tel:+14155550142',
  address: '525 Market Street, Suite 12, San Francisco, CA 94105',
  hours: 'Monday to Friday, 9am – 6pm PT',
}

/** Link columns rendered in the footer. */
export const footerColumns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Integrations', href: '#features' },
      { label: 'Changelog', href: '#features' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#top' },
      { label: 'Careers', href: '#top' },
      { label: 'Customers', href: '#features' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#features' },
      { label: 'API reference', href: '#features' },
      { label: 'Status', href: '#features' },
      { label: 'Privacy', href: '#top' },
    ],
  },
]
