# 🎲 Board Game Booking Web App

<p align="center">
  A full-stack web application that allows users to browse facilities, select board games, and manage reservations in real-time.
</p>

<p align="center">
  <a href="https://boardgamebookingwebapp-x0ep.onrender.com/">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20App-success?style=for-the-badge" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-green" />
  <img src="https://img.shields.io/badge/Express.js-API-lightgrey" />
  <img src="https://img.shields.io/badge/MongoDB-Database-green" />
  <img src="https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-blue" />
  <img src="https://img.shields.io/badge/Deployment-Render-purple" />
</p>

---

## ✨ Key Features

- 🔐 User authentication (register/login with JWT)
- 📅 Real-time reservation system
- 🏠 Facility & board game selection
- ❌ Reservation cancellation with tracking
- 🧑‍💼 Admin Back Office for canceled bookings
- 📧 Email notifications (confirmation & cancellation)
- 📱 Responsive UI (Bootstrap-based)

---

## 🌐 Live Demo

https://boardgamebookingwebapp-x0ep.onrender.com/

---

## 🏗️ Architecture Overview


- RESTful API structure
- MVC-style backend (routes, controllers, models)
- Static frontend served via Express

---

## ⚙️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Nodemailer (email system)

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)
- Bootstrap 5

### Deployment
- Render (Web Service)
- MongoDB Atlas (Cloud DB)

---

## 🚀 Getting Started (Local Setup)

## 🏠 Main Interface

<p align="center">
  <img src="https://github.com/user-attachments/assets/e2704117-bd71-45bf-ad89-75a8d841bc51" style="max-width: 900px; width: 100%;" />
</p>

Users can:
- Select a facility  
- Choose a board game  
- Make a reservation  

<br>

---

## 🔐 Authentication

### Registration

<p align="center">
  <img src="https://github.com/user-attachments/assets/cd65d71b-3bb4-4225-bbe9-4769839514fd" width="600"/>
</p>

Stored in MongoDB:

<p align="center">
  <img src="https://github.com/user-attachments/assets/d8dc4671-74cf-4d0b-bf94-e641a7191542" width="600"/>
</p>

<br>

### Login

<p align="center">
  <img src="https://github.com/user-attachments/assets/508df787-cc49-4cd1-aa1b-82af85ce922b" width="600"/>
</p>

<br>

### Logout

<p align="center">
  <img src="https://github.com/user-attachments/assets/c6fed1bc-2899-4495-aa1a-dd51a5ccdc9d" width="150"/>
</p>

<br>

---

## 🎯 Booking Flow

### Navigation Actions

<p align="center">
  <img src="https://github.com/user-attachments/assets/b8ed9d5b-38d0-4264-8e6c-15695cccfb43" width="800"/>
</p>

### Logged-in Header View

<p align="center">
  <img src="https://github.com/user-attachments/assets/6ff24e55-b972-4d3d-9392-b760078c333c" style="max-width: 900px; width: 100%;" />
</p>

<br>

---

### Step 1: Choose Facility

By clicking the button: "Explore Facilities" we navigate to the available facilities. Then if we click the button: "Book Now" that exists under one of each facility, it is displayed the following message that confirms our choice: 

<p align="center">
  <img src="https://github.com/user-attachments/assets/cd511ee0-e2e2-459a-b1f5-3daa22fe0135" width="500"/>
</p>

<br>

### Step 2: Select Game

<p align="center">
  <img src="https://github.com/user-attachments/assets/2c6cb8cb-3f97-4791-9f23-80d20b4c5ce9" width="450"/>
</p>

<br>

### Step 3: Fill Reservation Form

#### Facility Selection
<p align="center">
  <img src="https://github.com/user-attachments/assets/a28c6c60-45d8-485e-a1f7-fd751c93e98a" width="450"/>
</p>

#### Date Picker
<p align="center">
  <img src="https://github.com/user-attachments/assets/9d5fef33-0c3e-4262-a74a-468d7f5955d3" width="220"/>
</p>

#### Time Slots
<p align="center">
  <img src="https://github.com/user-attachments/assets/a3daed7e-0ea0-4baa-a16f-2ec84fef072b" width="450"/>
</p>

<br>

### Step 4: Confirm Reservation

<p align="center">
  <img src="https://github.com/user-attachments/assets/074b4814-f572-4dac-91a6-49aa6030e5b2" width="450"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/db82d3be-5c1a-4699-9e82-558ed6b14046" width="500"/>
</p>

<br>

### Stored in Database

<p align="center">
  <img src="https://github.com/user-attachments/assets/6b6c6dbc-dbbb-486d-b248-74f84d82d4bf" width="700"/>
</p>

<br>

---

## 📊 Reservation Management

<p align="center">
  <img src="https://github.com/user-attachments/assets/965cacfc-15ca-4fbc-b8fd-c1e98e250dc5" width="400"/>
</p>

### All Reservations

<p align="center">
  <img src="https://github.com/user-attachments/assets/578f2481-eb05-4a95-aeee-311b04d7d074" style="max-width: 900px; width: 100%;" />
</p>

<br>

---

## ❌ Cancellation System

<p align="center">
  <img src="https://github.com/user-attachments/assets/1c3cd17e-71e5-4fe7-80ff-43487020c51f" width="400"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/cae600fe-1362-4d83-8bb4-acd56dde6955" width="150"/>
</p>

<br>

### Canceled Reservations View

<p align="center">
  <img src="https://github.com/user-attachments/assets/e066088a-e9e0-44d5-97c5-252d848ed4de" style="max-width: 900px; width: 100%;" />
</p>

<br>

---

## ✅ Final Result

✔ Reservation successfully created  
✔ Stored in MongoDB  
✔ Can be canceled and tracked  

---

## ⭐ Future Improvements

- 🔔 Email notifications  
- 📱 Mobile responsiveness improvements  
- 🎮 More board games & filtering  

---

## 📌 Author

Developed by **Thomas Beopoulos**
