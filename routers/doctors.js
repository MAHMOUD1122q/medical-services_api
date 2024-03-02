import express  from "express";
import {SingleDocotor, addDoctor, allDoctor, deleteDocotor, updateDoctor} from "../controllers/doctors.js";

const router = express.Router();

router.post("/add-doctor", addDoctor)

router.get("/all-doctors", allDoctor)

router.get("/single-doctor/:id", SingleDocotor)

router.patch("/update-doctor/:id", updateDoctor)

router.delete("/delete-doctor/:id", deleteDocotor)



export default router;