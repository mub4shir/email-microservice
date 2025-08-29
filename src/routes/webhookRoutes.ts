import { Router } from "express";
import {
  ticketPaymentWebhook,
  ticketConfirmedWebhook,
} from "../controllers/webhookController";

const router = Router();

router.get("/payment", ticketPaymentWebhook);
router.get("/confirmed", ticketConfirmedWebhook);

export default router;
