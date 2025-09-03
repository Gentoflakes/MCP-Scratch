import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

// Server configuration and initialization
export function createMcpServer(): McpServer {
    return new McpServer({
        name: 'user-management-server',
        version: '1.0.0',
        capabilities: {
            resources: {},
            tools: {},
            prompts: {},
        },
    });
}

// Validation for proper MCP execution context
export function validateMcpContext(): void {
    // Check if running in proper MCP client context (via inspector or client)
    // How the MCP Protocol Works:
    // MCP servers are designed to be spawned by MCP clients/inspectors
    // They communicate via stdio (standard input/output) with JSON-RPC messages
    // When you run npm run server:inspect, the inspector spawns your server as a child process and handles the stdio communication
    // Running the server directly from terminal doesn't provide the proper stdio context
    if (process.stdin.isTTY) {
        console.error('This MCP server is designed to be run via MCP inspector or client, not directly from terminal.');
        console.error('Use: npm run server:inspect');
        process.exit(1);
    }
}
