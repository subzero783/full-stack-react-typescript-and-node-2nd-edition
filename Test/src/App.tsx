import Contact from './components/Contact'
import Features from './components/Features'
import Footer from './components/Footer'
import Hero from './components/Hero'
import NavBar from './components/NavBar'
import Pricing from './components/Pricing'
import './App.css'

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <NavBar />

      <main id="main">
        <Hero />
        <Features />
        <Pricing />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
