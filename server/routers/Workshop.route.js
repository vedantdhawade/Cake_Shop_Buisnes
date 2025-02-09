import express from "express";
import {
  getWorkshops,
  addWorkshop,
  deleteWorkshop,
} from "../controllers/Workshop.controller.js";

const router = express.Router();

router.get("/workshops", getWorkshops); // Fetch all workshops
router.post("/add-workshop", addWorkshop); // Add a workshop
router.delete("/delete-workshop", deleteWorkshop); // Delete a workshop

export default router;
