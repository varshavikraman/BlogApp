# 📱 Logly – Blog App (React Native + NestJS)

> A full-stack mobile Blog Application built using React Native (Expo) for the frontend and NestJS for the backend. The app allows users to create, edit, delete, and view blog posts, store drafts locally using AsyncStorage, sync data with a backend database, and receive push notifications based on actions.

[![Frontend: React Native](https://img.shields.io/badge/Frontend-React%20Native%20%7C%20Expo-61DAFB)](https://reactnative.dev/)
[![Backend: NestJS](https://img.shields.io/badge/Backend-NestJS-E0234E)](https://nestjs.com/)
[![Status: Complete](https://img.shields.io/badge/Status-Complete-brightgreen)]()

---

## 🚀 Features

### 📱 Mobile App (React Native)
- Create, edit, and delete blog posts
- View list of blog posts
- View blog post details
- Offline draft saving using **AsyncStorage**
- Sync drafts to backend when online
- Push notifications using **Expo Notifications**
- Stack navigation using **React Navigation**

### 🧠 Backend (NestJS)
- RESTful API for blog posts
- SQLite database using **TypeORM**
- Clean architecture (**Controller, Service, DTO, Entity**)
- Automatic database synchronization

---

## 🛠️ Tech Stack 

### Frontend
- React Native (Expo)
- TypeScript
- React Navigation
- AsyncStorage
- Expo Notifications

### Backend
- NestJS
- TypeORM
- SQLite
- Class-validator & DTOs

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm
- Expo CLI (optional)

1. **📂 Clone the Repository:**

    ```bash
    git clone git@github.com:varshavikraman/BlogApp.git
    ```
    ```bash
    cd BlogApp
    ```

2. **📱 Frontend Setup** 

    ```bash
    cd blog-frontend
    npm install
    npx expo start
    ```

* <b>Run on:</b>
* Android Emulator
* iOS Simulator
* Physical device (Expo Go)

3. **🧠 Backend Setup**  

    ```bash
    cd blog-backend
    npm install
    npm run start:dev
    ```
- *Backend will run at: `http://localhost:3000`.*

---

## 🔔 Notifications

Push notifications are triggered using Expo Notifications for:
* Blog creation
* Blog updates
* Blog deletion




