import "dotenv/config";
import { db } from "../server/db";
import { serviceCategories } from "../shared/schema";

(async () => {
  const [cat] = await db.insert(serviceCategories).values({
    name: "Cleaning",
    description: "Professional home cleaning, deep cleaning, bathroom & kitchen cleaning",
    icon: "broom",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    startingPrice: "299",
    rating: "4.8",
    reviewCount: 2100
  }).returning();
  console.log("Inserted category:", cat);
  process.exit(0);
})();
