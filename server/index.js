import express from "express";
import uploadRouter from "./route/uploadRouter.js";
import getRouter from "./route/getRoute.js";
import cors from "cors";
import dotenv from "dotenv";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/post", ClerkExpressRequireAuth(), uploadRouter);
app.use("/api/get", getRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json("Unauthenticated request!");
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
