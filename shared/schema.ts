import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  startTime: timestamp("start_time").notNull().defaultNow(),
  endTime: timestamp("end_time"),
  totalRecognitions: integer("total_recognitions").notNull().default(0),
  averageConfidence: real("average_confidence").notNull().default(0),
});

export const predictions = pgTable("predictions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull().references(() => sessions.id),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  gesture: text("gesture").notNull(),
  confidence: real("confidence").notNull(),
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  startTime: true,
}).extend({
  endTime: z.coerce.date().nullable().optional(),
});

export const insertPredictionSchema = createInsertSchema(predictions).omit({
  id: true,
  timestamp: true,
});

export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;
export type InsertPrediction = z.infer<typeof insertPredictionSchema>;
export type Prediction = typeof predictions.$inferSelect;
