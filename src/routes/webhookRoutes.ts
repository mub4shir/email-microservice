import { Router } from "express";
import { ticketPaymentWebhook } from "../controllers/webhookController";

const router = Router();

router.get("/payment", ticketPaymentWebhook);

export default router;
