const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const exchangesRoutes = require('./routes/exchanges');
const subscriptionsRoutes = require('./routes/subscriptions');
const mockUsersRoutes = require('./routes/mockUsers');
const aiAgentsRoutes = require('./routes/aiAgents');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware CORS - Configuración explícita
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Payment'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/exchanges', exchangesRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);
app.use('/api/mockUsers', mockUsersRoutes);
app.use('/api/ai-agents', aiAgentsRoutes);
app.use('/api/ai-agents', aiAgentsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'VeriScore Backend is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 VeriScore Backend running on port ${PORT}`);
});

module.exports = app;


