import { Router } from "express";
import { db } from "../db";
import { professionals } from "../../shared/schema";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const all = await db.select().from(professionals);
    res.json(all);
  } catch (err) {
    next(err);
  }
});

export default router;
