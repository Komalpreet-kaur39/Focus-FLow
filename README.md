# FocusFlow 📝

A full-stack Notes & Task Manager app built to help you organize tasks, take notes, and stay focused — all in one place.

## ✨ Features

- Create, edit, and delete notes/tasks
- Organize tasks by status (pending / completed) 
- Real-time state management with Context API
- Persistent storage with MongoDB Atlas
- Responsive UI built with Next.js and React
- RESTful API backend with Node.js & Express

## 🛠️ Tech Stack

**Frontend**
- Next.js
- React
- Context API (state management)
- CSS Modules

**Backend**
- Node.js
- Express.js
- MongoDB Atlas (Mongoose)

**Other**
- Git & GitHub for version control

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- A MongoDB Atlas account (or local MongoDB instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Komalpreet-kaur39/Focus-FLow.git
   cd Focus-FLow
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies** *(if backend is in a separate folder, e.g. `/server`)*
   ```bash
   cd server
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the backend root with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

5. **Run the backend**
   ```bash
   npm run dev
   ```

6. **Run the frontend** (in a separate terminal, from the project root)
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👩‍💻 Author

**Komalpreet Kaur**
- GitHub: [@Komalpreet-kaur39](https://github.com/Komalpreet-kaur39)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
