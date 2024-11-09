import express from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser"; // This is fine if used elsewhere
import cookieParser from "cookie-parser";
import appRouter from "./routes/index.js";

config();

const app = express();

// Middlewares
app.use(express.json({ limit: "5mb" })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use(
  cors({
    origin: [
      "https://blogbazzar365.web.app",
      "https://blogbazzar.onrender.com",
    ], // Allow requests from your frontend
    credentials: true, // Allow credentials (cookies, authentication)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Define allowed methods
    allowedHeaders: "Content-Type,Authorization", // Define allowed headers
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET));

// Logging middleware (remove or adjust for production)
app.use(morgan("dev"));

// Test route
app.get("/", (req, res) => {
  res.send("Welcome To BlogBazzar API...😎");
});

// Main routes
app.use("/api/v1", appRouter);

export default app;
