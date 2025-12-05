import { Section } from '../components/Section'
import { experience } from '../data/experience'
import { useLanguage } from '../components/LanguageProvider'
import { useState, useEffect } from 'react'

// Company logo mapping (fallback for single logos)
const companyLogos: Record<string, string> = {
  'BetterWay Devs': '/assets/betterway-logo.svg',
  'Atlanticsoft': '/assets/atlanticsoft-logo.png',
  'Institución Universitaria EAM': '/assets/eam-logo.png',
}

export function Experience() {
  const { t, lang } = useLanguage()
  const items = experience[lang]
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])
  
  // Get company logos - prioritize logos array from data, fallback to mapping
  const getCompanyLogos = (company: string, logos?: string[]) => {
    if (logos && logos.length > 0) {
      return logos
    }
    const singleLogo = companyLogos[company]
    return singleLogo ? [singleLogo] : []
  }
  
  // Function to get company initials for fallback
  const getCompanyInitials = (company: string) => {
    const words = company.split(' ').filter(w => w !== '+' && w !== '&')
    if (words.length === 1) return company.substring(0, 2).toUpperCase()
    return words.slice(0, 2).map(w => w[0]).join('').toUpperCase()
  }
  
  // Parse period to get start and end
  const parsePeriod = (period: string) => {
    // Check if still ongoing - only for "Actualidad" or "Present"
    const isOngoing = period.toLowerCase().includes('actualidad') || 
                      period.toLowerCase().includes('present')
    
    // Extract years
    const years = period.match(/\d{4}/g) || []
    const startYear = years[0] || ''
    const endYear = years[1] || (isOngoing ? 'Actual' : '')
    
    return { startYear, endYear, isOngoing, fullPeriod: period }
  }

  const selectedExperience = selectedIndex !== null ? items[selectedIndex] : null
  
  return (
    <Section id="experience" title={t('experience.title')} lead={t('experience.lead')}>
      <div className="timeline-zigzag-container">
        {/* Decorative floating particles */}
        <div className="timeline-particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="timeline-particle" style={{ '--particle-index': i } as React.CSSProperties} />
          ))}
        </div>
        
        {/* Timeline horizontal line in the middle */}
        <div className="timeline-center-line">
          <div className="timeline-center-line-fill" />
        </div>
        
        {/* Timeline nodes in zigzag pattern */}
        <div className="timeline-zigzag">
          {items.map((e, index) => {
            const { startYear, endYear, isOngoing } = parsePeriod(e.period)
            const logos = getCompanyLogos(e.company, e.logos)
            const hasMultipleLogos = logos.length > 1
            const isHovered = hoveredIndex === index
            const isTop = index % 2 === 0  // Alternates: even = top, odd = bottom
            
            return (
              <div 
                key={e.company + e.period} 
                className={`timeline-zigzag-node ${isTop ? 'top' : 'bottom'} ${isHovered ? 'hovered' : ''} ${isOngoing ? 'ongoing' : ''}`}
                onClick={() => setSelectedIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ '--node-index': index } as React.CSSProperties}
              >
                {/* Connector line from node to center */}
                <div className="timeline-connector" />
                
                {/* Node dot with logo(s) */}
                <div className={`timeline-dot-large ${hasMultipleLogos ? 'dual-logo' : ''}`}>
                  <div className="timeline-dot-large-inner">
                    {logos.length > 0 ? (
                      <div className={`timeline-logos-container ${hasMultipleLogos ? 'dual' : ''}`}>
                        {logos.map((logo, i) => (
                          <img 
                            key={i} 
                            src={logo} 
                            alt={e.company} 
                            className={`timeline-logo-large ${hasMultipleLogos ? 'dual-logo-img' : ''}`} 
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="timeline-initials-large">{getCompanyInitials(e.company)}</span>
                    )}
                  </div>
                  <div className="timeline-dot-glow" />
                  {isOngoing && <div className="timeline-ongoing-pulse" />}
                  
                  {/* Click indicator */}
                  <div className="timeline-click-hint">
                    <span>👆</span>
                  </div>
                </div>
                
                {/* Basic info */}
                <div className="timeline-zigzag-info">
                  <div className="timeline-period-range">
                    <span className="timeline-year-start">{startYear}</span>
                    <span className="timeline-year-separator">→</span>
                    <span className={`timeline-year-end ${isOngoing ? 'ongoing' : ''}`}>
                      {isOngoing ? '●' : endYear}
                    </span>
                  </div>
                  <h3 className="timeline-zigzag-role">{e.role}</h3>
                  <p className="timeline-zigzag-company">{e.company}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal overlay */}
      {selectedExperience && (
        <div className="experience-modal-overlay" onClick={() => setSelectedIndex(null)}>
          <div className="experience-modal" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button className="experience-modal-close" onClick={() => setSelectedIndex(null)}>
              ✕
            </button>
            
            {/* Modal header */}
            <div className="experience-modal-header">
              <div className={`experience-modal-logos ${(getCompanyLogos(selectedExperience.company, selectedExperience.logos).length > 1) ? 'dual' : ''}`}>
                {getCompanyLogos(selectedExperience.company, selectedExperience.logos).length > 0 ? (
                  getCompanyLogos(selectedExperience.company, selectedExperience.logos).map((logo, i) => (
                    <img key={i} src={logo} alt={selectedExperience.company} />
                  ))
                ) : (
                  <span className="modal-initials">{getCompanyInitials(selectedExperience.company)}</span>
                )}
              </div>
              <div className="experience-modal-title">
                <h3>{selectedExperience.role}</h3>
                <p className="modal-company">{selectedExperience.company}</p>
                <span className="modal-period">{selectedExperience.period}</span>
              </div>
            </div>
            
            {/* Location */}
            {selectedExperience.location && (
              <div className="experience-modal-location">
                📍 {selectedExperience.location}
              </div>
            )}
            
            {/* Achievements */}
            <div className="experience-modal-achievements">
              <h4>{lang === 'es' ? 'Logros' : 'Achievements'}</h4>
              <ul>
                {selectedExperience.achievements.map((a, i) => (
                  <li key={i}>
                    <span className="achievement-bullet">✓</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Tech stack */}
            {selectedExperience.stack && (
              <div className="experience-modal-stack">
                <h4>{lang === 'es' ? 'Tecnologías' : 'Tech Stack'}</h4>
                <div className="modal-tags">
                  {selectedExperience.stack.map((s) => (
                    <span key={s} className="modal-tag">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Section>
  )
}

