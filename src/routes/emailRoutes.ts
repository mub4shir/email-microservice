import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { validateEmail } from "../middlewares/validationMiddleware";
import {
  EmailController,
  sendEmailController,
} from "../controllers/emailController";

import { dynamicSendEmail } from "../controllers/dynamicSendEmail";

const emailRoutes = (emailController: EmailController) => {
  const router = Router();

  router.post(
    "/send",
    validateEmail,
    (req: Request, res: Response, next: NextFunction) =>
      emailController.sendEmail(req, res, next)
  );

  router.post("/send-email", sendEmailController);

  router.post("/send-dynamic-email", dynamicSendEmail);
  return router;
};

export default emailRoutes;
