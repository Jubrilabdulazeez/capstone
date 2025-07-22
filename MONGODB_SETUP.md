# MongoDB Setup Guide for EduConnect Africa

## 🚀 Quick Setup Instructions

### 1. Set up MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new project named "EduConnect Africa"

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select your preferred cloud provider and region
   - Name your cluster (e.g., "educonnect-cluster")

3. **Set up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set user privileges to "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your specific IP addresses

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

### 2. Configure Environment Variables

Update your `Backend/.env.local` file:

```env
# Replace with your actual MongoDB connection string
DATABASE_URL="mongodb+srv://your-username:your-password@your-cluster.mongodb.net/educonnect-africa?retryWrites=true&w=majority"

# NextAuth.js
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Environment
NODE_ENV=development
```

### 3. Install Dependencies & Setup Database

```bash
# Navigate to Backend folder
cd Backend

# Install missing dependencies
npm install tsx

# Generate Prisma client
npm run db:generate

# Push schema to MongoDB
npm run db:push

# Seed the database with sample data
npm run db:seed
```

### 4. Start the Servers

```bash
# Terminal 1 - Backend
cd Backend
npm run dev

# Terminal 2 - Frontend  
cd Frontend
npm run dev
```

## 🔧 Available Database Scripts

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Seed database with sample data
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio

# Reset database and reseed
npm run db:reset
```

## 📊 Database Schema Overview

### Core Models:
- **User** - User accounts with profiles and preferences
- **University** - University information and details
- **Program** - Academic programs offered by universities
- **Scholarship** - Available scholarships
- **Application** - Student applications to programs
- **CounselingSession** - Counseling session bookings
- **Account/Session** - NextAuth.js authentication

### Key Features:
✅ **MongoDB native ObjectIds**
✅ **Embedded documents** for complex data types
✅ **Proper relationships** between entities
✅ **Comprehensive enums** for type safety
✅ **NextAuth.js integration** with Prisma adapter

## 🌐 API Endpoints

Your backend now provides these database-powered endpoints:

### Universities
- `GET /api/universities` - List universities with filtering
- `GET /api/universities/[id]` - Get university details
- `GET /api/universities/search?q=query` - Search universities
- `POST /api/universities` - Create university (Admin)
- `PUT /api/universities/[id]` - Update university (Admin)
- `DELETE /api/universities/[id]` - Delete university (Admin)

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update current user profile

### Health Check
- `GET /api/health` - Database and system health status

### Documentation
- `GET /api/openapi` - OpenAPI specification
- `GET /docs` - Interactive Swagger UI documentation

## 🔍 Testing Your Setup

1. **Check Backend Health**
   ```
   http://localhost:3001/api/health
   ```

2. **View API Documentation**
   ```
   http://localhost:3001/docs
   ```

3. **Test University Endpoint**
   ```
   http://localhost:3001/api/universities
   ```

4. **Open Database GUI**
   ```bash
   npm run db:studio
   ```

## 🛠️ Troubleshooting

### Common Issues:

1. **Connection String Error**
   - Ensure your MongoDB Atlas cluster is running
   - Check your username/password in the connection string
   - Verify network access allows your IP

2. **Prisma Generate Fails**
   ```bash
   npm install @prisma/client
   npm run db:generate
   ```

3. **Seed Script Fails**
   - Ensure database is accessible
   - Check if data already exists (use `npm run db:reset`)

4. **TypeScript Errors**
   ```bash
   npm run db:generate
   npm run build
   ```

## 🎯 Next Steps

After successful setup:

1. **Test the API endpoints** using Swagger UI at `http://localhost:3001/docs`
2. **Verify the frontend** connects to the new database endpoints
3. **Add real authentication** by setting up Google OAuth or other providers
4. **Customize the data model** as needed for your specific requirements
5. **Deploy to production** with proper environment variables

## 📈 Production Considerations

- Use strong, unique passwords for database users
- Restrict network access to specific IP addresses
- Set up database backups and monitoring
- Use environment-specific connection strings
- Enable MongoDB Atlas monitoring and alerts

---

Your EduConnect Africa backend is now powered by MongoDB with a complete REST API! 🚀