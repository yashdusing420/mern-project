import { db } from "../db";
import { professionals, type InsertProfessional } from "../../shared/schema";
import dataset from "./professionals.json" assert { type: "json" };

async function main() {
  // Convert each record to match InsertProfessional exactly
  const rows: InsertProfessional[] = (dataset as any[]).map((pro) => ({
    name: pro.name,
    email: pro.email,
    phone: pro.phone,
    address: pro.address,
    lat: pro.lat,
    lng: pro.lng,
    description: pro.description ?? null,
    rating: "0",          // decimal fields are strings in drizzle types
    reviewCount: 0,
    profileImage: null,
    isVerified: false,
    isActive: true,
    specialization: pro.category ?? "General",
    experience: 0
  }));

  await db.insert(professionals).values(rows);
  console.log("✅ Seeding complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
