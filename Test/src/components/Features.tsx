import { features } from '../data/features'
import './Features.css'

function Features() {
  return (
    <section
      id="features"
      className="section features"
      aria-labelledby="features-title"
    >
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">Platform</p>
          <h2 id="features-title">
            Everything you need to ship with confidence
          </h2>
          <p className="section-lead">
            One workspace for the metrics, alerts and access rules your team
            depends on — wired into the tools you already use.
          </p>
        </div>

        <ul className="features__grid">
          {features.map((feature) => (
            <li key={feature.id} className="feature-card">
              <span className="feature-card__icon" aria-hidden="true">
                <svg className="icon" role="presentation">
                  <use href={`/icons.svg#${feature.icon}`}></use>
                </svg>
              </span>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__body">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Features
