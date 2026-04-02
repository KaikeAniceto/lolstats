import { useState, useEffect } from 'react'
import './App.css'

const PARTICLES_CONFIG = [
  { color: '#C89B3C', size: 2,   x: 15, duration: 18, delay: 0,  drift: '30px'  },
  { color: '#0AC8B9', size: 1.5, x: 30, duration: 22, delay: 3,  drift: '-20px' },
  { color: '#C89B3C', size: 1,   x: 55, duration: 16, delay: 6,  drift: '15px'  },
  { color: '#0AC8B9', size: 2.5, x: 70, duration: 25, delay: 1,  drift: '-35px' },
  { color: '#C89B3C', size: 1.5, x: 85, duration: 20, delay: 9,  drift: '25px'  },
  { color: '#F0E6C0', size: 1,   x: 42, duration: 30, delay: 12, drift: '-15px' },
  { color: '#0AC8B9', size: 1,   x: 90, duration: 14, delay: 5,  drift: '10px'  },
  { color: '#C89B3C', size: 2,   x: 8,  duration: 19, delay: 14, drift: '-25px' },
]

function getOutcome(resultado) {
  const { kills, deaths, assists } = resultado
  if (kills === 0 && deaths === 0 && assists === 0) return 'remake'
  return resultado.win ? 'win' : 'loss'
}

function getKDARatio(kills, deaths, assists) {
  if (deaths === 0) return 'Perfect'
  return `${((kills + assists) / deaths).toFixed(2)} KDA`
}

export default function App() {
  const [gameName, setGameName]     = useState('')
  const [tagLine, setTagLine]       = useState('')
  const [resultado, setResultado]   = useState(null)
  const [erro, setErro]             = useState('')
  const [carregando, setCarregando] = useState(false)
  const [ddVersion, setDdVersion]   = useState('14.24.1')

  useEffect(() => {
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(r => r.json())
      .then(v => setDdVersion(v[0]))
      .catch(() => {})
  }, [])

  const buscar = async () => {
    if (!gameName || !tagLine) { setErro('Preencha o nome e a tag.'); return }
    setErro(''); setResultado(null); setCarregando(true)
    try {
      const res = await fetch(`http://localhost:8080/games/import/${gameName}/${tagLine}`, { method: 'POST' })
      if (res.ok) { setResultado(await res.json()) }
      else { setErro('Jogador não encontrado. Verifique o nome e a tag.') }
    } catch {
      setErro('Sem conexão com o servidor. O Spring Boot está rodando?')
    } finally { setCarregando(false) }
  }

  const handleKey = (e) => { if (e.key === 'Enter') buscar() }

  const outcome = resultado ? getOutcome(resultado) : null

  return (
    <div className="lol-app">

      {/* Background */}
      <div className="bg-canvas">
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%"   stopColor="#050F1E" />
              <stop offset="100%" stopColor="#020812" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bgGrad)" />
        </svg>
      </div>
      <div className="bg-noise" />
      <div className="bg-grid" />
      <div className="bg-vignette" />
      <div className="bg-glow-top" />

      {/* Particles */}
      {PARTICLES_CONFIG.map((p, i) => (
        <div key={i} className="particle" style={{
          left: `${p.x}%`,
          width: p.size,
          height: p.size,
          background: p.color,
          boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
          '--drift': p.drift,
        }} />
      ))}

      {/* Panel */}
      <div className="panel">
        <div className="panel-inner" style={{ position: 'relative' }}>

          {/* Header */}
          <div className="header">
            <div className="header-eyebrow">Summoner's Rift</div>
            <div className="header-title">LoL <span>Stats</span></div>
            <div className="header-divider">
              <div className="header-divider-icon">◆</div>
            </div>
          </div>

          {/* Form */}
          <div className="form-area">
            <div className="input-group">
              <label className="input-label">Invocador</label>
              <input
                className="lol-input"
                placeholder="Nome do Jogador"
                value={gameName}
                onChange={e => setGameName(e.target.value)}
                onKeyDown={handleKey}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Tag</label>
              <input
                className="lol-input"
                placeholder="BR1"
                value={tagLine}
                onChange={e => setTagLine(e.target.value)}
                onKeyDown={handleKey}
              />
            </div>

            <button className="lol-btn" onClick={buscar} disabled={carregando}>
              <span className="btn-shimmer" />
              <span style={{ position: 'relative', zIndex: 1 }}>
                {carregando ? 'Consultando Rift...' : 'Importar Partida'}
              </span>
            </button>

            {carregando && (
              <div>
                <div className="loading-bar">
                  <div className="loading-bar-inner" />
                </div>
                <div className="loading-text">Acessando servidores da Riot</div>
              </div>
            )}

            {erro && <div className="error-msg">{erro}</div>}
          </div>

          {/* Result */}
          {resultado && (
            <div className="result-area">
              <div className="result-header">
                <div className="result-header-line" />
                <div className="result-header-label">Última Partida</div>
                <div className="result-header-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,155,60,0.25))' }} />
              </div>

              <div className="card-match">
                <div className={`card-accent ${outcome}`} />
                <div className={`card-bg-glow ${outcome}`} />
                <div className="scan-line" />

                <div className="card-inner">
                  <div className="champ-frame">
                    <img
                      className="champ-img"
                      src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${resultado.champion}.png`}
                      alt={resultado.champion}
                      onError={e => { e.target.style.opacity = '0.3' }}
                    />
                  </div>

                  <div className="card-info">
                    <div className={`outcome-badge ${outcome}`}>
                      {outcome === 'win' ? '◆ Vitória' : outcome === 'loss' ? '◆ Derrota' : '◆ Recriação'}
                    </div>

                    <div className="champ-name">{resultado.champion}</div>

                    <div className="kda-row">
                      <span className="kda-num kda-kills">{resultado.kills}</span>
                      <span className="kda-slash">/</span>
                      <span className="kda-num kda-deaths">{resultado.deaths}</span>
                      <span className="kda-slash">/</span>
                      <span className="kda-num kda-assists">{resultado.assists}</span>
                      <span className="kda-label">K/D/A</span>
                    </div>

                    {outcome !== 'remake' && (
                      <div className="kda-ratio">
                        {getKDARatio(resultado.kills, resultado.deaths, resultado.assists)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="panel-footer">League of Legends · Riot Games</div>

        </div>
      </div>
    </div>
  )
}