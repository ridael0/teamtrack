# 👨‍💼 Employees Management System  
**Full-Stack App with Secure CRUD Operations, Validation & Authentication**  

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-blue?logo=tailwind-css)
![Express.js](https://img.shields.io/badge/Express.js-5-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6-green?logo=mongodb)

A **secure and modern** Employees Management System that allows administrators to perform **Create, Read, Update, and Delete (CRUD)** operations on employee records.  
Built with **React 19** (frontend) and **Express 5** (backend) with **MongoDB**, it includes **authentication, validation**, and **role-based access control** to protect sensitive data.

---

## 📂 Project Structure
```
📦 PRODIGY_FS_02
├── 📂 frontend # React.js client application
│ ├── 📂 public # Public assets
│ ├── 📂 src # React source files
│ │ ├── 📂 components # UI components
│ │ ├── 📂 pages # Page views (routes)
│ │ ├── 📂 state # Redux slices & logic
│ │ ├── 📄 main.tsx # Frontend entry point
│ │ └── 📄 App.tsx # App root component
│ │ └── 📄 Router.tsx # App router
│ ├── 📄 package.json # Frontend dependencies
│ └── ...
│
├── 📂 backend # Express.js server
│ ├── 📄 index.js # Backend entry point
│ ├── 📄 auth.middleware.js # Auth & validation
│ ├── 📄 admin.model.js # Admin model
│ ├── 📄 employee.model.js # Employee model
│ ├── 📄 package.json # Backend dependencies
│ └── ...
│
└── 📄 README.md
```
---

## 🚀 Features
- **🔑 Authentication & Authorization**
  - JWT-based authentication
  - Role-based access for admins
- **🛡 Validation**
  - Frontend validation with `react-hook-form` + `zod`
  - Backend validation to ensure data integrity
- **📋 Employee Management**
  - Add, edit, delete, and view employee records
  - Search and filter employees
- **🎨 Modern UI**
  - Tailwind CSS + Radix UI + ShadcnUI + Lucide icons
- **📦 State Management**
  - Redux Toolkit for predictable state
- **📊 Data Tables**
  - Built with `@tanstack/react-table`
---

## 🛠 Dependencies

### **Frontend**
```
@hookform/resolvers ^5.2.0
@radix-ui/react-* various
@reduxjs/toolkit ^2.8.2
@tailwindcss/vite ^4.1.11
@tanstack/react-table ^8.21.3
class-variance-authority ^0.7.1
clsx ^2.1.1
lucide-react ^0.532.0
react ^19.1.0
react-dom ^19.1.0
react-hook-form ^7.61.1
react-redux ^9.2.0
react-router-dom ^7.7.1
tailwind-merge ^3.3.1
tailwindcss ^4.1.11
zod ^4.0.10
```
### **Backend**
```
bcrypt ^6.0.0
cors ^2.8.5
express ^5.1.0
jsonwebtoken ^9.0.2
mongoose ^8.16.4
```
---

## 🛠 Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)
- npm or yarn
---

## 📦 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/ridael0/PRODIGY_FS_02.git
cd PRODIGY_FS_02
```
### 2️⃣ Install backend dependencies
```bash
cd backend
npm install
```
### 3️⃣ Install frontend dependencies
```bash
cd ../frontend
npm install
```
---

## ⚙️ Environment Variables

### Frontend (frontend/.env)
```env
VITE_api_endpoint=http://localhost:3000/api/employee
VITE_api_login=http://localhost:3000/api/login
VITE_api_register=http://localhost:3000/api/register
```
---

## ▶️ Running the App

### Start backend (Express.js API)
```bash
cd backend
npm start
```

### Start frontend (React.js client)
```bash
cd frontend
npm run dev
```
#### Runs on: http://localhost:5173
---

## ✨ Author
### Mohamed Rida Elaaich
#### Full-stack developer passionate about secure web applications.
