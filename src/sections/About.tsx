import { motion } from 'framer-motion'
import { FiMapPin, FiClock, FiZap, FiCoffee, FiCode, FiCpu, FiServer, FiAward, FiTrendingUp } from 'react-icons/fi'
import { useLanguage } from '../components/LanguageProvider'
import { Section } from '../components/Section'

const container = { show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export function About() {
  const { t } = useLanguage()
  const story = t('about.story').split('|').map((item) => item.trim()).filter(Boolean)
  const principles = t('about.principles').split('|').map((item) => item.trim()).filter(Boolean)

  return (
    <Section id="about" title={t('about.title')} lead={t('about.lead')}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        style={{ display: 'grid', gap: '2rem' }}
      >
        {/* Profile Card - Expanded */}
        <motion.article variants={item} className="card fancy" style={{ padding: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <FiCoffee style={{ fontSize: '2rem', color: 'var(--primary)' }} />
              <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{t('about.tagline')}</h2>
            </div>
            <div style={{ color: 'var(--muted)', lineHeight: '1.7', fontSize: '1rem' }}>
              {story.map((paragraph, i) => (
                <p key={i} style={{ marginBottom: '1rem' }}>{paragraph}</p>
              ))}
              
              {/* Expertise adicional */}
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'color-mix(in oklab, var(--primary) 5%, transparent)', borderRadius: '12px', border: '1px solid color-mix(in oklab, var(--primary) 15%, transparent)' }}>
                <h4 style={{ margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiTrendingUp style={{ color: 'var(--primary)' }} />
                  Experiencia Destacada
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                  <li>Diseño e implementación de arquitecturas escalables con microservicios en AWS/Azure</li>
                  <li>Optimización de bases de datos relacionales y NoSQL para alto rendimiento</li>
                  <li>Integración de LLMs y sistemas de IA en aplicaciones empresariales</li>
                  <li>Liderazgo técnico en equipos distribuidos y mentoría de desarrolladores junior</li>
                  <li>Implementación de pipelines CI/CD completos con GitLab CI y GitHub Actions</li>
                  <li>Desarrollo de APIs RESTful y GraphQL con documentación OpenAPI</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Stats Row - Enhanced */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <motion.article variants={item} className="card fancy" style={{ padding: '2rem' }}>
            <FiMapPin style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }} />
            <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{t('about.meta.location')}</strong>
            <span style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{t('about.meta.locationValue')}</span>
            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
              Disponible para trabajo remoto en América Latina, USA y Europa
            </p>
          </motion.article>

          <motion.article variants={item} className="card fancy" style={{ padding: '2rem' }}>
            <FiClock style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }} />
            <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{t('about.meta.experience')}</strong>
            <span style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{t('about.meta.experienceValue')}</span>
            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
              Liderazgo en backend, arquitectura de datos, y DevOps cloud-native
            </p>
          </motion.article>

          <motion.article variants={item} className="card fancy" style={{ padding: '2rem' }}>
            <FiZap style={{ fontSize: '2rem', color: 'var(--success)', marginBottom: '1rem' }} />
            <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{t('about.meta.availability')}</strong>
            <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.95rem' }}>{t('about.meta.availabilityValue')}</span>
            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
              Roles backend senior, arquitectura de soluciones, consultorías DevOps
            </p>
          </motion.article>
        </div>

        {/* Certifications & Achievements */}
        <motion.article variants={item} className="card fancy" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <FiAward style={{ fontSize: '2rem', color: 'var(--primary)' }} />
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Logros Profesionales</h3>
          </div>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                🚀 Escalabilidad & Performance
              </strong>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: '1.6' }}>
                Optimización de sistemas procesando 1M+ requests/día, reduciendo latencia en ~60% mediante caching estratégico y arquitectura asíncrona
              </p>
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                ☁️ Cloud Migration & Infrastructure
              </strong>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: '1.6' }}>
                Migración exitosa de monolitos a microservicios en AWS/Azure, implementando IaC con Terraform y automatización completa
              </p>
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                🤖 AI & Innovation
              </strong>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: '1.6' }}>
                Integración de LLMs en productos empresariales (RAG, AI Agents, MCP), entrega de features de IA generativa en producción
              </p>
            </div>
          </div>
        </motion.article>

        {/* Principles Card - Enhanced */}
        <motion.article variants={item} className="card fancy" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <FiCode style={{ fontSize: '2rem', color: 'var(--primary)' }} />
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Principios de Trabajo & Metodologías</h3>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            {principles.map((principle) => (
              <span key={principle} className="badge" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                {principle}
              </span>
            ))}
          </div>
          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text)' }}>Testing & Quality</strong>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
                <li>TDD / BDD</li>
                <li>Unit & Integration Testing</li>
                <li>Code Coverage +80%</li>
              </ul>
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text)' }}>Architecture</strong>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
                <li>Clean Architecture</li>
                <li>Domain-Driven Design</li>
                <li>SOLID Principles</li>
              </ul>
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text)' }}>Collaboration</strong>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
                <li>Agile / Scrum</li>
                <li>Code Reviews</li>
                <li>Technical Mentoring</li>
              </ul>
            </div>
          </div>
        </motion.article>

        {/* Home Lab Card - Enhanced */}
        <motion.article variants={item} className="card fancy" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <FiServer style={{ fontSize: '2rem', color: 'var(--primary)' }} />
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Home Lab & Infraestructura Personal</h3>
          </div>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
            Entusiasta del auto-hospedaje y DevOps casero. Gestiono una infraestructura de servidores dedicados expuestos a internet con monitoreo 24/7, 
            seguridad enterprise-grade, y alta disponibilidad. Experiencia hands-on en administración de sistemas Linux, networking, y containerización.
          </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div style={{ padding: '1.25rem', background: 'color-mix(in oklab, var(--panel) 50%, transparent)', borderRadius: '12px' }}>
                  <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1rem' }}>🖥️ Virtualización & Containers</strong>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="badge">Proxmox VE</span>
                    <span className="badge">Docker Swarm</span>
                    <span className="badge">Portainer</span>
                    <span className="badge">Ubuntu Server</span>
                  </div>
                </div>
                
                <div style={{ padding: '1.25rem', background: 'color-mix(in oklab, var(--panel) 50%, transparent)', borderRadius: '12px' }}>
                  <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1rem' }}>🔒 Security & Networking</strong>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="badge">Cloudflare Tunnels</span>
                    <span className="badge">Nginx Proxy Manager</span>
                    <span className="badge">SSL/TLS Certs</span>
                    <span className="badge">Firewall Rules</span>
                  </div>
                </div>
                
                <div style={{ padding: '1.25rem', background: 'color-mix(in oklab, var(--panel) 50%, transparent)', borderRadius: '12px' }}>
                  <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1rem' }}>📊 Monitoring & Observability</strong>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="badge">Grafana</span>
                    <span className="badge">Prometheus</span>
                    <span className="badge">Uptime Kuma</span>
                    <span className="badge">Logs Aggregation</span>
                  </div>
                </div>
                
                <div style={{ padding: '1.25rem', background: 'color-mix(in oklab, var(--panel) 50%, transparent)', borderRadius: '12px' }}>
                  <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1rem' }}>🎮 Services & Apps</strong>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="badge">Minecraft Server</span>
                    <span className="badge">Terraria Server</span>
                    <span className="badge">Media Server</span>
                    <span className="badge">Git Server</span>
                  </div>
                </div>
              </div>
        </motion.article>
      </motion.div>
    </Section>
  )
}
