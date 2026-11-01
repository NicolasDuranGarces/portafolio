/* eslint-disable react-refresh/only-export-components -- data and its icon component live together in this prototype */
import {
  siApachekafka,
  siAppium,
  siPuppeteer,
  siClaude,
  siDjango,
  siDocker,
  siEclipsemosquitto,
  siElevenlabs,
  siExpress,
  siFastapi,
  siFlask,
  siFlutter,
  siGitlab,
  siGooglechrome,
  siGooglegemini,
  siModelcontextprotocol,
  siMqtt,
  siMysql,
  siN8n,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPrisma,
  siPython,
  siQdrant,
  siRabbitmq,
  siReact,
  siRedis,
  siSelenium,
  siServerless,
  siSpringboot,
  siTailwindcss,
  siTerraform,
  siTypescript,
  siVite,
  type SimpleIcon,
} from 'simple-icons'

/**
 * Every technology named in "Competencias clave" and the roles of the CV, grouped the same way, plus the automation tools
 * the owner added directly (Playwright, Puppeteer, Appium). AWS, Azure, OpenAI, Twilio, BullMQ and Playwright have no mark
 * in Simple Icons (brand restrictions), so they show the name only.
 */
export type Tech = { name: string; icon?: SimpleIcon; detail?: string }
export type TechGroup = { id: string; title: string; items: Tech[]; practices?: string[] }

export const techGroups: TechGroup[] = [
  {
    id: 'backend',
    title: 'Lenguajes y backend',
    items: [
      { name: 'Python', icon: siPython },
      { name: 'FastAPI', icon: siFastapi },
      { name: 'Django', icon: siDjango },
      { name: 'Flask', icon: siFlask },
      { name: 'Java', icon: siOpenjdk },
      { name: 'Spring Boot 3', icon: siSpringboot },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'NestJS', icon: siNestjs },
      { name: 'Express', icon: siExpress },
    ],
    practices: ['APIs REST', 'Microservicios', 'Arquitectura hexagonal'],
  },
  {
    id: 'ai',
    title: 'IA y LLMs',
    items: [
      { name: 'API de OpenAI' },
      { name: 'Gemini', icon: siGooglegemini },
      { name: 'Claude Code', icon: siClaude },
      { name: 'MCP', icon: siModelcontextprotocol },
      { name: 'Qdrant', icon: siQdrant },
      { name: 'ElevenLabs', icon: siElevenlabs },
      { name: 'Twilio' },
      { name: 'n8n', icon: siN8n },
    ],
    practices: ['Agentes con tool calling', 'RAG con embeddings', 'Voz a texto y texto a voz'],
  },
  {
    id: 'cloud',
    title: 'Cloud y DevOps',
    items: [
      { name: 'AWS', detail: 'Lambda, EC2, ECS Fargate, IoT Core, Amplify, CloudFormation, CloudFront, MSK' },
      { name: 'Azure' },
      { name: 'Docker', icon: siDocker },
      { name: 'Terraform', icon: siTerraform },
      { name: 'Nginx', icon: siNginx },
      { name: 'Serverless', icon: siServerless },
      { name: 'GitLab CI', icon: siGitlab },
    ],
    practices: ['CI/CD'],
  },
  {
    id: 'data',
    title: 'Datos y mensajería',
    items: [
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'MySQL', icon: siMysql },
      { name: 'Redis', icon: siRedis },
      { name: 'Prisma', icon: siPrisma },
      { name: 'Kafka', icon: siApachekafka },
      { name: 'RabbitMQ', icon: siRabbitmq },
      { name: 'BullMQ' },
      { name: 'MQTT', icon: siMqtt },
      { name: 'Mosquitto', icon: siEclipsemosquitto },
    ],
  },
  {
    id: 'automation',
    title: 'Automatización',
    items: [
      { name: 'Selenium Grid', icon: siSelenium },
      { name: 'Playwright' },
      { name: 'Puppeteer', icon: siPuppeteer },
      { name: 'Appium', icon: siAppium },
      { name: 'Extensiones de Chrome', icon: siGooglechrome },
    ],
    practices: ['Web scraping', 'RPA'],
  },
  {
    id: 'frontend',
    title: 'Frontend y móvil',
    items: [
      { name: 'React', icon: siReact },
      { name: 'Next.js', icon: siNextdotjs },
      { name: 'Vite', icon: siVite },
      { name: 'Tailwind', icon: siTailwindcss },
      { name: 'React Native', icon: siReact },
      { name: 'Flutter Web', icon: siFlutter },
    ],
  },
]

/** The short list for the fixed column: what the CV headline and most roles lean on. */
export const coreTech: Tech[] = [
  { name: 'Python', icon: siPython },
  { name: 'Java', icon: siOpenjdk },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'FastAPI', icon: siFastapi },
  { name: 'Spring Boot', icon: siSpringboot },
  { name: 'NestJS', icon: siNestjs },
  { name: 'Docker', icon: siDocker },
  { name: 'AWS' },
]

/** Monochrome mark: the page has one accent color, so brand colors stay out. */
export function TechIcon({ icon, className }: { icon: SimpleIcon; className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={icon.path} />
    </svg>
  )
}
