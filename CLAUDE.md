# Stablecoin Pulse — Project Rules

## Tech Stack
Primary stack: TypeScript, Next.js, Tailwind CSS. Default to these technologies unless specified otherwise.

## Git Workflow
- Never push to git without explicit user permission. Always ask before running `git push`.
- Never use `--no-verify` or skip pre-commit hooks.
- Never amend a previous commit unless explicitly asked.

## Development Workflow
- Before implementing major UI changes (redesigns, navigation overhauls, view switching), create a checkpoint commit so changes can be cleanly reverted if unsatisfying.
- After implementation, verify existing functionality (globe rendering, navigation, page state) still works before presenting the result.
- If a change breaks existing features, revert before proceeding — do not layer fixes on top of broken state.

## Content & Data Accuracy
- When blog posts or UI display data/statistics, always cross-reference with live data sources or the actual app state. Never hardcode stats that could drift from real values.
- When writing social media content, use simple non-technical language. Avoid jargon like 'JS', 'Lighthouse', 'TTL', 'API', or developer terminology unless explicitly asked. Target audience is non-technical.

## File Management
- When saving files for user access, save to visible, user-accessible directories (Desktop, Documents, or project root). Never save to hidden directories like `.claude/` unless the file is a config/skill.

## Integration Debugging Log
Known issues and fixes — read this before debugging any integration:

### MCP Configuration
- MCP config goes in `~/.claude.json` under the top-level `mcpServers` key
- NOT `~/.claude/.mcp.json` — that file is wrong/unused
- If MCP tools aren't loading, check `~/.claude.json` `mcpServers` section

### TickTick MCP
- Server: `jen6/ticktick-mcp` (via uvx from git), credentials inline in env vars
- Known broken features: move, update, delete, complete, and recurrence functions have silently failed in the past
- If a tool silently fails, check server logs before retrying
- Never suggest "try restarting" — diagnose programmatically first
- If a function fails 3 times, stop and tell the user what's broken instead of working around it silently

### Deployment (Vercel)
- Always check DB migrations before deploying
- Verify build passes locally before pushing to deploy
- After deploy, check that sidebar items, globe rendering, and navigation all work in production
