import Link from 'next/link'
import Image from 'next/image'

import { NextJS, V0, TypeScript, Tailwind, Vercel } from '@/app/utils/icons'

const technologies = [
  { name: 'V0', logo: V0, url: 'https://v0.dev/' },
  { name: 'Next.js', logo: NextJS, url: 'https://nextjs.org/' },
  { name: 'Vercel', logo: Vercel, url: 'https://vercel.com/' },
]

export function Footer() {
  return (
    <footer className="bg-neutral-300 mt-12 py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700">
            Sitio desarrollado por{' '}
            <Link
              href="https://torto-dev.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-neutral-800 text-primary hover:underline"
            >
              Marco Tortolani
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6">
          {technologies.map((tech) => (
            <Link
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center group"
            >
              <div className="w-8 h-8 mb-2 relative group-hover:scale-110 transition-transform">
                <tech.logo />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">
                {tech.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
