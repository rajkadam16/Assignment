# 💰 Expense Tracker - Full Stack Web Application

A modern, production-ready expense tracking application built with **React.js** and **Node.js**, featuring JWT authentication, comprehensive CRUD operations, advanced filtering, and real-time statistics.

![Tech Stack](https://img.shields.io/badge/React-18.3-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-16+-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue?logo=tailwindcss)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#️-installation--setup)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Security Features](#-security-features)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Scalability](#-scalability)

---

## 🚀 Features

### Frontend Features
- ✅ **Modern React UI** - Built with React 18 and Vite for blazing-fast development
- ✅ **TailwindCSS Styling** - Responsive, mobile-first design with custom gradients
- ✅ **JWT Authentication** - Secure login/signup with protected routes
- ✅ **Interactive Dashboard** - Real-time expense statistics and visualizations
- ✅ **Advanced Filtering** - Search by description, category, date range, and amount
- ✅ **CRUD Operations** - Create, read, update, and delete expenses seamlessly
- ✅ **CSV Export** - Download expense data for external analysis
- ✅ **Profile Management** - Update user information and avatar
- ✅ **Form Validation** - Client-side and server-side validation
- ✅ **Loading States** - Smooth UX with loading indicators
- ✅ **Toast Notifications** - User-friendly feedback messages
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop

### Backend Features
- ✅ **RESTful API** - Clean, well-structured Express.js API
- ✅ **MongoDB Integration** - Efficient NoSQL database with Mongoose ODM
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - bcrypt encryption with 10 salt rounds
- ✅ **Input Validation** - express-validator for robust data validation
- ✅ **Error Handling** - Centralized error handling middleware
- ✅ **CORS Support** - Configured for frontend-backend communication
- ✅ **Authorization** - Users can only access their own data
- ✅ **Query Optimization** - Indexed database queries for performance

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library for building interactive interfaces |
| **Vite** | Next-generation frontend build tool |
| **TailwindCSS** | Utility-first CSS framework |
| **React Router** | Client-side routing |
| **Axios** | HTTP client with interceptors |
| **Context API** | State management for authentication |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **JWT** | JSON Web Tokens for authentication |
| **bcrypt** | Password hashing |
| **express-validator** | Input validation middleware |

---

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local installation or Atlas account) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager
- **Git** (for cloning the repository)

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Assignment
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (or copy from .env.example)
cp .env.example .env
```

**Configure your `.env` file:**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

> **Important:** 
> - Change `JWT_SECRET` to a strong, random string in production
> - If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string
> - Ensure MongoDB is running before starting the backend

**Start the backend server:**

```bash
npm start
# Server will run on http://localhost:5000
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend will run on http://localhost:3000
```

### 4. Verify MongoDB is Running

**Windows:**
```bash
net start MongoDB
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

---

## 📁 Project Structure

```
Assignment/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema with password hashing
│   │   └── Expense.js            # Expense schema with validation
│   ├── routes/
│   │   ├── auth.js               # Authentication endpoints (login/register)
│   │   ├── users.js              # User profile endpoints
│   │   └── expenses.js           # Expense CRUD endpoints
│   ├── .env                      # Environment variables (not in git)
│   ├── .env.example              # Environment template
│   ├── server.js                 # Express server entry point
│   └── package.json              # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar with auth state
│   │   │   ├── ProtectedRoute.jsx # Route protection wrapper
│   │   │   └── ExpenseModal.jsx  # Add/Edit expense modal
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx   # Global authentication state
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page with validation
│   │   │   ├── Signup.jsx        # Registration page
│   │   │   ├── Dashboard.jsx     # Main dashboard with statistics
│   │   │   ├── Expenses.jsx      # Expense list with CRUD operations
│   │   │   └── Profile.jsx       # User profile management
│   │   ├── services/
│   │   │   └── api.js            # Axios instance with JWT interceptors
│   │   ├── App.jsx               # Main app component with routing
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles and Tailwind imports
│   ├── public/
│   ├── index.html                # HTML template
│   ├── tailwind.config.js        # Tailwind configuration
│   ├── vite.config.js            # Vite configuration
│   └── package.json              # Frontend dependencies
│
├── Postman_Collection.json       # API testing collection
├── QUICKSTART.md                 # Quick start guide
├── SCALABILITY.md                # Production scalability notes
└── README.md                     # This file
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: 201 Created
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: 200 OK
{
  "success": true,
  "token": "jwt_token_here",
  "user": { ... }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "user": { ... }
}
```

