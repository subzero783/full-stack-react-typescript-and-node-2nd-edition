import { brand, footerColumns, socialLinks } from '../data/navigation'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <a className="site-brand" href="#top">
            <span className="site-brand__mark" aria-hidden="true">
              <svg className="icon icon--sm" role="presentation">
                <use href="/icons.svg#sparkle"></use>
              </svg>
            </span>
            <span className="site-brand__name">{brand.name}</span>
          </a>
          <p className="site-footer__tagline">{brand.tagline}</p>
          <ul className="site-footer__social">
            {socialLinks.map((social) => (
              <li key={social.icon}>
                <a
                  className="site-footer__social-link"
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

        {footerColumns.map((column) => (
          <nav
            key={column.title}
            className="site-footer__column"
            aria-label={column.title}
          >
            <h3 className="site-footer__column-title">{column.title}</h3>
            <ul className="site-footer__links">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a className="site-footer__link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container site-footer__bottom">
        <p>
          © {year} {brand.name} Labs, Inc. All rights reserved.
        </p>
        <p>Built with React, TypeScript and Vite.</p>
      </div>
    </footer>
  )
}

export default Footer
