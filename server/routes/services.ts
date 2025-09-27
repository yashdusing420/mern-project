// server/routes/services.ts
import { Router } from "express";
import { db } from "../db";
import { services, insertServiceSchema } from "../../shared/schema";
import { eq } from "drizzle-orm";

const router = Router();

// Create a new service
router.post("/", async (req, res, next) => {
  try {
    // Validate and type-check request body
    const parsed = insertServiceSchema.parse(req.body);

    const [newService] = await db.insert(services).values(parsed).returning();
    res.status(201).json(newService);
  } catch (err) {
    next(err);
  }
});

// Get services (optional ?categoryId=… filter)
router.get("/", async (req, res, next) => {
  try {
    const { categoryId } = req.query as { categoryId?: string };

    const rows = categoryId
      ? await db.select().from(services).where(eq(services.categoryId, categoryId))
      : await db.select().from(services);

    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export default router;
