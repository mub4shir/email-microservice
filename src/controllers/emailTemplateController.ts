import { Request, Response } from "express";
import { EmailTemplate } from "../models/EmailTemplate";

// CREATE
export const createEmailTemplate = async (req: Request, res: Response) => {
  try {
    const template = await EmailTemplate.create(req.body);
    res.status(201).json(template);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// READ ALL
export const getAllEmailTemplates = async (_req: Request, res: Response) => {
  try {
    const templates = await EmailTemplate.find();
    res.status(200).json(templates);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// READ ONE
export const getEmailTemplateById = async (req: Request, res: Response) => {
  try {
    const template = await EmailTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ error: "Not found" });
    res.status(200).json(template);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// UPDATE
export const updateEmailTemplate = async (req: Request, res: Response) => {
  try {
    const template = await EmailTemplate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!template) return res.status(404).json({ error: "Not found" });
    res.status(200).json(template);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// DELETE
export const deleteEmailTemplate = async (req: Request, res: Response) => {
  try {
    const deleted = await EmailTemplate.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
