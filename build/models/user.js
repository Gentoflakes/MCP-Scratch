import { z } from 'zod';
// User schema for validation
export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string()
});
