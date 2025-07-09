import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateEmail = [
  body("to").isEmail().withMessage("Invalid email address"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("text").notEmpty().withMessage("Text content is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
