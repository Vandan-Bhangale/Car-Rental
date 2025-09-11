# 🚗 Car Rental Website  

A full-stack **Car Rental Platform** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This website allows customers to browse available cars, book rentals online, and manage their bookings, while owners/admins can manage cars, pricing, and revenue through an integrated dashboard.

---

## 📌 Features  

### 🔹 For Customers  
- View available cars with details (brand, model, price, availability).  
- Search, filter, and sort cars based on requirements.  
- Book a car online with secure login.  
- Manage bookings from “My Bookings” page.  

### 🔹 For Owners/Admins  
- Add, edit, and delete car listings.  
- View all bookings made by customers.  
- Manage pricing, availability, and revenue.  
- Dashboard with analytics (future enhancement).  

### 🔹 General  
- Fully responsive UI using **React + Tailwind CSS**.  
- Secure authentication using **Cookies/Session**.  
- REST API built with **Express.js** and **MongoDB**.  
- Deployed on Vercel & Render.  

---

## 🛠️ Tech Stack  

| Frontend | Backend | Database | Others |
|----------|----------|----------|--------|
| React.js | Node.js  | MongoDB  | Tailwind CSS, Cookies-session|

---

## 🌐 Live Demo  

You can try the live version of the Car Rental Website here:  

[🔗 **Live Demo**](https://car-rental-rho-cyan.vercel.app/)  

---

## 📂 Project Structure  
```
├── Backend
    ├── .gitignore
    ├── Models
    ├── Routes
    ├── controller
    ├── index.js
    ├── multerConfig.js
    ├── package-lock.json
    ├── package.json
    └── uploads
└── Frontend
    └── car-rental
        ├── .gitignore
        ├── README.md
        ├── eslint.config.js
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── public
        ├── src
            ├── App.css
            ├── App.jsx
            ├── assets
            ├── components
            ├── main.jsx
            └── pages
        ├── vercel.json
        └── vite.config.js
```

## ⚙️ Installation  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/Vandan-Bhangale/Car-Rental.git
cd Car-Rental
```

#### 2️⃣ Install dependencies

* For backend:
```
cd backend
npm install
```

* For frontend:
```
cd frontend
npm install
```

4️⃣ Run the project

Backend:
```
npm start (If nodemon installed)
```

Frontend:
```
npm run dev
```

### 🚀 Deployment
```
Frontend: Hosted on Vercel.

Backend: Hosted on Render.

Database: MongoDB Atlas.
```

### Future Enhancements
```
Online payment integration.

Email/SMS notifications for bookings.

Mobile app version.
```

## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.