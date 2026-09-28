import type { ContactFormValues } from '../types'

/** How long the simulated delivery takes, in milliseconds. */
const SIMULATED_LATENCY_MS = 900

/**
 * Placeholder transport for the contact form.
 *
 * The landing page has no backend yet, so this waits briefly and then resolves
 * — enough to exercise the form's pending and success states. To hook up a real
 * endpoint later, replace the body with a `fetch` call and keep the signature:
 *
 *   const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(values),
 *   })
 *   if (!response.ok) throw new Error('Request failed')
 */
export function sendMessage(values: ContactFormValues): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      console.info('[contact] message ready for delivery', values)
      resolve()
    }, SIMULATED_LATENCY_MS)
  })
}
