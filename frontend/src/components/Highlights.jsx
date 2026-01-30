import React from 'react'
import { motion } from 'framer-motion'

const features = [
  { title: 'Speed', desc: 'Fast pickups and deliveries', badge: 'Faster routing' },
  { title: 'Reliability', desc: 'Consistent on-time performance', badge: 'Trusted couriers' },
  { title: 'Coverage', desc: 'Wide local coverage', badge: 'More zones' }
]

export default function Highlights() {
  return (
    <section className="py-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Why choose Vibe Delivery?</h2>
          <p className="text-muted mb-6">We focus on local businesses with tailored logistics, transparent pricing, and faster pickup times compared to competitors.</p>

          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }} className="p-4 bg-base-100 rounded-lg shadow">
                <div className="flex items-start gap-4">
                  <div className="badge badge-primary">{f.badge}</div>
                  <div>
                    <h4 className="font-semibold">{f.title}</h4>
                    <p className="text-sm text-muted">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Vibe vs Competitors</h3>
          <div className="overflow-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Vibe</th>
                  <th>Competitor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pickup Speed</td>
                  <td>Same-day</td>
                  <td>2-3 days</td>
                </tr>
                <tr>
                  <td>Transparent Pricing</td>
                  <td>Yes</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Local Support</td>
                  <td>Dedicated</td>
                  <td>General</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
