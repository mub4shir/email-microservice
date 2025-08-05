// controllers/templateDocument.controller.ts
import { Request, Response } from "express";
import { TemplateDocument } from "../models/TemplateDocument";

export const createTemplateDocument = async (req: Request, res: Response) => {
  try {
    const doc = new TemplateDocument(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getAllTemplateDocuments = async (req: Request, res: Response) => {
  try {
    const docs = await TemplateDocument.find();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getTemplateDocumentById = async (req: Request, res: Response) => {
  try {
    const doc = await TemplateDocument.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateTemplateDocument = async (req: Request, res: Response) => {
  try {
    const updated = await TemplateDocument.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteTemplateDocument = async (req: Request, res: Response) => {
  try {
    const deleted = await TemplateDocument.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
