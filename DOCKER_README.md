# Gabber Chat App - Docker Setup

## Prerequisites
- Docker Desktop installed and running
- GetStream.io API keys (sign up at https://getstream.io/)

## Quick Start

1. **Clone the repository** (if not already done)
   ```bash
   git clone <your-repo-url>
   cd gabber
   ```

2. **Set up environment variables**
   ```bash
   # Copy the example env file
   cp backend/.env.example backend/.env
   
   # Edit backend/.env and add your Stream API keys
   # STREAM_API_KEY=your-actual-api-key
   # STREAM_SECRET_KEY=your-actual-secret-key
   ```

3. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

## Docker Services

- **mongodb**: MongoDB 7 database with persistent volume
- **backend**: Node.js/Express API server
- **frontend**: React/Vite app served by Nginx

## Useful Commands

```bash
# Start all services in background
docker-compose up -d

# Stop all services
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend

# Rebuild specific service
docker-compose up --build backend

# Execute command in running container
docker-compose exec backend sh
docker-compose exec mongodb mongosh
```

## Development Mode

For hot-reload during development, uncomment the volume mount in `docker-compose.yml`:
```yaml
volumes:
  - ./backend/src:/app/src
```

## Production Deployment

1. Update environment variables in production
2. Use production-grade secrets for JWT_SECRET
3. Configure proper CORS origins
4. Set up SSL/TLS certificates
5. Use managed MongoDB service or proper backup strategy

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token signing
- `STREAM_API_KEY`: GetStream.io API key
- `STREAM_SECRET_KEY`: GetStream.io secret key
- `NODE_ENV`: Environment mode (development/production)

### Frontend (.env - optional)
- `VITE_API_URL`: Backend API URL (handled by Nginx proxy)

## Troubleshooting

**MongoDB connection fails:**
- Ensure MongoDB container is healthy: `docker-compose ps`
- Check logs: `docker-compose logs mongodb`

**Backend can't connect to MongoDB:**
- Wait for MongoDB health check to pass
- Verify MONGODB_URI uses service name: `mongodb://mongodb:27017/gabber-chat-app`

**Frontend can't reach backend:**
- Verify Nginx proxy configuration in `frontend/nginx.conf`
- Check backend logs: `docker-compose logs backend`

**GetStream.io errors:**
- Verify API keys are correct in `backend/.env`
- Check if you have active internet connection
