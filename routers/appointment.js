import express  from "express";
import { addAppointment, allAppointment, deleteAppointment } from "../controllers/appointment.js";
const router = express.Router();

// to add the appointment
router.post("/add-appointment/:id", addAppointment)

// to get all the appointment
router.get("/all-appointment", allAppointment)

// to delete the appointment
router.delete("/delete-appointment/:id", deleteAppointment)

export default router;