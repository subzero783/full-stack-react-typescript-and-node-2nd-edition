import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { contactDetails, socialLinks } from '../data/navigation'
import { plans } from '../data/plans'
import { sendMessage } from '../lib/sendMessage'
import type {
  ContactFormErrors,
  ContactFormValues,
  SubmitStatus,
} from '../types'
import './Contact.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MIN_MESSAGE_LENGTH = 20

/** Pre-select the plan we recommend so the select is never empty. */
const defaultPlan = plans.find((plan) => plan.featured)?.name ?? 'Not sure yet'

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  company: '',
  plan: defaultPlan,
  message: '',
}

/** Returns a message for every invalid field, and nothing for valid ones. */
function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Please tell us your name.'
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address, e.g. you@company.com.'
  }

  if (values.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `Please add at least ${MIN_MESSAGE_LENGTH} characters so we can help.`
  }

  return errors
}

function Contact() {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  const isSubmitting = status === 'submitting'

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const field = event.target.name as keyof ContactFormValues
    const { value } = event.target

    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) {
        return current
      }

      const next = { ...current }
      delete next[field]

      return next
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setStatus('submitting')
    await sendMessage(values)

    if (!isMounted.current) {
      return
    }

    setStatus('success')
  }

  const handleReset = () => {
    setValues(initialValues)
    setErrors({})
    setStatus('idle')
  }

  return (
    <section
      id="contact"
      className="section contact"
      aria-labelledby="contact-title"
    >
      <div className="container contact__inner">
        <div className="contact__intro">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Talk to a human</h2>
          <p className="section-lead">
            Tell us what you are measuring and we will show you the fastest path
            to a working dashboard. Expect a reply within one business day.
          </p>

          <ul className="contact__details">
            <li className="contact__detail">
              <svg className="icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#mail"></use>
              </svg>
              <span>
                <span className="contact__detail-label">Email</span>
                <a href={`mailto:${contactDetails.email}`}>
                  {contactDetails.email}
                </a>
              </span>
            </li>
            <li className="contact__detail">
              <svg className="icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#phone"></use>
              </svg>
              <span>
                <span className="contact__detail-label">Phone</span>
                <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
              </span>
            </li>
            <li className="contact__detail">
              <svg className="icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#pin"></use>
              </svg>
              <span>
                <span className="contact__detail-label">Office</span>
                <address className="contact__address">
                  {contactDetails.address}
                </address>
              </span>
            </li>
            <li className="contact__detail">
              <svg className="icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#clock"></use>
              </svg>
              <span>
                <span className="contact__detail-label">Hours</span>
                <span>{contactDetails.hours}</span>
              </span>
            </li>
          </ul>

          <div className="contact__social">
            <p className="contact__detail-label">Follow along</p>
            <ul className="contact__social-list">
              {socialLinks.map((social) => (
                <li key={social.icon}>
                  <a
                    className="contact__social-link"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                  >
                    <svg
                      className="icon icon--sm"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href={`/icons.svg#${social.icon}`}></use>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="contact__panel">
          {status === 'success' ? (
            <div className="contact-success">
              <span className="contact-success__icon" aria-hidden="true">
                <svg className="icon icon--lg" role="presentation">
                  <use href="/icons.svg#check"></use>
                </svg>
              </span>
              <h3>Thanks — your message is on its way</h3>
              <p>
                A copy is queued for <strong>{values.email}</strong>. A
                solutions engineer will get back to you within one business day.
              </p>
              <button
                type="button"
                className="button button--ghost"
                onClick={handleReset}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              aria-busy={isSubmitting}
              aria-labelledby="contact-form-title"
            >
              <h3 id="contact-form-title">Send us a message</h3>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p className="form-field__error" id="name-error">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="email">Work email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p className="form-field__error" id="email-error">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="company">
                    Company
                    <span className="form-field__optional">optional</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={values.company}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="plan">Plan I am curious about</label>
                  <select
                    id="plan"
                    name="plan"
                    value={values.plan}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  >
                    {plans.map((plan) => (
                      <option key={plan.id} value={plan.name}>
                        {plan.name}
                      </option>
                    ))}
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="message">How can we help?</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'message-error' : 'message-hint'
                  }
                ></textarea>
                {errors.message ? (
                  <p className="form-field__error" id="message-error">
                    {errors.message}
                  </p>
                ) : (
                  <p className="form-field__hint" id="message-hint">
                    Tell us about your stack, the metrics you care about and any
                    deadline you are working towards.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="button button--primary button--block"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>

              <p className="contact-form__status" role="status">
                {isSubmitting ? 'Sending your message…' : ''}
              </p>

              <p className="contact-form__legal">
                By sending this message you agree to our privacy policy. We never
                share your details with third parties.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
