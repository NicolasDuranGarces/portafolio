import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '../components/Section'
import { SocialLinks } from '../components/SocialLinks'
import { useLanguage } from '../components/LanguageProvider'

const container = { show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export function Contact() {
  const { t, lang } = useLanguage()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    
    try {
      const response = await fetch('https://formspree.io/f/xwjqaopj', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <Section id="contact" title={t('contact.title')} lead={t('contact.lead')}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, .8fr)', gap: '2rem' }}
      >
        <motion.div variants={item} className="card fancy" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '3rem 2rem',
                  minHeight: '300px'
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    boxShadow: '0 0 40px color-mix(in oklab, var(--primary) 40%, transparent)'
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem' }}>
                  {lang === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
                </h3>
                <p style={{ color: 'var(--muted)', margin: 0 }}>
                  {lang === 'es' 
                    ? 'Gracias por contactarme. Te responderé pronto.' 
                    : 'Thanks for reaching out. I\'ll get back to you soon.'}
                </p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                aria-label={t('contact.formAria')}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <label>
                    <div style={{ marginBottom: '0.5rem', fontWeight: 500 }}>{t('contact.name')}</div>
                    <input 
                      required 
                      placeholder={t('contact.placeholders.name')} 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                    />
                  </label>
                  <label>
                    <div style={{ marginBottom: '0.5rem', fontWeight: 500 }}>{t('contact.email')}</div>
                    <input 
                      type="email" 
                      required 
                      placeholder={t('contact.placeholders.email')} 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                    />
                  </label>
                </div>
                <label style={{ display: 'block', marginTop: '1rem' }}>
                  <div style={{ marginBottom: '0.5rem', fontWeight: 500 }}>{t('contact.message')}</div>
                  <textarea 
                    required 
                    rows={5} 
                    placeholder={t('contact.placeholders.message')} 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                  />
                </label>
                <div style={{ marginTop: '1.5rem' }}>
                  <button 
                    className="btn" 
                    type="submit"
                    disabled={status === 'sending'}
                    style={{ 
                      opacity: status === 'sending' ? 0.7 : 1,
                      cursor: status === 'sending' ? 'wait' : 'pointer'
                    }}
                  >
                    {status === 'sending' ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          style={{ display: 'inline-block', width: '16px', height: '16px' }}
                        >
                          ⏳
                        </motion.span>
                        {lang === 'es' ? 'Enviando...' : 'Sending...'}
                      </span>
                    ) : (
                      t('contact.send')
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          variants={item}
          className="card fancy" 
          style={{ padding: '2rem', display: 'grid', alignContent: 'center', gap: '1rem' }}
        >
          <h3 style={{ margin: 0 }}>{t('contact.socialTitle')}</h3>
          <p style={{ color: 'var(--muted)', marginTop: 0 }}>{t('contact.socialLead')}</p>
          <SocialLinks
            github="https://github.com/NicolasDuranGarces"
            linkedin="https://www.linkedin.com/in/garcesnicolas/"
            email="niduga@outlook.es"
          />
        </motion.div>
      </motion.div>
      
      <style>{`
        @media (max-width: 768px) {
          #contact > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Section>
  )
}

