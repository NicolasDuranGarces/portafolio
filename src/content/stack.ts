import type { Localized } from '../lib/lang'
import { both } from '../lib/lang'

type StackItem = {
  name: Localized<string>
  /** Technologies used inside the item, shown muted. */
  detail?: Localized<string>
}

type StackGroup = {
  id: string
  title: Localized<string>
  items: readonly StackItem[]
}

/** Groups mirror "Competencias clave" in the CV. No levels or percentages on purpose. */
export const stackGroups: readonly StackGroup[] = [
  {
    id: 'backend',
    title: both('Backend'),
    items: [
      { name: both('Python'), detail: both('FastAPI, Django, Flask') },
      {
        name: both('Java'),
        detail: {
          es: 'Spring Boot 3, microservicios, arquitectura hexagonal',
          en: 'Spring Boot 3, microservices, hexagonal architecture',
        },
      },
      { name: both('TypeScript/Node.js'), detail: both('NestJS, Express') },
      { name: { es: 'APIs REST', en: 'REST APIs' } },
    ],
  },
  {
    id: 'ai',
    title: { es: 'IA y LLMs', en: 'AI and LLMs' },
    items: [
      {
        name: { es: 'Integración de LLMs', en: 'LLM integration' },
        detail: { es: 'API de OpenAI, Gemini', en: 'OpenAI API, Gemini' },
      },
      { name: { es: 'Agentes con tool/function calling', en: 'Agents with tool/function calling' } },
      {
        name: both('RAG'),
        detail: { es: 'embeddings, Qdrant', en: 'embeddings, Qdrant' },
      },
      {
        name: { es: 'IA de voz', en: 'Voice AI' },
        detail: {
          es: 'Twilio, texto a voz con ElevenLabs, voz a texto',
          en: 'Twilio, ElevenLabs text to speech, speech to text',
        },
      },
      { name: both('Model Context Protocol (MCP)') },
      { name: both('Claude Code') },
      { name: both('N8N') },
    ],
  },
  {
    id: 'cloud',
    title: { es: 'Cloud y DevOps', en: 'Cloud and DevOps' },
    items: [
      {
        name: both('AWS'),
        detail: both('Lambda, EC2, ECS Fargate, IoT Core, Amplify, CloudFormation, CloudFront'),
      },
      { name: both('Azure') },
      { name: both('Docker') },
      { name: both('Terraform') },
      { name: both('Nginx') },
      { name: both('CI/CD') },
      { name: both('Serverless Framework') },
    ],
  },
  {
    id: 'data',
    title: { es: 'Datos y mensajería', en: 'Data and messaging' },
    items: [
      { name: both('PostgreSQL') },
      { name: both('MySQL') },
      { name: both('Redis') },
      { name: both('Prisma') },
      { name: both('Kafka'), detail: both('AWS MSK') },
      { name: both('RabbitMQ') },
      { name: both('BullMQ') },
      { name: both('MQTT'), detail: both('Mosquitto') },
    ],
  },
  {
    id: 'automation',
    title: { es: 'Automatización', en: 'Automation' },
    items: [
      { name: { es: 'Selenium Grid sobre Docker', en: 'Selenium Grid on Docker' } },
      { name: both('Web scraping') },
      {
        name: {
          es: 'Automatización robótica de procesos (RPA)',
          en: 'Robotic process automation (RPA)',
        },
      },
      { name: { es: 'Extensiones de Chrome', en: 'Chrome extensions' } },
    ],
  },
  {
    id: 'frontend',
    title: both('Frontend'),
    items: [
      { name: both('React') },
      { name: both('Next.js') },
      { name: both('Vite') },
      { name: both('Tailwind') },
      { name: both('React Native') },
      { name: both('Flutter Web') },
    ],
  },
]
