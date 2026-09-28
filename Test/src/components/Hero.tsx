import './Hero.css'

const stats = [
  { id: 'teams', value: '12,000+', label: 'product teams' },
  { id: 'uptime', value: '99.99%', label: 'uptime last quarter' },
  { id: 'reviews', value: '4.9/5', label: 'average review score' },
]

const chartBars = [
  { id: 'w1', value: 38 },
  { id: 'w2', value: 54 },
  { id: 'w3', value: 47 },
  { id: 'w4', value: 66 },
  { id: 'w5', value: 58 },
  { id: 'w6', value: 82 },
  { id: 'w7', value: 94 },
]

const insightRows = [
  { id: 'activation', label: 'Activation rate', value: '62%', delta: '+4.2%' },
  { id: 'retention', label: 'Week-4 retention', value: '41%', delta: '+1.8%' },
  { id: 'churn', label: 'Net churn', value: '1.4%', delta: '-0.6%' },
]

function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true"></div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">New — AI summaries in open beta</p>

          <h1 id="hero-title">
            Turn product data into decisions,{' '}
            <span className="hero__accent">not dashboards</span>
          </h1>

          <p className="hero__lead">
            Northstar connects to your warehouse, models every event and answers
            the questions your team asks in Slack — in seconds, without a data
            engineer in the loop.
          </p>

          <div className="hero__actions">
            <a className="button button--primary" href="#contact">
              Start free 14-day trial
            </a>
            <a className="button button--ghost" href="#pricing">
              See pricing
            </a>
          </div>

          <p className="hero__fineprint">
            No credit card required · SOC 2 Type II · Cancel anytime
          </p>

          <dl className="hero__stats">
            {stats.map((stat) => (
              <div key={stat.id} className="hero__stat">
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="mock">
            <div className="mock__bar">
              <span className="mock__dot"></span>
              <span className="mock__dot"></span>
              <span className="mock__dot"></span>
              <span className="mock__title">Weekly active teams</span>
            </div>

            <div className="mock__chart">
              {chartBars.map((bar) => (
                <span
                  key={bar.id}
                  className="mock__column"
                  style={{ height: `${bar.value}%` }}
                ></span>
              ))}
            </div>

            <ul className="mock__rows">
              {insightRows.map((row) => (
                <li key={row.id} className="mock__row">
                  <span className="mock__label">{row.label}</span>
                  <span className="mock__value">{row.value}</span>
                  <span className="mock__delta">{row.delta}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
