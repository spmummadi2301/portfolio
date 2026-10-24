import { useCallback, useEffect, useRef, useState } from 'react'
import config from './config.js'
import clients from './clients.js'
import premierePro from './logos/premiere-pro.svg'
import afterEffects from './logos/after-effects.svg'
import davinciResolve from './logos/davinci-resolve.svg'
import claude from './logos/claude.svg'
import invideo from './logos/invideo.svg'

const tools = [
  ['Adobe Premiere Pro', premierePro],
  ['Adobe After Effects', afterEffects],
  ['DaVinci Resolve Studio', davinciResolve],
  ['Claude', claude],
  ['InVideo AI', invideo],
]

function Portrait() {
  const initial = config.name.trim().charAt(0).toUpperCase()
  return (
    <div className="portrait">
      <div className="portrait-arch">
        {config.image ? (
          <img src={config.image} alt={`Portrait of ${config.name}`} />
        ) : (
          <span className="portrait-initial" aria-hidden="true">{initial}</span>
        )}
      </div>
    </div>
  )
}

function Reel({ video, onOpen }) {
  const ref = useRef(null)
  const play = () => { const v = ref.current; if (v) { v.currentTime = 0; v.play().catch(() => {}) } }
  const stop = () => { const v = ref.current; if (v) { v.pause(); v.currentTime = 0.6 } }
  return (
    <button className="reel" onClick={() => onOpen(video)} onMouseEnter={play} onMouseLeave={stop} onFocus={play} onBlur={stop} aria-label={`Play ${video.title}`}>
      <video ref={ref} src={`${video.url}#t=0.6`} preload="metadata" muted playsInline loop />
      <span className="reel-title">{video.title}</span>
    </button>
  )
}

function Player({ video, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={video.title} onClick={onClose}>
      <div className="player" onClick={(e) => e.stopPropagation()}>
        <video src={video.url} controls autoPlay playsInline />
        <div className="player-bar">
          <span>{video.title}</span>
          <button onClick={onClose} autoFocus>Close</button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState(null)
  const close = useCallback(() => setActive(null), [])
  const total = clients.reduce((n, c) => n + c.videos.length, 0)
  const hasAbout = Boolean(config.bio || config.bioLead)
  const links = [
    config.instagram && ['Instagram', config.instagram],
    config.youtube && ['YouTube', config.youtube],
  ].filter(Boolean)

  return (
    <>
      <header className="top">
        <a href="#top" className="brand">{config.name}</a>
        <nav>
          <a href="#work">Work</a>
          {hasAbout && <a href="#about">About</a>}
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="role">{config.role}</p>
            <h1>{config.name}</h1>
            {config.tagline && <p className="tagline">{config.tagline}</p>}
            <a className="cta" href="#work">Watch the reels</a>
          </div>
          <Portrait />
        </section>

        <section id="work" className="work">
          <h2>My work</h2>
          <p className="work-sub">Hover to preview, click to watch with sound.</p>
          {clients.length === 0 && (
            <p className="empty">No videos yet. Add a folder per client inside <code>src/clients/</code> and put the videos in it.</p>
          )}
          {clients.map((c) => (
            <article className="client" key={c.folder}>
              <div className="client-head">
                <h3>{c.title}</h3>
                {c.description && <p>{c.description}</p>}
              </div>
              <div className="row">
                {c.videos.map((v) => <Reel key={v.id} video={v} onOpen={setActive} />)}
              </div>
            </article>
          ))}
        </section>

        {hasAbout && (
          <section id="about" className="about">
            <p className="eyebrow">About</p>
            {config.bioLead && <h2 className="about-lead">{config.bioLead}</h2>}
            <div className="about-grid">
              {config.bio && <p className="about-body">{config.bio}</p>}
              <dl className="stats">
                <div><dt>Reels</dt><dd>{config.statReels || total}</dd></div>
                <div><dt>Clients</dt><dd>{config.statClients || clients.length}</dd></div>
                <div><dt>Languages</dt><dd>{config.statLanguages}</dd></div>
              </dl>
            </div>
            {config.skills.length > 0 && (
              <ul className="skills">
                {config.skills.map((s) => <li key={s}>{s}</li>)}
              </ul>
            )}
            <ul className="tools" aria-label="Tools I use">
              {tools.map(([name, logo]) => (
                <li key={name}><img src={logo} alt="" /><span>{name}</span></li>
              ))}
            </ul>
          </section>
        )}

        <section id="contact" className="contact">
          <h2>Have a video in mind?</h2>
          <div className="contact-list">
            {config.email && <a href={`mailto:${config.email}`}>{config.email}</a>}
            {config.phone && <a href={`tel:${config.phone.replace(/\s/g, '')}`}>{config.phone}</a>}
            {links.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}
          </div>
          {config.location && <p className="loc">Based in {config.location}</p>}
        </section>
      </main>

      {active && <Player video={active} onClose={close} />}
    </>
  )
}
