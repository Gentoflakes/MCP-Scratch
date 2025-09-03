useage guide : 

- npm run server:build:watch
This runs the TypeScript compiler in watch mode. It automatically recompiles your TypeScript files in src/ to JavaScript in build/ whenever you make changes. It does not run or start your server—just keeps your build up to date.

- npm run server:inspect
This starts the MCP Inspector, which launches your MCP server in a special mode that allows you to interact with it using the Inspector UI. It connects to your server via stdio, so you can use tools, resources, and prompts as intended.


- what is mcp.json -> it tells our client what servers exist and how to talk to them. It specifies how to start each server and debug or run them. client here is cline which is mcp compactible.


- how mcp.json is coded : 

Start a Node.js MCP server at build/server.js
Run it in the project’s workspace folder
Communicate via stdio
Watch build/**/*.js during dev and enable Node debugging

- restart vs code and the restart your server to add resources to co-pilot context as it doesnt pick up directly.

- Think of them as data endpoints that expose structured information. Each resource has a stable URI so the model can refer to it consistently (e.g., users://all)
