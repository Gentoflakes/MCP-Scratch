import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMcpServer, validateMcpContext } from './config/serverConfig.js';
import { registerUserTools } from './tools/userTools.js';
import { registerUserResources } from './resources/userResources.js';
import { registerUserPrompts } from './prompts/userPrompts.js';
// Create and configure the MCP server
const server = createMcpServer();
// Register all modules with the server
registerUserTools(server);
registerUserResources(server);
registerUserPrompts(server);
// Main function to start the MCP server
// Communication protocols: stdio for local server-client, http for remote hosting
async function main() {
    // Validate that we're running in proper MCP context
    validateMcpContext();
    // Create stdio transport for communication with MCP client
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
main();
