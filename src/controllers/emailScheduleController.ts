import { Request, Response } from "express";
import { EmailSchedule } from "../models/EmailSchedule";

// CREATE
export const createEmailSchedule = async (req: Request, res: Response) => {
  try {
    const schedule = await EmailSchedule.create(req.body);
    res.status(201).json(schedule);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// READ ALL
export const getAllEmailSchedules = async (_req: Request, res: Response) => {
  try {
    const schedules = await EmailSchedule.find();
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// READ ONE
export const getEmailScheduleById = async (req: Request, res: Response) => {
  try {
    const schedule = await EmailSchedule.findById(req.params.id);
    if (!schedule) return res.status(404).json({ error: "Not found" });
    res.status(200).json(schedule);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// UPDATE
export const updateEmailSchedule = async (req: Request, res: Response) => {
  try {
    const schedule = await EmailSchedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!schedule) return res.status(404).json({ error: "Not found" });
    res.status(200).json(schedule);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// DELETE
export const deleteEmailSchedule = async (req: Request, res: Response) => {
  try {
    const deleted = await EmailSchedule.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
