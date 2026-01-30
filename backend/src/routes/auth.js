import express from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDb } from '../lib/db.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-prod'

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const db = getDb()
    const usersCollection = db.collection('users')

    // Check if user exists
    const existing = await usersCollection.findOne({ email })
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10)

    // Create user
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    })

    const user = { id: result.insertedId.toString(), name, email }
    const token = jwt.sign({ userId: result.insertedId }, JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({ user, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Registration failed' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' })
    }

    const db = getDb()
    const usersCollection = db.collection('users')

    // Find user
    const user = await usersCollection.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Check password
    const isValid = await bcryptjs.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const userObj = { id: user._id.toString(), name: user.name, email: user.email }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })

    res.json({ user: userObj, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Login failed' })
  }
})

export default router
