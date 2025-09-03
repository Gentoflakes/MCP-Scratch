import { z } from 'zod';
// Register user-related prompts with the MCP server
export function registerUserPrompts(server) {
    // Prompt for generating fake user data
    server.prompt("generate-fake-users", "Generate fake user data when provided with a name", {
        name: z.string()
    }, ({ name }) => {
        return {
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Generate a realistic fake user with the name "${name}". 
                            Include the following fields in JSON format:
                            - name: "${name}"
                            - email: a realistic email address
                            - phone: a realistic phone number
                            - address: a realistic address
                            
                            Return only the JSON object with keys: name, email, phone, address`
                    }
                }
            ]
        };
    });
}
