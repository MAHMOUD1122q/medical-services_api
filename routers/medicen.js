import express  from "express";

import {AddMedicen, allMedicen, deleteMedicen, singleMedicen, updateMedicen} from "../controllers/medicen.js";

const router = express.Router();

router.post("/add-medicen", AddMedicen)

router.get("/all-medicen", allMedicen) 

router.get("/single-medicen/:id", singleMedicen)

router.patch("/update-medicen/:id", updateMedicen)

router.delete("/delete-medicen/:id", deleteMedicen)

export default router;