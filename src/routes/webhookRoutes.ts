import { Router } from "express";
import { ticketBookedWebhook } from "../controllers/webhookController";

const router = Router();

router.post("/ticket-booked", ticketBookedWebhook);

export default router;
