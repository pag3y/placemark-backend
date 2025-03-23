# 📍 Placemarks Backend

This is the backend for the Placemarks application, built with **Node.js**, **Hapi.js**, and **Firebase Firestore**. It provides API endpoints for user authentication, placemark management, social features (likes & comments), and admin statistics.

---

## 🚀 Features

- **User Authentication** (Signup, Login, JWT-based)
- **Placemark Management** (Create, Edit, Delete, Visibility Control)
- **Public Feed** (View & Interact with Public Placemarks)
- **Social Features** (Likes, Comments, User Profiles)
- **Admin Dashboard** (Statistics & User Management)

---

## 🛠️ Technologies Used

- **Node.js** & **Hapi.js** - API framework
- **Firebase Firestore** - Database
- **JWT (JSON Web Tokens)** - Secure authentication
- **CORS** - Cross-Origin requests handling

---

## 📂 Project Structure

```
backend/
│── src/
│   ├── controllers/    # API controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions (Auth, Validation)
│   ├── index.js        # Main entry point
│── .env                # Environment variables (⚠️ Do not commit this!)
│── package.json        # Dependencies & scripts
│── firebase-service-account.json (🚨 Do not commit this file!)
```

---

## 🔧 Setup & Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/placemark-backend.git
cd placemark-backend
```

### 2️⃣ Install Dependencies
```sh
yarn install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root and add:
```
PORT=4000
JWT_SECRET=your_jwt_secret
FIREBASE_SERVICE_ACCOUNT=./firebase-service-account.json
CORS_ALLOWED_ORIGIN=https://yourfrontenddomain.com
```

### 4️⃣ Start the Backend Server
```sh
yarn start
```

The server will run at:
```
http://localhost:4000
```

---

## 🔌 API Endpoints

### **User Routes**
| Method | Endpoint               | Description        | Auth Required |
|--------|------------------------|--------------------|--------------|
| POST   | `/api/users/signup`    | User registration | ❌ No |
| POST   | `/api/users/login`     | User login (JWT)  | ❌ No |

### **Placemark Routes**
| Method | Endpoint                 | Description                    | Auth Required |
|--------|--------------------------|--------------------------------|--------------|
| POST   | `/api/placemarks`        | Create a new placemark         | ✅ Yes |
| GET    | `/api/placemarks`        | Get user's placemarks          | ✅ Yes |
| GET    | `/api/placemarks/public` | Get public placemarks          | ❌ No |
| PUT    | `/api/placemarks/{id}`   | Update placemark details       | ✅ Yes |
| DELETE | `/api/placemarks/{id}`   | Delete a placemark             | ✅ Yes |

### **Social Features**
| Method | Endpoint                         | Description            | Auth Required |
|--------|----------------------------------|------------------------|--------------|
| POST   | `/api/placemarks/{id}/like`      | Like a placemark      | ✅ Yes |
| DELETE | `/api/placemarks/{id}/unlike`    | Unlike a placemark    | ✅ Yes |
| GET    | `/api/placemarks/{id}/comments`  | Get comments on placemark | ❌ No |
| POST   | `/api/placemarks/{id}/comments`  | Add a comment         | ✅ Yes |
| DELETE | `/api/placemarks/{id}/comments/{commentId}` | Delete a comment | ✅ Yes |

---

## 🌎 Deployment

### **Deploying on Render**
1. Push to GitHub:
   ```sh
   git push origin main
   ```
2. Set up a **Render Web Service** with:
   - Build Command: `yarn install`
   - Start Command: `node src/index.js`
   - Add environment variables (`.env`)

---

## 🛠️ Common Issues & Fixes

### ❌ `CORS policy error`
- Ensure CORS is enabled in `index.js`:
```js
const server = Hapi.server({
  port: process.env.PORT || 4000,
  host: '0.0.0.0',
  routes: {
    cors: {
      origin: [process.env.CORS_ALLOWED_ORIGIN],
      credentials: true
    }
  }
});
```
- Update `CORS_ALLOWED_ORIGIN` in `.env` to your frontend URL.

### ❌ `Firebase missing credentials`
- Ensure your `firebase-service-account.json` is in `.gitignore` and stored in **Render Secret Variables**.

---


## 📜 License

This project is licensed under the **MIT License**.