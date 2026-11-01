import type { Localized } from '../lib/lang'
import { both } from '../lib/lang'
import * as marks from './tech-icons'

export type Tech = {
  name: Localized<string>
  /** SVG path of the brand mark (24x24 viewBox, see tech-icons.ts). AWS, Azure, OpenAI, Twilio, BullMQ and Playwright have none (brand restrictions): name only. */
  icon?: string
  /** Technologies used inside the item, shown muted. */
  detail?: Localized<string>
}

export type TechGroup = {
  id: string
  title: Localized<string>
  items: readonly Tech[]
  practices?: Localized<readonly string[]>
}

/**
 * Every technology named in "Competencias clave" and the roles of the CV, grouped the same way, plus the automation tools
 * added directly (Playwright, Puppeteer, Appium). No levels or percentages on purpose.
 */
export const techGroups: readonly TechGroup[] = [
  {
    id: 'backend',
    title: { es: 'Lenguajes y backend', en: 'Languages and backend' },
    items: [
      { name: both('Python'), icon: marks.python },
      { name: both('FastAPI'), icon: marks.fastapi },
      { name: both('Django'), icon: marks.django },
      { name: both('Flask'), icon: marks.flask },
      { name: both('Java'), icon: marks.openjdk },
      { name: both('Spring Boot 3'), icon: marks.springboot },
      { name: both('TypeScript'), icon: marks.typescript },
      { name: both('Node.js'), icon: marks.nodedotjs },
      { name: both('NestJS'), icon: marks.nestjs },
      { name: both('Express'), icon: marks.express },
    ],
    practices: {
      es: ['APIs REST', 'Microservicios', 'Arquitectura hexagonal'],
      en: ['REST APIs', 'Microservices', 'Hexagonal architecture'],
    },
  },
  {
    id: 'ai',
    title: { es: 'IA y LLMs', en: 'AI and LLMs' },
    items: [
      { name: { es: 'API de OpenAI', en: 'OpenAI API' } },
      { name: both('Gemini'), icon: marks.googlegemini },
      { name: both('Claude Code'), icon: marks.claude },
      { name: both('MCP'), icon: marks.modelcontextprotocol },
      { name: both('Qdrant'), icon: marks.qdrant },
      { name: both('ElevenLabs'), icon: marks.elevenlabs },
      { name: both('Twilio') },
      { name: both('n8n'), icon: marks.n8n },
    ],
    practices: {
      es: ['Agentes con tool calling', 'RAG con embeddings', 'Voz a texto y texto a voz'],
      en: ['Agents with tool calling', 'RAG with embeddings', 'Speech to text and text to speech'],
    },
  },
  {
    id: 'cloud',
    title: { es: 'Cloud y DevOps', en: 'Cloud and DevOps' },
    items: [
      {
        name: both('AWS'),
        detail: both('Lambda, EC2, ECS Fargate, IoT Core, Amplify, CloudFormation, CloudFront, MSK'),
      },
      { name: both('Azure') },
      { name: both('Docker'), icon: marks.docker },
      { name: both('Terraform'), icon: marks.terraform },
      { name: both('Nginx'), icon: marks.nginx },
      { name: both('Serverless'), icon: marks.serverless },
      { name: both('GitLab CI'), icon: marks.gitlab },
    ],
    practices: both(['CI/CD']),
  },
  {
    id: 'data',
    title: { es: 'Datos y mensajería', en: 'Data and messaging' },
    items: [
      { name: both('PostgreSQL'), icon: marks.postgresql },
      { name: both('MySQL'), icon: marks.mysql },
      { name: both('Redis'), icon: marks.redis },
      { name: both('Prisma'), icon: marks.prisma },
      { name: both('Kafka'), icon: marks.apachekafka },
      { name: both('RabbitMQ'), icon: marks.rabbitmq },
      { name: both('BullMQ') },
      { name: both('MQTT'), icon: marks.mqtt },
      { name: both('Mosquitto'), icon: marks.eclipsemosquitto },
    ],
  },
  {
    id: 'automation',
    title: { es: 'Automatización', en: 'Automation' },
    items: [
      { name: both('Selenium Grid'), icon: marks.selenium },
      { name: both('Playwright') },
      { name: both('Puppeteer'), icon: marks.puppeteer },
      { name: both('Appium'), icon: marks.appium },
      { name: { es: 'Extensiones de Chrome', en: 'Chrome extensions' }, icon: marks.googlechrome },
    ],
    practices: both(['Web scraping', 'RPA']),
  },
  {
    id: 'frontend',
    title: { es: 'Frontend y móvil', en: 'Frontend and mobile' },
    items: [
      { name: both('React'), icon: marks.react },
      { name: both('Next.js'), icon: marks.nextdotjs },
      { name: both('Vite'), icon: marks.vite },
      { name: both('Tailwind'), icon: marks.tailwindcss },
      { name: both('React Native'), icon: marks.react },
      { name: both('Flutter Web'), icon: marks.flutter },
    ],
  },
]

/** The short list for the side column: what the CV headline and most roles lean on. Entries of the catalog, not copies. */
const coreNames = ['Python', 'Java', 'TypeScript', 'FastAPI', 'Spring Boot 3', 'NestJS', 'Docker', 'AWS']

export const coreTech: readonly Tech[] = coreNames.map((name) => {
  const tech = techGroups.flatMap((group) => group.items).find((item) => item.name.es === name)
  if (!tech) throw new Error(`coreTech: "${name}" is not in the catalog`)
  return tech
})
