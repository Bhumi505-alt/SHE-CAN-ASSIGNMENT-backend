import express from 'express';

import leaderRoutes from "./routes/leaderRoutes.js";
import interRoutes from "./routes/interRoutes.js";
import cors from "cors";

const app = express(); 


app.use(cors({
  origin: "http://localhost:8080", 
  methods: ["GET", "POST"],
}));
app.use(express.json());

app.use("/api", leaderRoutes);
app.use("/api", interRoutes);

app.listen(5000, () => {
    console.log("Server is working on port 5000");
});
