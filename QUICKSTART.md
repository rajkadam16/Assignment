# Quick Start Guide

## 🚀 Getting Started

### 1. Prerequisites
- Node.js v16+ installed
- MongoDB installed and running

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
Backend will run on http://localhost:5000

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on http://localhost:3000

### 4. MongoDB Setup
If MongoDB is not running:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

## 📝 Important Notes

> **MongoDB Connection**: Make sure MongoDB is running before starting the backend server. If you see connection errors, check that MongoDB service is active.

> **Environment Variables**: The backend `.env` file is already configured with default values. For production, change the `JWT_SECRET` to a secure random string.

> **First Time Setup**: When you first run the application, you'll need to register a new account. Use the signup page to create your first user.

## 🎯 Testing Flow

1. **Register**: Create a new account at http://localhost:3000/signup
2. **Login**: Sign in with your credentials
3. **Add Expenses**: Click "Add Expense" and create a few test expenses
4. **Explore Features**: Try filtering, searching, editing, and deleting expenses
5. **Check Dashboard**: View your expense statistics and analytics
6. **Edit Profile**: Update your profile information

## 📚 Documentation

- **README.md**: Complete setup and feature documentation
- **SCALABILITY.md**: Production deployment strategies
- **Postman_Collection.json**: API testing collection
- **walkthrough.md**: Detailed project walkthrough

## ✅ All Features Implemented

✅ User authentication (register/login/logout)  
✅ JWT token-based security  
✅ Password hashing with bcrypt  
✅ Full CRUD operations on expenses  
✅ Advanced filtering and search  
✅ Dashboard with statistics  
✅ Profile management  
✅ CSV export  
✅ Responsive design  
✅ Form validation (client + server)  
✅ Error handling  

---

**Ready for evaluation!** 🎉
