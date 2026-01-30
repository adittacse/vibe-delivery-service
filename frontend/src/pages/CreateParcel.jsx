import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

export default function CreateParcel() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    parcelName: '',
    description: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    pickupLocation: '',
    deliveryLocation: '',
    deliveryDate: '',
    isRushDelivery: false,
    recipientName: '',
    recipientPhone: ''
  })

  const [price, setPrice] = useState(null)
  const [error, setError] = useState('')
  const [loading2, setLoading2] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Redirect if not logged in
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  if (!user) {
    navigate('/login')
    return null
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  async function calculatePrice(e) {
    e.preventDefault()
    setError('')
    setLoading2(true)

    try {
      const res = await fetch('http://localhost:4000/api/parcels/calculate-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weight: parseFloat(formData.weight),
          length: parseFloat(formData.length),
          width: parseFloat(formData.width),
          height: parseFloat(formData.height),
          isRushDelivery: formData.isRushDelivery,
          deliveryDate: formData.deliveryDate
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to calculate price')

      setPrice(data)
    } catch (err) {
      setError(err.message || 'Price calculation failed')
    } finally {
      setLoading2(false)
    }
  }

  async function submitParcel() {
    setError('')
    setLoading2(true)

    try {
      const res = await fetch('http://localhost:4000/api/parcels/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          weight: parseFloat(formData.weight),
          dimensions: {
            length: parseFloat(formData.length),
            width: parseFloat(formData.width),
            height: parseFloat(formData.height)
          },
          estimatedPrice: price.totalPrice,
          userId: user.id
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create parcel')

      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Submission failed')
    } finally {
      setLoading2(false)
    }
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto mt-8">
        <div className="card bg-base-100 shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-success">Parcel Submitted!</h2>
          <p className="text-lg mb-4">Your parcel has been successfully submitted.</p>
          <div className="bg-success/10 p-6 rounded-lg mb-6">
            <p className="text-sm text-muted mb-2">Estimated Total Price</p>
            <p className="text-4xl font-bold text-success">${price.totalPrice.toFixed(2)}</p>
            <p className="text-sm text-muted mt-2">Breakdown: Base ${price.baseFee.toFixed(2)} + Distance ${price.distanceFee.toFixed(2)} + Weight ${price.weightFee.toFixed(2)}</p>
          </div>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto mt-8">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Create Parcel</h2>

          {error && <div className="alert alert-error mb-4 text-sm">{error}</div>}

          <form className="space-y-4">
            {/* Parcel Details */}
            <div className="divider">Parcel Information</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Parcel Name</span></label>
                <input type="text" placeholder="e.g., Documents, Electronics" className="input input-bordered" name="parcelName" value={formData.parcelName} onChange={handleChange} required/>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Weight (kg)</span></label>
                <input type="number" placeholder="e.g., 2.5" className="input input-bordered" name="weight" value={formData.weight} onChange={handleChange} step="0.1" required/>
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Description</span></label>
              <textarea placeholder="Brief description of parcel contents..." className="textarea textarea-bordered" name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>

            {/* Dimensions */}
            <div className="divider">Dimensions (cm)</div>

            <div className="grid grid-cols-3 gap-3">
              <div className="form-control">
                <label className="label"><span className="label-text">Length</span></label>
                <input type="number" placeholder="cm" className="input input-bordered" name="length" value={formData.length} onChange={handleChange} step="0.1" required/>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Width</span></label>
                <input type="number" placeholder="cm" className="input input-bordered" name="width" value={formData.width} onChange={handleChange} step="0.1" required/>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Height</span></label>
                <input type="number" placeholder="cm" className="input input-bordered" name="height" value={formData.height} onChange={handleChange} step="0.1" required/>
              </div>
            </div>

            {/* Locations */}
            <div className="divider">Delivery Details</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Pickup Location</span></label>
                <input type="text" placeholder="e.g., Downtown, Main St" className="input input-bordered" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} required/>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Delivery Location</span></label>
                <input type="text" placeholder="e.g., Suburbs, Park Ave" className="input input-bordered" name="deliveryLocation" value={formData.deliveryLocation} onChange={handleChange} required/>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Preferred Delivery Date</span></label>
                <input type="date" className="input input-bordered" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} required/>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer gap-2 justify-start">
                  <input type="checkbox" className="checkbox" name="isRushDelivery" checked={formData.isRushDelivery} onChange={handleChange}/>
                  <span className="label-text">Rush Delivery (+50% fee)</span>
                </label>
              </div>
            </div>

            {/* Recipient Info */}
            <div className="divider">Recipient Information</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Recipient Name</span></label>
                <input type="text" placeholder="Full name" className="input input-bordered" name="recipientName" value={formData.recipientName} onChange={handleChange} required/>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Recipient Phone</span></label>
                <input type="tel" placeholder="+1 (555) 123-4567" className="input input-bordered" name="recipientPhone" value={formData.recipientPhone} onChange={handleChange} required/>
              </div>
            </div>

            {/* Calculate Price Button */}
            <button type="button" onClick={calculatePrice} disabled={loading2} className="btn btn-outline w-full">
              {loading2 ? 'Calculating...' : 'Calculate Price'}
            </button>
          </form>

          {/* Price Display */}
          {price && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold mb-3">Price Breakdown</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Base Fee:</span>
                  <span>${price.baseFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance Fee:</span>
                  <span>${price.distanceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight Fee:</span>
                  <span>${price.weightFee.toFixed(2)}</span>
                </div>
                {price.rushFee > 0 && (
                  <div className="flex justify-between text-warning">
                    <span>Rush Delivery Fee:</span>
                    <span>${price.rushFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="divider my-2"></div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">${price.totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={submitParcel} disabled={loading2} className="btn btn-primary w-full">
                {loading2 ? 'Submitting...' : 'Confirm & Submit Parcel'}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
