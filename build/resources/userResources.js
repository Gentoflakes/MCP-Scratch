import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { UserService } from '../services/userService.js';
// Register user-related resources with the MCP server
export function registerUserResources(server) {
    // Resource for getting all users
    server.resource("users", "users://all", {
        description: "Get all users data from the database",
        title: "All Users",
        mimeType: "application/json"
    }, async (uri) => {
        const users = await UserService.getAllUsers();
        return {
            contents: [
                {
                    uri: uri.href,
                    text: `List of all users in the database:\n${JSON.stringify(users, null, 2)}`,
                    mimeType: "application/json"
                }
            ]
        };
    });
    // Resource for getting user details by ID
    server.resource("user-details", new ResourceTemplate("users://{userId}/profile", {
        list: undefined
    }), {
        description: "Get user data by ID",
        title: "User Profile",
        mimeType: "application/json"
    }, async (uri, { userId }) => {
        if (!userId) {
            throw new Error("userId is required");
        }
        const user = await UserService.getUserById(parseInt(userId));
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        return {
            contents: [
                {
                    uri: uri.href,
                    text: JSON.stringify(user, null, 2),
                    mimeType: "application/json"
                }
            ]
        };
    });
}
