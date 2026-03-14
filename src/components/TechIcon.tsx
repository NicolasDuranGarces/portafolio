import { createElement } from 'react'
import type { IconType } from 'react-icons'
import * as SI from 'react-icons/si'
import { FiAward, FiBookOpen, FiBox } from 'react-icons/fi'

const map: Record<string, string> = {
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
  aws: 'SiAmazonwebservices',
  'amazon web services': 'SiAmazonwebservices',
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
  celery: 'SiRabbitmq',
  serverless: 'SiServerless',
  'serverless framework': 'SiServerless',
  go: 'SiGo',
  golang: 'SiGo',
  'aws lambda': 'SiAmazonwebservices',
  lambda: 'SiAmazonwebservices',
  ec2: 'SiAmazonwebservices',
  s3: 'SiAmazonwebservices',
  ecr: 'SiAmazonwebservices',
  fargate: 'SiAmazonwebservices',
  dynamodb: 'SiAmazonwebservices',
  dynamo: 'SiAmazonwebservices',
  rds: 'SiAmazonwebservices',
  mysql: 'SiMysql',
  mongodb: 'SiMongodb',
  node: 'SiNodedotjs',
  nodejs: 'SiNodedotjs',
  'node.js': 'SiNodedotjs',
  java: 'SiJava',
  github: 'SiGithub',
  linkedin: 'SiLinkedin',
  openai: 'SiOpenai',
  codex: 'SiOpenai',
  anthropic: 'SiAnthropic',
  claude: 'SiAnthropic',
  'claude code': 'SiAnthropic',
}

export function TechIcon({ name, size = 16 }: { name: string; size?: number }) {
  const key = name.toLowerCase()
  if (key === 'education') return createElement(FiBookOpen, { size })
  if (key === 'certificate') return createElement(FiAward, { size })
  const iconName = map[key]
  const Icon = (SI as Record<string, IconType>)[iconName] as IconType | undefined
  if (!Icon) return createElement(FiBox, { size })
  return createElement(Icon, { size })
}
