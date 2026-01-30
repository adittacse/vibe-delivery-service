import express from 'express'
import dotenv from 'dotenv'
import { connectToDatabase } from './lib/db.js'
import authRoutes from './routes/auth.js'
import parcelsRoutes from './routes/parcels.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

// Enable CORS for frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

app.get('/', (req, res) => {
  res.send('Vibe Delivery Backend')
})

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend' })
})

// Auth routes
app.use('/api/auth', authRoutes)

// Parcels routes
app.use('/api/parcels', parcelsRoutes)

// Connect to DB on startup (non-blocking, logs errors)
connectToDatabase(process.env.MONGO_URI).catch(err => {
  console.error('Failed to connect to DB:', err.message)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
