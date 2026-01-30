import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  { name: 'Aisha K.', company: 'Aisha Boutique', quote: 'Vibe cut our delivery times in half — customers love it.', role: 'Shop owner', img: 'https://i.pravatar.cc/120?img=32' },
  { name: 'Carlos M.', company: 'C-Market', quote: 'Reliable couriers and great tracking.', role: 'Marketplace seller', img: 'https://i.pravatar.cc/120?img=12' },
  { name: 'Jen P.', company: 'Jen & Co', quote: 'Easy scheduling and excellent support.', role: 'Small business', img: 'https://i.pravatar.cc/120?img=47' }
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  function prev() {
    setIndex(i => (i - 1 + testimonials.length) % testimonials.length)
  }
  function next() {
    setIndex(i => (i + 1) % testimonials.length)
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-center mb-6">What customers say</h2>

      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence initial={false} mode="wait">
          {testimonials.map((t, i) => i === index && (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6 }}
              className="card p-6 bg-base-100 shadow-lg flex gap-4 items-center"
            >
              <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full object-cover shadow" />
              <div>
                <p className="mb-3 text-lg">“{t.quote}”</p>
                <div className="font-semibold">{t.name} <span className="text-sm text-muted">— {t.role}</span></div>
                <div className="text-sm text-primary">{t.company}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="absolute inset-x-0 top-1/2 flex justify-between px-2 -translate-y-1/2">
          <button aria-label="Previous testimonial" onClick={prev} className="btn btn-circle btn-ghost">‹</button>
          <button aria-label="Next testimonial" onClick={next} className="btn btn-circle btn-ghost">›</button>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full ${i === index ? 'bg-primary' : 'bg-base-300'}`} aria-label={`Go to testimonial ${i+1}`}></button>
          ))}
        </div>
      </div>
    </section>
  )
}
