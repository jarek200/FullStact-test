import express from 'express'
import session from 'express-session'
import { mockUsers } from './utils/mockUsers.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

// Session configuration
app.use(
  session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 },
  })
)

// Middleware to check session activity
// if the session's last access time exceeds a maximum inactive interval
// (1 minute in your case). If it does, the session is destroyed; otherwise,
// the last access time is updated.
// This is an effective way to handle inactive or "dangling" sessions.
app.use((req, res, next) => {
  const maxInactiveInterval = 60000 // 1 minute

  if (req.session.lastAccess && Date.now() - req.session.lastAccess > maxInactiveInterval) {
    req.session.destroy(err => {
      if (err) {
        console.error('Session destruction error:', err)
      }
      next()
    })
  } else {
    req.session.lastAccess = Date.now()
    next()
  }
})

app.get('/', (req, res) => {
  // Check if the session cookie is present and the user is authenticated
  if (req.headers.cookie && req.headers.cookie.includes('connect.sid') && req.session.isAuthenticated) {
    // The session cookie exists and the user is authenticated, proceed with your logic
    if (!req.session.views) {
      req.session.views = 1
    } else {
      req.session.views++
    }
    res.send(`Session info: ${req.session.views} views. Last access time updated.`)
  } else {
    // No session cookie was found in the request, or the user is not authenticated
    res.status(401).send('Not authenticated. Please log in.')
  }
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  const user = mockUsers.find(u => u.username === username && u.password === password)

  if (user) {
    req.session.user = { id: user.id, username: user.username, displayName: user.displayName }
    req.session.isAuthenticated = true
    res.send(`Welcome ${user.displayName}! You are logged in.`)
  } else {
    res.status(401).send('Authentication failed. Invalid username or password.')
  }
})

app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send('Error logging out')
      }
      res.send('Logout successful')
    })
  } else {
    res.send('You are not logged in.')
  }
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
