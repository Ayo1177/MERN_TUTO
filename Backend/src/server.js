import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js"; // Import the connectDB function
import rateLimiter from "./middlewarefolder/rateLimiter.js";
import cors from "cors"; // Import CORS middleware

const app = express();
const PORT = process.env.PORT || 5001;



//middleware
app.use(express.json());

/*app.use((req,res,next) => {
    console.log("we just got a new call");
    console.log('req method:', req.method, 'req url:', req.url);
    next();
})*/

app.use(rateLimiter); // Apply rate limiting middleware
app.use(cors(
    {
        origin: "http://localhost:5173", // Allow requests from this origin
    }
)); // Enable CORS for all routes

app.use("/api/notes", notesRoutes);
// each service gets routed to its own file "notesRoutes.js"
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