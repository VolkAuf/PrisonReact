import dotenv from "dotenv";
dotenv.config();

import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import router from "./routes/index";
import socketController from "./controllers/socketController";

const app = express();
const port = process.env.PORT || 3000;
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:4173"], // Разрешить клиенту
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use("/api", router);

socketController(io);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
