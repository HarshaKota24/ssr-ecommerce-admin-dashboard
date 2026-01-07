#  Server-Rendered E-commerce Product Management Dashboard

##  Project Overview

This project is a **Server-Side Rendered (SSR) administrative dashboard** for managing products in an e-commerce system. It is built using **Next.js (App Router)** and demonstrates features such as authentication, server-side data fetching, image uploads, and data visualization.

The dashboard is **accessible only to admins** and provides tools to manage products and analyze inventory metrics.

---

##  Objective

- Build a **real-world admin dashboard** using Server side rendering
- Ensure **fast page loads** and good SEO characteristics
- Implement **secure admin-only access**
- Support full **product lifecycle management**
- Visualize inventory data using charts

---

## Key Features

- **Server-Side Rendering (SSR)** using Next.js App Router  
- **Authentication & Authorization**
  - Admin login
  - Session-based access
  - Middleware-protected routes
  - Logout functionality
- **Admin-only onboarding**
  - New admins can be created only by existing admins
  - No public signup
- **Product CRUD**
  - Create, Read, Update, Delete products
- **Multi-step product creation**
  - Step-wise form
  - Strong input validation using Zod
- **Interactive Dashboard**
  - KPI cards (Total Products, Total Stock, Low Stock Products)
  - Stock vs Product chart
  - Inventory Value vs Product chart
  - Rating distribution chart
- **Secure Image Upload**
  - Images uploaded to Cloudinary
  - Only image URLs stored in database
- **Robust Validation**
  - Prevents invalid prices, ratings, stock values, or missing images

---

## 🛠 Tech Stack

### Frontend & Backend
- `Next.js (App Router)`
- `TypeScript`

### Database & Validation
- `MongoDB`
- `Mongoose`
- `Zod`

### Authentication
- `NextAuth.js`
- Session-based authentication

### Data Visualization
- `Recharts`

### Image Storage
- `Cloudinary`

---

##  Application Workflow

```
Admin Login
   ↓
Server validates session
   ↓
SSR dashboard page rendered
   ↓
Admin manages products & views analytics
   ↓
Database updates reflected in UI
```

---

##  Demo Admin Credentials

> ⚠️ Use the following credentials to access the dashboard

```
Email: admin@example.com
Password: admin123
```

---

##  Local Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/HarshaKota24/ssr-ecommerce-admin-dashboard.git
cd <project-folder>
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Environment Variables

Create a file named `.env.local` in the root directory:

```env
MONGO_URL=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### 4️⃣ Run the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

##  Deployment

The application is deployed using **Vercel**.

Deployment setup includes:
- Environment variables configured in Vercel dashboard
- MongoDB Atlas for production database
- Cloudinary for image uploads

```
Live URL: https://ssr-ecommerce-admin-dashboard-jade.vercel.app/dashboard
```

---

##  Demo Video

A short demo video (3–5 minutes) demonstrating:

```
- Admin login
- Dashboard analytics
- Product CRUD
- Image upload
- Admin creation
- Logout
```

```
Video Link: <add-video-link-here>
```

---

##  Future Improvements

- Role-based access control (Admin / Manager)
- Pagination and search for products
- Real-time dashboard updates
- Fully responsive charts

---

##  Conclusion

This project demonstrates a **production-grade SSR admin dashboard** with secure authentication, clean architecture, and meaningful data visualization. It reflects modern web development practices and real-world system design.
