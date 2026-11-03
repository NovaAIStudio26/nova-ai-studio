import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Temporary Phase 1 Step 1.6 verification table.
// This is not the final NOVA production database schema.
export const foundationVerification = pgTable("foundation_verification", {
  id: serial("id").primaryKey(),
  checkName: text("check_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
