import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Instagram, Globe } from 'lucide-react'

import { NextJS, V0, Vercel } from '@/app/utils/icons'

const technologies = [
  { name: 'V0', logo: V0, url: 'https://v0.dev/' },
  { name: 'Next.js', logo: NextJS, url: 'https://nextjs.org/' },
  { name: 'Vercel', logo: Vercel, url: 'https://vercel.com/' },
]

export function Footer() {
  return (
    <footer className="bg-gray-100 mt-12 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <p className="text-lg text-gray-700 mb-4 text-center sm:text-left">
              Desarrollado por{' '}
              <span className="font-semibold">Marco Tortolani</span>
            </p>
            <div className=" flex justify-center sm:justify-start space-x-4">
              <Link
                href="https://www.linkedin.com/in/marco-tortolani/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6 text-gray-600 hover:text-primary" />
              </Link>

              <Link
                href="https://www.instagram.com/marco.tortolani/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6 text-gray-600 hover:text-primary" />
              </Link>
              <Link
                href="https://tortolani.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-6 h-6 text-gray-600 hover:text-primary" />
              </Link>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700 mb-4 text-center sm:text-left">
              Powered by
            </p>
            <div className="flex justify-center sm:justify-end gap-4">
              {technologies.map((tech) => (
                <Link
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group"
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
        </div>
        <div className="border-t border-gray-200 pt-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
