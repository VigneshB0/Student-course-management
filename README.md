# 🎓 Student Course Management System

A full-stack web application for managing students and courses, built with Angular frontend and Node.js backend with MongoDB database.

## 🚀 Features

- **Authentication System**
  - User registration and login
  - JWT token-based authentication
  - Protected routes and middleware
  - Role-based access control

- **Student Management**
  - Create, read, update, delete students
  - Student information: name, email, phone
  - Form validation and error handling

- **Course Management**
  - Create, read, update, delete courses
  - Course information: name, duration, fee
  - Real-time data updates

## 🛠️ Technology Stack

### Frontend
- **Angular 18** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **Reactive Forms** - Form validation and handling
- **HTTP Client** - API communication
- **Router** - Navigation and route guards

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/student-course-management.git
   cd student-course-management
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Database Configuration**
   - Update MongoDB connection string in `backend/server.js`
   - Replace with your MongoDB Atlas connection string

## 🚀 Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   # or
   node server.js
   ```
   Server runs on: `http://localhost:4000`

2. **Start the Frontend Application**
   ```bash
   cd frontend
   ng serve
   # or
   npm start
   ```
   Application runs on: `http://localhost:4200`

## 🔐 Default Admin Account

- **Email:** `admin@example.com`
- **Password:** `password123`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `PUT /api/auth/change-password` - Change password (protected)
- `POST /api/auth/logout` - User logout (protected)

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create new student
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `GET /api/courses/:id` - Get course by ID
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

## 📁 Project Structure

```
student-course-management/
├── backend/
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/           # Utility functions
│   ├── server.js        # Main server file
│   └── package.json     # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Angular components
│   │   │   ├── services/      # Angular services
│   │   │   ├── guards/        # Route guards
│   │   │   └── ...
│   │   └── ...
│   ├── angular.json     # Angular configuration
│   └── package.json     # Frontend dependencies
├── .gitignore
└── README.md
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation
- CORS configuration
- Role-based access control

## 🌟 Future Enhancements

- [ ] Email verification
- [ ] Password recovery
- [ ] Advanced search and filtering
- [ ] File upload functionality
- [ ] Bulk operations
- [ ] Dashboard with analytics
- [ ] Export/Import data
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Your Name - your.email@example.com
Project Link: [https://github.com/yourusername/student-course-management](https://github.com/yourusername/student-course-management)

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Express.js community
- MongoDB for the database solution
- All contributors who helped improve this project