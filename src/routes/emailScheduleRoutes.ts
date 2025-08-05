import express from "express";
import {
  createEmailSchedule,
  getAllEmailSchedules,
  getEmailScheduleById,
  updateEmailSchedule,
  deleteEmailSchedule,
} from "../controllers/emailScheduleController";

const router = express.Router();

router.post("/", createEmailSchedule);
router.get("/", getAllEmailSchedules);
router.get("/:id", getEmailScheduleById);
router.put("/:id", updateEmailSchedule);
router.delete("/:id", deleteEmailSchedule);

export default router;
