import dotenv from "dotenv";
import path from "path";
dotenv.config(); // Load environment variables from .env file

import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js"; // Import the connectDB function
import cors from "cors"; // Import CORS middleware

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); // Get the current directory name

//middleware
app.use(express.json());

/*app.use((req,res,next) => {
    console.log("we just got a new call");
    console.log('req method:', req.method, 'req url:', req.url);
    next();
})*/
if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
        console.log("we just got a new call");
        console.log('req method:', req.method, 'req url:', req.url);
        next();
    });
}

app.use(cors(
    {
        origin: "http://localhost:5173", // Allow requests from this origin
    }
)); // Enable CORS for all routes

app.use("/api/notes", notesRoutes);

// --- Deployment Configuration ---
// This section should be placed after all API routes.
if (process.env.NODE_ENV === "production") {
    // If in production, serve the frontend's static files from the 'dist' folder.
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // For any request that doesn't match an API route, send back the frontend's index.html file.
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
} else {
    // Optional: A simple welcome message for development mode.
    app.get("/", (req, res) => res.send("API is running in development mode..."));
}

connectDB()
.then(() => { // Connect to MongoDB
    app.listen(PORT, () => {
        console.log("Server is running on port:" + PORT);
    });
})
.catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
});
