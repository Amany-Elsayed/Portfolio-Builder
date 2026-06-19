# Portfolio Builder Backend

Backend API for a Portfolio Builder application built with **Node.js**, **Express**, and **MongoDB**.  
This backend handles authentication, portfolio management, and image uploads.

---

## Features

- User authentication (Register / Login)
- JWT-based authorization
- Create & update portfolio
- Public portfolio access by username
- Profile image & project image upload
- Centralized error handling
- Secure password hashing

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-async-handler
- Multer (image uploads)
- Cloudinary (image storage)

---

## Project Structure

```
backend/
├── config/
│   ├── db.js
│   └── cloudinary.js
├── controllers/
│   ├── authController.js
│   └── portfolioController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── uploadMiddleware.js
├── models/
│   ├── User.js
│   └── Portfolio.js
├── routes/
│   ├── authRoutes.js
│   └── portfolioRoutes.js
├── utils/
│   ├── ApiError.js
│   └── generateToken.js
├── .env
├── server.js
└── README.md
```

---

## Environment Variables

Create a `.env` file in the root:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

---

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Portfolio
- `POST /api/portfolio` (protected)
- `PUT /api/portfolio` (protected)
- `GET /api/portfolio/me` (protected)
- `GET /api/portfolio/:username` (public)
- `POST /api/portfolio/upload-profile-image` (protected)
- `POST /api/portfolio/projects/:projectId/images` (protected)


---

## Run Locally

```bash
npm install
npm run dev
```

---

## Testing
- Use **Postman** or **Thunder Client**
- Add JWT token in headers:
```
Authorization: Bearer <your_token>
```

---

## Notes
- Images are stored in Cloudinary
- Only image URLs are saved in MongoDB
- `.env` and `node_modules` are excluded from GitHub

---

## Author
Amany Elsayed  
Junior MEARN Stack Developer
