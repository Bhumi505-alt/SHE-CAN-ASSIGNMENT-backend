import express from 'express';

import leaderRoutes from "./routes/leaderRoutes.js";
import interRoutes from "./routes/interRoutes.js";
import cors from "cors";

const app = express(); 

const allowedOrigins = [
    "http://localhost:8080",
     'https://intern-assignment-blush.vercel.app'
];

app.use(cors({
  origin: allowedOrigins, 
  methods: ["GET", "POST"],
}));
app.use(express.json());

app.use("/api", leaderRoutes);
app.use("/api", interRoutes);

app.listen(5000, () => {
    console.log("Server is working on port 5000");
});
