import express from "express";
import cors from "cors";
import { MysqlConnection } from "./database/mysqlConnection.js";
import UserRoute from './routes/route.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/pewg", UserRoute);

const startServer = async () => {
  try {
    MysqlConnection();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

startServer();
