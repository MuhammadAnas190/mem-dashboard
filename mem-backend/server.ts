import express from 'express';
import powerHandler from './api/live/index.js';
import alarmsHandler from './api/alarms/index.js';

const app = express();
const PORT = 3001;

// CORS Middleware - must be before routes
app.use((req, res, next) => {
  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Allow specific HTTP methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD');
  
  // Allow specific headers
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Cache preflight requests
  res.setHeader('Access-Control-Max-Age', '3600');

  // Log requests for debugging
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);

  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    console.log('Preflight request handled');
    return res.sendStatus(200);
  }

  next();
});

// Routes
app.get('/api/live', (req, res) => powerHandler(req, res));
app.get('/api/alarms', (req, res) => alarmsHandler(req, res));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});