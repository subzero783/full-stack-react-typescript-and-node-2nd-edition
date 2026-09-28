import { brand, navLinks } from '../data/navigation'
import './NavBar.css'

function NavBar() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="site-brand" href="#top">
          <span className="site-brand__mark" aria-hidden="true">
            <svg className="icon icon--sm" role="presentation">
              <use href="/icons.svg#sparkle"></use>
            </svg>
          </span>
          <span className="site-brand__name">{brand.name}</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a className="site-nav__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="button button--primary site-header__cta" href="#contact">
          Start free trial
        </a>
      </div>
    </header>
  )
}

export default NavBar
