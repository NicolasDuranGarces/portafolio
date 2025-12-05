import { createElement } from 'react'
import type { IconType } from 'react-icons'
import * as SI from 'react-icons/si'
import { FiBox } from 'react-icons/fi'

// Mapa a nombres de íconos de react-icons/si (dinámico para evitar fallos si alguno no existe)
const map: Record<string, keyof typeof SI | string> = {
  python: 'SiPython',
  fastapi: 'SiFastapi',
  django: 'SiDjango',
  react: 'SiReact',
  typescript: 'SiTypescript',
  'type script': 'SiTypescript',
  js: 'SiJavascript',
  javascript: 'SiJavascript',
  vite: 'SiVite',
  docker: 'SiDocker',
  nginx: 'SiNginx',
  postgresql: 'SiPostgresql',
  postgres: 'SiPostgresql',
  express: 'SiExpress',
  redis: 'SiRedis',
  aws: 'SiAmazonaws', // si no existe en esta versión, caerá al fallback
  'amazon web services': 'SiAmazonaws',
  selenium: 'SiSelenium',
  appium: 'SiAppium',
  spring: 'SiSpring',
  'spring boot': 'SiSpring',
  'github actions': 'SiGithubactions',
  next: 'SiNextdotjs',
  'next.js': 'SiNextdotjs',
  tailwind: 'SiTailwindcss',
  'tailwind css': 'SiTailwindcss',
  graphql: 'SiGraphql',
  kubernetes: 'SiKubernetes',
  stripe: 'SiStripe',
  airflow: 'SiApacheairflow',
  pandas: 'SiPandas',
  supabase: 'SiSupabase',
  rabbitmq: 'SiRabbitmq',
  celery: 'SiRabbitmq', // aproximación
  serverless: 'SiServerless',
  'serverless framework': 'SiServerless',
  go: 'SiGo',
  golang: 'SiGo',
  // AWS services mapping to AWS brand icon
  'aws lambda': 'SiAmazonaws',
  lambda: 'SiAmazonaws',
  ec2: 'SiAmazonaws',
  s3: 'SiAmazonaws',
  ecr: 'SiAmazonaws',
  fargate: 'SiAmazonaws',
  dynamodb: 'SiAmazonaws',
  dynamo: 'SiAmazonaws',
  rds: 'SiAmazonaws',
  // Databases
  mysql: 'SiMysql',
  mongodb: 'SiMongodb',
}

export function TechIcon({ name, size = 16 }: { name: string; size?: number }) {
  const key = name.toLowerCase()
  const iconName = map[key]
  const Icon = (SI as Record<string, IconType>)[iconName] as IconType | undefined
  if (!Icon) return createElement(FiBox, { size })
  return createElement(Icon, { size })
}
