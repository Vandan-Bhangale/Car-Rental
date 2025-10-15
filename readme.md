### 🚗 Car Rental Website

A full-stack Car Rental Platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
This website allows customers to browse available cars, book rentals online with secure payments, and manage their bookings, while owners or admins can manage cars, pricing, and bookings through an integrated dashboard.

---

## 📌 Features

#### 🔹 For Customers

- View available cars with details such as brand, model, price, and availability.

- Book cars online using Stripe payment gateway or choose cash payment.

- View and manage bookings in the My Bookings section.

- View and edit personal details from the Profile page.

#### 🔹 For Owners/Admins

- Add, edit, and delete car listings.

- View all customer bookings in real time.

- Manage car pricing, availability, and revenue.

- Dashboard with analytics (coming soon).

#### 🔹 General

- Fully responsive user interface built with React and Tailwind CSS.

- Secure authentication using Cookies and Sessions.

- RESTful API built with Express.js and MongoDB.

- Image upload and storage using Cloudinary.

- Online payments handled securely with Stripe (test mode).

- Frontend deployed on Vercel and backend on Render.

--- 

### 🛠️ Tech Stack  

| Frontend | Backend | Database | Others |
|-----------|----------|-----------|--------|
| React.js  | Node.js  | MongoDB   | Tailwind CSS, Cloudinary, Cookies-Session, Stripe |

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