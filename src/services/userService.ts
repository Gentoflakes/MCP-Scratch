import fs from 'node:fs/promises';
import path from 'node:path';
import { User, CreateUserInput } from '../models/user.js';

// Database service for user operations
export class UserService {
    private static readonly DATA_PATH = './src/data/users.json';

    // Get all users from the database
    static async getAllUsers(): Promise<User[]> {
        try {
            const users = await import('../data/users.json', {
                with: { type: "json" }
            }).then(module => module.default);
            return users as User[];
        } catch (error) {
            console.error('Error reading users:', error);
            return [];
        }
    }

    // Get user by ID
    static async getUserById(userId: number): Promise<User | null> {
        const users = await this.getAllUsers();
        return users.find(user => user.id === userId) || null;
    }

    // Create a new user
    static async createUser(userData: CreateUserInput): Promise<number> {
        const users = await this.getAllUsers();
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        
        const newUser: User = {
            ...userData,
            id: newId
        };

        users.push(newUser);
        await this.saveUsers(users);
        return newId;
    }

    // Save users to file
    private static async saveUsers(users: User[]): Promise<void> {
        await fs.writeFile(this.DATA_PATH, JSON.stringify(users, null, 2));
    }
}
