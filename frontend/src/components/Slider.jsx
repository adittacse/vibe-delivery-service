import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import slideDelivery from '../assets/slide-delivery.svg'
import slideTracking from '../assets/slide-tracking.svg'
import slidePayments from '../assets/slide-payments.svg'

const slides = [
  { id: 1, title: 'Fast Delivery', subtitle: 'Same-day delivery in selected cities', img: slideDelivery },
  { id: 2, title: 'Realtime Tracking', subtitle: 'Live location updates and ETA', img: slideTracking },
  { id: 3, title: 'Secure Payments', subtitle: 'Multiple payment options and receipts', img: slidePayments }
]

export default function Slider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % slides.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      <AnimatePresence mode="wait">
        {slides.map((s, i) => i === index && (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-base-100 p-4 md:p-8"
          >
            <div className="h-56 md:h-72 w-full overflow-hidden rounded-lg shadow bg-base-200 flex items-center justify-center">
              <img
                src={s.img}
                alt={s.title}
                loading="lazy"
                onError={(e) => {
                  const txt = encodeURIComponent(s.title)
                  e.currentTarget.src = `https://via.placeholder.com/1400x900.png?text=${txt}`
                }}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-2xl md:text-4xl font-bold mb-3 text-neutral">{s.title}</h3>
              <p className="text-muted mb-4">{s.subtitle}</p>
              <div className="flex gap-3">
                <a href="#features" className="btn btn-primary">Learn More</a>
                <a href="#contact" className="btn btn-outline">Contact Sales</a>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}: ${s.title}`}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-primary' : 'bg-base-300'}`}
          >
            <span className="sr-only">Go to slide {i + 1}: {s.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
