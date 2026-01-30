import express from 'express'
import { getDb, ObjectId } from '../lib/db.js'

const router = express.Router()

// Pricing Strategy:
// Base Fee: $5
// Distance Fee: $0.50 per km (estimated based on pickup/delivery)
// Weight Fee: $0.10 per kg
// Rush Delivery: +50% of subtotal if same-day
// Peak Hours: +20% if Friday-Sunday

function calculateDistance(from, to) {
  // Simple mock: estimate distance based on location names
  // In production, use a real geolocation/distance API
  return Math.random() * 50 + 5 // 5-55 km range
}

function isPeakHours(date) {
  const d = new Date(date)
  const day = d.getDay()
  const hour = d.getHours()
  return (day === 5 || day === 6 || day === 0) && hour >= 17 && hour <= 21
}

function isSameDay(date) {
  const today = new Date()
  const d = new Date(date)
  return today.toDateString() === d.toDateString()
}

router.post('/calculate-price', (req, res) => {
  try {
    const { weight, length, width, height, isRushDelivery, deliveryDate } = req.body

    // Mock distance (in production, use real API)
    const distance = Math.random() * 50 + 5

    // Pricing components
    const baseFee = 5.0
    const distanceFee = distance * 0.5
    const weightFee = weight * 0.1
    let rushFee = 0
    let peakFee = 0

    // Calculate subtotal
    let subtotal = baseFee + distanceFee + weightFee

    // Apply rush delivery (+50%)
    if (isRushDelivery) {
      rushFee = subtotal * 0.5
    }

    // Apply peak hours (+20%)
    if (isPeakHours(deliveryDate)) {
      peakFee = subtotal * 0.2
    }

    const totalPrice = subtotal + rushFee + peakFee

    res.json({
      baseFee,
      distanceFee,
      weightFee,
      distance: Math.round(distance * 10) / 10,
      rushFee,
      peakFee,
      subtotal,
      totalPrice: Math.round(totalPrice * 100) / 100
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Price calculation failed' })
  }
})

router.post('/create', async (req, res) => {
  try {
    const { parcelName, description, weight, dimensions, pickupLocation, deliveryLocation, deliveryDate, isRushDelivery, recipientName, recipientPhone, estimatedPrice, userId } = req.body

    const db = getDb()
    const parcelsCollection = db.collection('parcels')

    const parcel = {
      userId: new ObjectId(userId),
      parcelName,
      description,
      weight,
      dimensions,
      pickupLocation,
      deliveryLocation,
      deliveryDate,
      isRushDelivery,
      recipientName,
      recipientPhone,
      estimatedPrice,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await parcelsCollection.insertOne(parcel)

    res.status(201).json({
      message: 'Parcel created successfully',
      parcelId: result.insertedId
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create parcel' })
  }
})

export default router
