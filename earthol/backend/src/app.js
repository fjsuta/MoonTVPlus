require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const db = require('../config/database');
const redisClient = require('../config/redis');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'EarthOL API is running' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/forum', require('./routes/forum'));
app.use('/api/earth', require('./routes/earth'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/messages', require('./routes/messages'));

require('./sockets/handler')(io);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await db.getConnection();
    console.log('MySQL Database Connected');
    
    await redisClient.connect();
    
    server.listen(PORT, () => {
      console.log(`EarthOL Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
