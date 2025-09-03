import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { userSchema } from '../models/user.js';
import { UserService } from '../services/userService.js';

// Register user-related tools with the MCP server
export function registerUserTools(server: McpServer): void {
    // Tool for creating a new user
    server.tool(
        "create-user", 
        "Create a new user in our database", 
        {
            name: userSchema.shape.name,
            email: userSchema.shape.email,
            phone: userSchema.shape.phone,
            address: userSchema.shape.address
        }, 
        {
            title: "create user",
            readOnlyHint: false,
            destructiveHint: false,
            idempotentHint: false, // Creating multiple users with same data creates different entries
            openWorldHint: true // Interacts with file system (database)
        }, 
        async (params) => {
            try {
                const id = await UserService.createUser(params);
                return {
                    content: [
                        { type: "text", text: `User created successfully with ID: ${id}` }
                    ]
                };
            } catch (error) {
                console.error('Error creating user:', error);
                return {
                    content: [
                        { type: "text", text: "Failed to create user. Please try again." }
                    ]
                };
            }
        }
    );
}