### User Profile Endpoints

#### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "Software Developer",
    "phone": "+1234567890",
    "avatar": "avatar_url"
  }
}
```

#### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "John Updated",
  "bio": "Senior Developer",
  "phone": "+1234567890"
}

Response: 200 OK
{
  "success": true,
  "user": { ... }
}
```

### Expense Endpoints

#### Get All Expenses (with filters)
```http
GET /api/expenses?search=grocery&category=Food&startDate=2024-01-01&endDate=2024-12-31
Authorization: Bearer <jwt_token>

Query Parameters:
- search: Search in description
- category: Filter by category (Food, Transport, Entertainment, etc.)
- startDate: Filter by start date (YYYY-MM-DD)
- endDate: Filter by end date (YYYY-MM-DD)
- minAmount: Minimum amount
- maxAmount: Maximum amount

Response: 200 OK
{
  "success": true,
  "count": 10,
  "expenses": [ ... ]
}
```

#### Create New Expense
```http
POST /api/expenses
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "amount": 50.00,
  "category": "Food",
  "description": "Grocery shopping",
  "date": "2024-01-09",
  "paymentMethod": "Credit Card"
}

Response: 201 Created
{
  "success": true,
  "expense": { ... }
}
```

#### Get Single Expense
```http
GET /api/expenses/:id
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "expense": { ... }
}
```

#### Update Expense
```http
PUT /api/expenses/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "amount": 75.00,
  "description": "Updated description"
}

Response: 200 OK
{
  "success": true,
  "expense": { ... }
}
```

#### Delete Expense
```http
DELETE /api/expenses/:id
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Expense deleted successfully"
}
```

#### Get Expense Statistics
```http
GET /api/expenses/stats
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "stats": {
    "totalExpenses": 1500.00,
    "expenseCount": 25,
    "averageExpense": 60.00,
    "categoryBreakdown": { ... },
    "monthlyTrend": [ ... ]
  }
}
```

---

## 📊 Database Schema

### User Model

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    // Hashed with bcrypt before saving
  },
  bio: String,
  avatar: String,
  phone: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email` (unique)

### Expense Model

```javascript
{
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transport', 'Entertainment', 'Shopping', 
           'Bills', 'Healthcare', 'Education', 'Other']
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking']
  },
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `{ userId: 1, date: -1 }` (compound index for efficient queries)
- `{ userId: 1, category: 1 }` (for category filtering)

---

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication with 7-day expiration
- **Password Hashing**: bcrypt with 10 salt rounds
- **Protected Routes**: Middleware ensures only authenticated users can access resources
- **User Isolation**: Users can only access their own expenses and profile

### Input Validation
- **Client-side**: React form validation for immediate feedback
- **Server-side**: express-validator for robust data validation
- **Sanitization**: Input sanitization to prevent injection attacks

### Best Practices
- **Environment Variables**: Sensitive data stored in `.env` files
- **CORS Configuration**: Controlled cross-origin resource sharing
- **Error Handling**: Centralized error handling without exposing sensitive info
- **Password Requirements**: Minimum 6 characters enforced

---

## 🧪 Testing

### Using Postman

1. **Import the collection:**
   - Open Postman
   - Click "Import" → Select `Postman_Collection.json`
   - The collection includes all API endpoints with sample data

2. **Set up environment:**
   - Create a new environment in Postman
   - Add variable: `baseURL` = `http://localhost:5000/api`
   - Add variable: `token` (will be set automatically after login)

