import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { useLanguage } from '../components/LanguageProvider'
import { FiCpu, FiCode, FiCloud, FiShield, FiZap, FiDatabase, FiTerminal } from 'react-icons/fi'

// Expanded skill lists with comprehensive AWS services
const backend = [
  'Python', 'FastAPI', 'Django', 'Flask', 
  'Java', 'Spring Boot', 'Spring Cloud',
  'Node.js', 'Express', 'NestJS',
  'Go', 'Gin', 'Echo',
  'GraphQL', 'REST APIs', 'gRPC',
  'ORM (SQLAlchemy, Hibernate)', 'DB Architecture', 'Query Optimization'
]

const databases = [
  'PostgreSQL', 'MySQL', 'MariaDB',
  'MongoDB', 'DynamoDB', 'Cassandra',
  'Redis', 'Memcached', 'ElastiCache',
  'Elasticsearch', 'OpenSearch',
  'TimescaleDB', 'InfluxDB'
]

const frontend = [
  'React', 'TypeScript', 'JavaScript',
  'Vite', 'Webpack', 'CSS Modules', 
  'Tailwind CSS', 'Material-UI',
  'Next.js', 'React Query'
]

const ai = [
  'AI Agents', 'MCP (Model Context Protocol)',
  'LLMs Integration', 'RAG (Retrieval Augmented Generation)',
  'OpenAI API', 'Anthropic Claude', 'Gemini API',
  'Langchain', 'LlamaIndex',
  'Prompt Engineering', 'Vector Databases',
  'Embeddings', 'Fine-tuning'
]

// Comprehensive AWS services list
const aws = [
  // Compute
  'EC2', 'ECS', 'Fargate', 'Lambda', 'Batch',
  // Storage
  'S3', 'EBS', 'EFS', 'Glacier',
  // Database
  'RDS (PostgreSQL/MySQL)', 'DynamoDB', 'ElastiCache', 'DocumentDB',
  // Networking
  'VPC', 'Route 53', 'CloudFront', 'API Gateway', 'Load Balancer (ALB/NLB)',
  // Security & Identity
  'IAM', 'Secrets Manager', 'KMS', 'Cognito', 'WAF', 'Shield',
  // Monitoring & Management
  'CloudWatch', 'CloudTrail', 'X-Ray', 'Systems Manager',
  // CI/CD & Developer Tools
  'CodePipeline', 'CodeBuild', 'CodeDeploy', 'ECR',
  // Messaging & Integration
  'SQS', 'SNS', 'EventBridge', 'Step Functions',
  // Analytics
  'Athena', 'Glue', 'Kinesis'
]

const cloudDevOps = [
  // Azure
  'Azure App Service', 'Azure Functions', 'Azure DevOps', 'Azure Storage',
  // Container Orchestration
  'Kubernetes', 'Docker', 'Docker Compose', 'Helm',
  // CI/CD
  'GitLab CI/CD', 'GitHub Actions', 'Jenkins', 'ArgoCD',
  // Infrastructure as Code
  'Terraform', 'CloudFormation', 'Ansible',
  // Web Servers & Proxies
  'Nginx', 'Apache', 'Traefik', 'HAProxy',
  // Linux & Scripting
  'Linux Administration', 'Bash', 'PowerShell'
]

const qualitySecurity = [
  // Testing
  'Unit Testing (pytest, JUnit)', 'Integration Testing', 
  'E2E Testing', 'Load Testing (Locust, JMeter)',
  'TDD', 'BDD',
  // Code Quality
  'Static Analysis (SonarQube, Pylint)', 'Code Coverage',
  'Pre-commit Hooks', 'Linting',
  // Security
  'Security Best Practices', 'OWASP Top 10',
  'Dependency Scanning', 'Container Security',
  'Secrets Management', 'SSL/TLS',
  // Architecture
  'Clean Architecture', 'Domain-Driven Design',
  'Microservices', 'Event-Driven Architecture',
  // Standards
  'OpenAPI/Swagger', 'API Versioning'
]

const container = { show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export function Skills() {
  const { t } = useLanguage()
  
  const categories = [
    { 
      icon: FiCpu, 
      title: 'Backend & Application Development', 
      skills: backend, 
      color: 'var(--primary)',
      description: 'Experiencia profunda en desarrollo backend con múltiples frameworks y lenguajes'
    },
    { 
      icon: FiDatabase, 
      title: 'Databases & Data Engineering', 
      skills: databases, 
      color: 'var(--accent)',
      description: 'Arquitectura de datos, optimización de queries, y gestión de bases relacionales y NoSQL'
    },
    { 
      icon: FiCloud, 
      title: 'AWS Cloud Services (Comprehensive)', 
      skills: aws, 
      color: '#FF9900',
      description: 'Experiencia extensa con servicios AWS - compute, storage, networking, security, y más'
    },
    { 
      icon: FiTerminal, 
      title: 'Cloud, DevOps & Infrastructure', 
      skills: cloudDevOps, 
      color: 'var(--primary)',
      description: 'Azure, Kubernetes, CI/CD, IaC, y administración de sistemas Linux'
    },
    { 
      icon: FiZap, 
      title: 'AI & Machine Learning Integration', 
      skills: ai, 
      color: 'var(--success)',
      description: 'Integración de LLMs, RAG, AI Agents, y soluciones de IA generativa en producción'
    },
    { 
      icon: FiCode, 
      title: 'Frontend & UI Development', 
      skills: frontend, 
      color: 'var(--accent)',
      description: 'Desarrollo frontend moderno con React, TypeScript, y tooling contemporáneo'
    },
    { 
      icon: FiShield, 
      title: 'Quality, Security & Architecture', 
      skills: qualitySecurity, 
      color: '#dc2626',
      description: 'Testing exhaustivo, seguridad, arquitectura limpia, y mejores prácticas'
    },
  ]

  return (
    <Section id="skills" title={t('skills.title')} lead={t('skills.lead')}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}
      >
        {categories.map((category) => (
          <motion.article key={category.title} variants={item} className="card fancy" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: `color-mix(in oklab, ${category.color} 10%, transparent)`,
                border: `1px solid color-mix(in oklab, ${category.color} 20%, transparent)`,
                display: 'grid',
                placeItems: 'center',
                color: category.color,
                fontSize: '1.5rem',
                flexShrink: 0
              }}>
                <category.icon />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', lineHeight: '1.3' }}>{category.title}</h3>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.4' }}>
                  {category.description}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' }}>
              {category.skills.map(skill => (
                <span key={skill} className="badge" style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}>
                  {skill}
                </span>
              ))}
            </div>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid color-mix(in oklab, var(--text) 8%, transparent)', fontSize: '0.85rem', color: 'var(--muted)' }}>
              {category.skills.length} tecnologías
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}
