import express from "express";
import {
  createEmailTemplate,
  getAllEmailTemplates,
  getEmailTemplateById,
  updateEmailTemplate,
  deleteEmailTemplate,
} from "../controllers/emailTemplateController";

const router = express.Router();

router.post("/", createEmailTemplate);
router.get("/", getAllEmailTemplates);
router.get("/:id", getEmailTemplateById);
router.put("/:id", updateEmailTemplate);
router.delete("/:id", deleteEmailTemplate);

export default router;
