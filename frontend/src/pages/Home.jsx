import React from 'react'
import Slider from '../components/Slider'
import Highlights from '../components/Highlights'
import Testimonials from '../components/Testimonials'

export default function Home() {
  return (
    <div className="space-y-12">
      <section>
        <Slider />
      </section>

      <section className="container mx-auto">
        <Highlights />
      </section>

      <section className="container mx-auto">
        <Testimonials />
      </section>

      <section className="text-center py-8">
        <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
        <p className="text-muted mb-4">Start a free trial and see deliveries move faster.</p>
        <div className="flex justify-center">
          <a className="btn btn-primary">Start Free Trial</a>
        </div>
      </section>
    </div>
  )
}