3. **Test flow:**
   ```
   1. Register a new user → Copy the token
   2. Login with credentials → Verify token
   3. Create expenses → Test CRUD operations
   4. Test filtering → Use query parameters
   5. Update profile → Verify changes
   6. Delete expense → Confirm deletion
   ```

### Manual Testing

1. **Start both servers** (backend and frontend)
2. **Navigate to** `http://localhost:3000`
3. **Test user flow:**
   - Register a new account
   - Login with credentials
   - Add multiple expenses
   - Test search and filters
   - Edit and delete expenses
   - Update profile information
   - Export data to CSV
   - Logout and verify session ends

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

**Vercel:**
```bash
cd frontend
npm run build
vercel --prod
```

**Netlify:**
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

### Backend Deployment (Railway/Render/Heroku)

**Railway:**
```bash
cd backend
railway login
railway init
railway up
```

**Environment Variables to Set:**
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - Strong random secret key
- `JWT_EXPIRE` - Token expiration (e.g., 7d)
- `NODE_ENV` - production
- `PORT` - 5000 (or Railway's assigned port)

### Database (MongoDB Atlas)

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist your IP or use `0.0.0.0/0` for all IPs
3. Create a database user
4. Get connection string and update `MONGODB_URI`

---

## 📈 Scalability

For detailed notes on scaling this application for production, see **[SCALABILITY.md](./SCALABILITY.md)**.

### Key Scalability Strategies:

#### Frontend
- **Code Splitting**: Lazy load routes to reduce initial bundle size
- **State Management**: Implement Redux/Zustand for complex state
- **Caching**: Use React Query for server state management
- **CDN**: Deploy static assets to CloudFlare/AWS CloudFront
- **PWA**: Add service workers for offline support

#### Backend
- **Horizontal Scaling**: Use PM2 cluster mode or Docker containers
- **Load Balancing**: Nginx or AWS ALB for distributing traffic
- **Caching**: Redis for frequently accessed data (90% query reduction)
- **Database Optimization**: Indexes, aggregation pipelines, read replicas
- **Rate Limiting**: Prevent abuse with express-rate-limit
- **Message Queues**: Bull/RabbitMQ for async processing

#### Performance Targets
- API Response Time: < 200ms (p95)
- Page Load Time: < 2 seconds
- Uptime: 99.9%
- Concurrent Users: 10,000+

---

## 🎯 Quick Start

**TL;DR - Get running in 3 steps:**

```bash
# 1. Backend
cd backend && npm install && npm start

# 2. Frontend (new terminal)
cd frontend && npm install && npm run dev

# 3. Open browser
http://localhost:3000
```

**First-time setup:**
1. Ensure MongoDB is running
2. Register a new account
3. Start adding expenses!

---

## 📝 Assignment Deliverables

✅ **Frontend (React)** - Modern React app with TailwindCSS  
✅ **Backend (Node.js)** - RESTful API with Express and MongoDB  
✅ **GitHub Repository** - Complete source code with documentation  
✅ **Authentication** - JWT-based register/login/logout  
✅ **Dashboard** - Interactive dashboard with expense statistics  
✅ **CRUD Operations** - Full create, read, update, delete for expenses  
✅ **Postman Collection** - Complete API documentation and testing  
✅ **Scalability Notes** - Comprehensive production deployment guide  

---

## 🤝 Contributing

This is an assignment project for evaluation purposes.

---

## 📄 License

MIT License - Free to use for educational purposes.

---

## 📧 Contact

For any queries regarding this project, please reach out to the developer.

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Follows industry best practices
- Production-ready architecture
- Comprehensive documentation

---

**Assignment Completion Date:** January 2026  
**Developer:** Raj Kadam  
**Technologies:** React.js, Node.js, Express, MongoDB, TailwindCSS, JWT

---

<div align="center">
  <strong>⭐ If you found this project helpful, please consider giving it a star! ⭐</strong>
</div>
