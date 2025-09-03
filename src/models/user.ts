import { z } from 'zod';

// User schema for validation
export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string()
});

// User interface for TypeScript
export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

// Type for creating a new user (without id)
export type CreateUserInput = z.infer<typeof userSchema>;
