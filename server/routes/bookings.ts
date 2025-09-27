// server/routes/bookings.ts
import { Router } from "express";
import { db } from "../db";
import { bookings } from "../../shared/schema";
import { eq } from "drizzle-orm";

const router = Router();

// ✅ Create a booking
router.post("/", async (req, res, next) => {
  try {
    const {
      userId,
      serviceId,
      professionalId,
      scheduledDate,
      scheduledTime,
      address,
      phone,
      totalAmount,
      notes,
    } = req.body;

    // --- validation ---
    if (!userId || !serviceId || !professionalId || !scheduledDate || !scheduledTime) {
      return res.status(400).json({
        error:
          "Required fields: userId, serviceId, professionalId, scheduledDate, scheduledTime",
      });
    }

    const [newBooking] = await db
      .insert(bookings)
      .values({
        userId,
        serviceId, // required now
        professionalId,
        scheduledDate: new Date(scheduledDate),
        scheduledTime,
        address: address ?? null,
        phone: phone ?? null,
        status: "pending",
        totalAmount: totalAmount ?? "0",
        notes: notes ?? null,
      })
      .returning();

    return res.status(201).json(newBooking);
  } catch (err) {
    next(err);
  }
});

// ✅ Get all bookings for a specific user
router.get("/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const rows = await db.select().from(bookings).where(eq(bookings.userId, userId));
    return res.json(rows);
  } catch (err) {
    next(err);
  }
});

// ✅ Update booking status
router.patch("/:id/status", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: "Missing status" });

    const [updated] = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();

    return res.json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;
