// routes/templateDocument.ts
import express from "express";
import {
  createTemplateDocument,
  getAllTemplateDocuments,
  getTemplateDocumentById,
  updateTemplateDocument,
  deleteTemplateDocument,
} from "../controllers/templateDocument.controller";

const router = express.Router();

router.post("/", createTemplateDocument);
router.get("/", getAllTemplateDocuments);
router.get("/:id", getTemplateDocumentById);
router.put("/:id", updateTemplateDocument);
router.delete("/:id", deleteTemplateDocument);

export default router;
