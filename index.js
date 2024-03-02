import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routers/auth.js";
import blogRouter from "./routers/blog.js";
import doctorsRouter from "./routers/doctors.js";
import medicenRouter from "./routers/medicen.js";
import appointmentRouter from "./routers/appointment.js";
import cors from "cors";
import "dotenv/config";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({credentials: true, origin:[
  'http://localhost:3000',
  "*"
]}));

const port = process.env.SERVER_PORT || 4000;

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/doctor", doctorsRouter);
app.use("/api/medicen", medicenRouter );
app.use("/api/appointment", appointmentRouter );

try {
  mongoose
    .connect(process.env.DB_SECRET)
    .then(console.log("connect to Database"))
    .then(
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      })
    );
} catch (e) {
  console.log(e);
}
