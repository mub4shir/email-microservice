import { Request, Response } from "express";
import { EmailSetting } from "../models/EmailSetting";

// CREATE
export const createEmailSetting = async (req: Request, res: Response) => {
  try {
    const setting = await EmailSetting.create(req.body);
    res.status(201).json(setting);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// READ ALL
export const getAllEmailSettings = async (_req: Request, res: Response) => {
  try {
    const settings = await EmailSetting.find();
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// READ ONE
export const getEmailSettingById = async (req: Request, res: Response) => {
  try {
    const setting = await EmailSetting.findById(req.params.id);
    if (!setting) return res.status(404).json({ error: "Not found" });
    res.status(200).json(setting);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// UPDATE
export const updateEmailSetting = async (req: Request, res: Response) => {
  try {
    const setting = await EmailSetting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!setting) return res.status(404).json({ error: "Not found" });
    res.status(200).json(setting);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// DELETE
export const deleteEmailSetting = async (req: Request, res: Response) => {
  try {
    const deleted = await EmailSetting.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
