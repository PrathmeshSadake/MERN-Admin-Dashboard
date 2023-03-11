import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";

// ROUTES IMPORT
import salesRoutes from "./routes/sales";
import clientRoutes from "./routes/client";
import generalRoutes from "./routes/general";
import managementRoutes from "./routes/management";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// ROUTES
app.use("/sales", salesRoutes);
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);

const PORT = process.env.PORT || 5001;
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() =>
    app.listen(PORT).then(() => console.log(`Server Running at PORT: ${PORT}`))
  )
  .catch(() => {
    console.log("Error Connecting.");
  });
