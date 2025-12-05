import { Section } from '../components/Section'
import { experience } from '../data/experience'
import { useLanguage } from '../components/LanguageProvider'
import { useState } from 'react'

// Company logo mapping
const companyLogos: Record<string, string> = {
  'BetterWay Devs': '/assets/betterway-logo.svg',
  'Atlanticsoft': '/assets/atlanticsoft-logo.png',
  'Institución Universitaria EAM': '/assets/eam-logo.png',
  'Quindío Inteligente (EAM + EDEQ)': '/assets/logo-edeq.png',
  'Osmed Gateway': '/assets/osmed-logo.png',
}

export function Experience() {
  const { t, lang } = useLanguage()
  const items = experience[lang]
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  
  // Get company logo
  const getCompanyLogo = (company: string) => {
    return companyLogos[company] || null
  }
  
  // Function to get company initials for fallback
  const getCompanyInitials = (company: string) => {
    const words = company.split(' ')
    if (words.length === 1) return company.substring(0, 2).toUpperCase()
    return words.slice(0, 2).map(w => w[0]).join('').toUpperCase()
  }
  
  // Extract year from period string
  const extractYear = (period: string) => {
    const match = period.match(/\d{4}/)
    return match ? match[0] : ''
  }
  
  return (
    <Section id="experience" title={t('experience.title')} lead={t('experience.lead')}>
      <div className="timeline-zigzag-container">
        {/* Timeline horizontal line in the middle */}
        <div className="timeline-center-line">
          <div className="timeline-center-line-fill" />
        </div>
        
        {/* Timeline nodes in zigzag pattern */}
        <div className="timeline-zigzag">
          {items.map((e, index) => {
            const year = extractYear(e.period)
            const logo = getCompanyLogo(e.company)
            const isActive = activeIndex === index
            const isTop = index % 2 === 0  // Alternates: even = top, odd = bottom
            
            return (
              <div 
                key={e.company + e.period} 
                className={`timeline-zigzag-node ${isTop ? 'top' : 'bottom'} ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                style={{ '--node-index': index } as React.CSSProperties}
              >
                {/* Connector line from node to center */}
                <div className="timeline-connector" />
                
                {/* Node dot with logo */}
                <div className="timeline-dot-large">
                  <div className="timeline-dot-large-inner">
                    {logo ? (
                      <img src={logo} alt={e.company} className="timeline-logo-large" />
                    ) : (
                      <span className="timeline-initials-large">{getCompanyInitials(e.company)}</span>
                    )}
                  </div>
                  <div className="timeline-dot-glow" />
                </div>
                
                {/* Basic info */}
                <div className="timeline-zigzag-info">
                  <span className="timeline-year-badge">{year}</span>
                  <h3 className="timeline-zigzag-role">{e.role}</h3>
                  <p className="timeline-zigzag-company">{e.company}</p>
                </div>
                
                {/* Detailed popup on hover */}
                <div className={`timeline-zigzag-popup ${isActive ? 'show' : ''}`}>
                  <div className="popup-header">
                    <div className="popup-icon">
                      {logo ? (
                        <img src={logo} alt={e.company} />
                      ) : (
                        <span>{getCompanyInitials(e.company)}</span>
                      )}
                    </div>
                    <div className="popup-title">
                      <h4>{e.role}</h4>
                      <p className="popup-company">{e.company}</p>
                      {e.location && <span className="popup-location">{e.location}</span>}
                    </div>
                    <span className="popup-period">{e.period}</span>
                  </div>
                  
                  <div className="popup-content">
                    <ul className="popup-achievements">
                      {e.achievements.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                    
                    {e.stack && (
                      <div className="popup-stack">
                        {e.stack.map((s) => (
                          <span key={s} className="popup-tag">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
