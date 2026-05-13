import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(2, "Name is too short").max(80),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a valid phone").max(30),
  date: z.string().min(1, "Choose a date"),
  time: z.string().min(1, "Choose a time"),
  guests: z.coerce.number().int().min(1).max(20),
  notes: z.string().max(500).optional().nullable()
});

export const menuItemSchema = z.object({
  name: z.string().min(2).max(80),
  // Optional — many simple coffee/tea items have no description.
  description: z
    .string()
    .max(400)
    .optional()
    .or(z.literal(""))
    .nullable(),
  price: z.coerce.number().min(0),
  category: z.string().min(2).max(40),
  image: z.string().url().optional().or(z.literal("")).nullable(),
  featured: z.boolean().optional().default(false),
  available: z.boolean().optional().default(true)
});

export type ReservationInput = z.infer<typeof reservationSchema>;
export type MenuItemInput = z.infer<typeof menuItemSchema>;
