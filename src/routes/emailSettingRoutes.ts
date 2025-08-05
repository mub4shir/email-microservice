import express from "express";
import {
  createEmailSetting,
  getAllEmailSettings,
  getEmailSettingById,
  updateEmailSetting,
  deleteEmailSetting,
} from "../controllers/emailSettingController";

const router = express.Router();

router.post("/", createEmailSetting);
router.get("/", getAllEmailSettings);
router.get("/:id", getEmailSettingById);
router.put("/:id", updateEmailSetting);
router.delete("/:id", deleteEmailSetting);

export default router;
