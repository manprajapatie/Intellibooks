Step 1. Start Docker Desktop
- Open Docker Desktop.
- Wait until Docker is running.
Step 2. Start the database
Open your IntelliBooks project root folder in the terminal.

This folder should contain your docker-compose.yml file.

Run:
docker compose up -d

Check whether it's running:
docker ps

You should see:
intellibooks-db

Start the backend
Open a new terminal.
cd backend
npm install
npm run dev

Your backend should start on:
http://localhost:5000

Make sure your backend/.env file contains the correct database connection:
PORT=5000
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://postgres:intellibooks123@localhost:5432/intellibooks

Start the frontend
Open another terminal.
cd frontend
npm install
npm run dev

Your frontend should start on:
http://localhost:5173
