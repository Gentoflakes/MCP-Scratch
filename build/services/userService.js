import fs from 'node:fs/promises';
// Database service for user operations
export class UserService {
    static DATA_PATH = './src/data/users.json';
    // Get all users from the database
    static async getAllUsers() {
        try {
            const users = await import('../data/users.json', {
                with: { type: "json" }
            }).then(module => module.default);
            return users;
        }
        catch (error) {
            console.error('Error reading users:', error);
            return [];
        }
    }
    // Get user by ID
    static async getUserById(userId) {
        const users = await this.getAllUsers();
        return users.find(user => user.id === userId) || null;
    }
    // Create a new user
    static async createUser(userData) {
        const users = await this.getAllUsers();
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        const newUser = {
            ...userData,
            id: newId
        };
        users.push(newUser);
        await this.saveUsers(users);
        return newId;
    }
    // Save users to file
    static async saveUsers(users) {
        await fs.writeFile(this.DATA_PATH, JSON.stringify(users, null, 2));
    }
}
