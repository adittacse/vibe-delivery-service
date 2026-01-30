import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content mt-12">
      <div className="container mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold">Vibe Delivery</h3>
          <p className="text-sm text-muted mt-2">Modern local delivery platform tailored for small businesses — reliable, fast, and transparent.</p>
        </div>

        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="link link-hover">About</a></li>
            <li><a className="link link-hover">Careers</a></li>
            <li><a className="link link-hover">Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="text-sm mt-2">hello@vibedelivery.example</p>
          <p className="text-sm mt-2">+1 (555) 123-4567</p>
          <div className="flex gap-3 mt-3 text-xl">
            <a className="link">🌐</a>
            <a className="link">🐦</a>
            <a className="link">📘</a>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 py-4">
        <div className="container mx-auto px-4 text-sm text-center text-muted">© {new Date().getFullYear()} Vibe Delivery — All rights reserved.</div>
      </div>
    </footer>
  )
}
