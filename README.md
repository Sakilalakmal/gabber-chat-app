<img width="1475" height="675" alt="gabber-chat-app" src="https://github.com/user-attachments/assets/9e78a1dc-8294-4bd1-99f5-0d8022fdc812" />

# Gabber Chat App - Real-Time Messaging Platform
Gabber is a modern, feature-rich messaging application designed to bridge communication gaps with real-time chat, video calling, and instant translation. Built with the MERN stack and powered by cutting-edge services, it offers a seamless and secure communication experience for users worldwide.

## 🚀 Features

- **💬 Real-Time Messaging**: Instant text messaging with typing indicators, read receipts, and file sharing, powered by Stream Chat.
- **🗣️ Real-Time Translation**: Break language barriers with instant message translation using Google Cloud Translation API.
- **📹 Video Integration**: High-quality video and audio calling capabilities for face-to-face communication.
- **🔐 Secure Authentication**: Robust security with JWT-based authentication and secure password hashing.
- **🤖 CI/CD Pipeline**: Automated build, test, and deployment workflows powered by Jenkins.
- **🎨 Modern UI/UX**: A responsive, sleek interface built with React 19, Tailwind CSS, and DaisyUI.
- **🐳 Docker Support**: Fully containerized environment for consistent and easy deployment.

## 🛠️ Tech Stack

This project leverages a modern and robust stack for performance and scalability:

- **Framework**: React 19 (Vite)
- **Language**: JavaScript (ES6+)
- **Backend**: Node.js & Express
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JSON Web Tokens (JWT) & Cookie Parser
- **Styling**: Tailwind CSS & DaisyUI
- **DevOps**: Docker, Jenkins (CI/CD)
- **Real-Time Services**: Stream.io (Chat & Video)
- **Translation**: Google Cloud Translation API

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Docker Desktop (for containerized run)
- GetStream.io Account (for API keys)
- Google Cloud Account (for Translation API)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/Sakilalakmal/gabber-chat-app.git
    cd gabber-chat-app
    ```

2.  **Install dependencies** (if running locally without Docker)

    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install
    ```

### Set up Environment Variables

Create a `.env` file in the `backend/` directory and add the following keys:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gabber-chat-app
JWT_SECRET=your_super_secret_key
NODE_ENV=development

# Stream.io Configuration
STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key

# Google Cloud (if using translation)
GOOGLE_APPLICATION_CREDENTIALS=path_to_your_credentials.json
```

Create a `.env` file in the `frontend/` directory (optional if strictly using backend proxy, but good for direct SDK usage):

```env
VITE_STREAM_API_KEY=your_stream_api_key
```

### 🏃‍♂️ Running the App

#### Option 1: Using Docker (Recommended)

The easiest way to run the entire stack (Database, Backend, Frontend):

```bash
docker-compose up --build
```

- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

#### Option 2: Manual Run

1.  **Start MongoDB** (Ensure local MongoDB is running)
2.  **Start Backend**:
    ```bash
    cd backend
    npm run dev
    ```
3.  **Start Frontend**:
    ```bash
    cd frontend
    npm run dev
    ```

## 🐳 Docker Deployment

The application is fully Dockerized. To build and run in production mode:

```bash
docker-compose -f docker-compose.yml up -d
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source.
