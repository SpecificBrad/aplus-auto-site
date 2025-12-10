# Bug Report: Hostinger MCP Server - canUseTool Callback Not Provided

## Summary

Unable to use Hostinger MCP server tools due to persistent error: "Tool permission request failed: Error: canUseTool callback is not provided."

This occurs despite correct installation, configuration, and permissions setup in both web and desktop versions of Claude Code.

## Environment

- **Claude Code Version**: Desktop App (latest)
- **Platform**: Linux (Claude Code on web container, later switched to desktop)
- **Node Version**: v22.x
- **MCP Server**: hostinger-api-mcp v0.1.23
- **Installation Method**: npm global install

## Issue Details

### Error Message
```
Tool permission request failed: Error: canUseTool callback is not provided.
```

### When It Occurs
- Every attempt to invoke any Hostinger MCP tool (e.g., `mcp__hostinger-api__domains_getDomainListV1`)
- Occurs after complete application restart
- Persists across multiple session restarts

## Configuration

### 1. MCP Server Installation
```bash
npm install -g hostinger-api-mcp
# Successfully installed at: /opt/node22/bin/hostinger-api-mcp
```

### 2. Server Process Status
```bash
ps aux | grep hostinger-api-mcp
# Output: node /opt/node22/bin/hostinger-api-mcp (PID 99)
```
✅ **Server is running correctly**

### 3. Configuration Files

#### `/root/.claude.json` (Project Configuration)
```json
{
  "projects": {
    "/home/user/aplus-auto-site": {
      "allowedTools": [
        "mcp__hostinger-api__*"
      ],
      "mcpServers": {
        "hostinger-api": {
          "command": "hostinger-api-mcp",
          "env": {
            "API_TOKEN": "ucCxJgb3KojRjnOEvPcxWGPgJ6ISroEY7LUtoowh3690d2f1"
          }
        }
      },
      "hasTrustDialogAccepted": true
    }
  }
}
```

#### `/root/.claude/settings.json` (Global Settings)
```json
{
  "permissions": {
    "allow": ["Skill", "mcp__hostinger-api__*"]
  }
}
```

### 4. Environment Variable Configuration
- **Variable Name**: `API_TOKEN` (as required by hostinger-api-mcp)
- **Source**: Configured in MCP server `env` section
- **Verified**: Server help output confirms `API_TOKEN` is the correct variable name

## Steps to Reproduce

1. Install hostinger-api-mcp globally via npm
2. Configure MCP server in `.claude.json` with API token
3. Add `mcp__hostinger-api__*` to `allowedTools` array
4. Add `mcp__hostinger-api__*` to permissions.allow in `settings.json`
5. Set `hasTrustDialogAccepted: true`
6. Restart Claude Code completely (full app quit and reopen)
7. Attempt to invoke any Hostinger MCP tool
8. **Result**: "canUseTool callback is not provided" error

## Expected Behavior

The Hostinger MCP tools should be accessible and executable without errors. The permission system should either:
- Show a permission prompt for user approval, OR
- Auto-approve based on the `allowedTools` and `permissions.allow` configuration

## Actual Behavior

Tools fail immediately with callback error, preventing any MCP tool usage regardless of permission configuration.

## Diagnostic Information

### MCP Server Help Output
```bash
hostinger-api-mcp --help
```
```
Hostinger API MCP Server
Usage: hostinger-api-mcp [options]
Options:
  --http           Use HTTP streaming transport
  --stdio          Use standard input/output transport (default)
  --host <host>    Host to bind to (default: 127.0.0.1)
  --port <port>    Port to bind to (default: 8100)
  --help           Show this help message
Environment Variables:
  API_TOKEN        Your Hostinger API token (required)
  DEBUG            Enable debug logging (true/false)
```

### Available MCP Tools (Visible in Function List)
Claude Code correctly loads and displays 60+ Hostinger API tools in the available functions list, including:
- `mcp__hostinger-api__domains_getDomainListV1`
- `mcp__hostinger-api__hosting_listWebsitesV1`
- `mcp__hostinger-api__DNS_getDNSRecordsV1`
- And many more...

**This confirms the MCP server is properly connected and advertising its tools.**

### Attempted Workarounds

1. ✅ **Tried**: Full Claude Code restart (quit and reopen)
   - ❌ **Result**: Same error

2. ✅ **Tried**: Switching from web to desktop app
   - ❌ **Result**: Same error

3. ✅ **Tried**: Multiple session restarts
   - ❌ **Result**: Same error

4. ✅ **Tried**: Both permission locations (`.claude.json` and `settings.json`)
   - ❌ **Result**: Same error

5. ✅ **Tried**: Manual `hasTrustDialogAccepted: true` flag
   - ❌ **Result**: Same error

6. ✅ **Tried**: Direct API call via curl (as fallback)
   - ❌ **Result**: Network blocked (403 tunnel failed)

## Related Issues

### Known Bug in Claude Code
This appears related to **Issue #4775** in the anthropics/claude-code repository:
- **Title**: "[BUG][Typescript SDK] `canUseTool` callback in the Claude Code SDK is not working"
- **Description**: The callback mechanism expects a persistent input stream to handle tool permission decisions, but the stream closes prematurely before the callback can receive and process the permission response.

### Documentation References
- [Hostinger API MCP Server Documentation](https://support.hostinger.com/en/articles/11079316-hostinger-api-mcp-server)
- [Connect Claude Code to tools via MCP](https://docs.claude.com/en/docs/claude-code/mcp)
- [Claude Code settings](https://docs.claude.com/en/docs/claude-code/settings)

## Impact

**Critical**: Complete inability to use MCP server tools despite correct configuration. This makes MCP servers non-functional for affected users.

## Additional Context

### Configuration Validation
All configuration aspects have been validated:
- ✅ MCP server package installed correctly
- ✅ Server process running (confirmed via ps)
- ✅ Configuration syntax correct (valid JSON)
- ✅ API token format valid
- ✅ Environment variable name correct (API_TOKEN)
- ✅ Permissions configured in both locations
- ✅ Tools appear in function list (server connection working)
- ❌ **Only the permission callback invocation fails**

### Hypothesis
The issue appears to be in Claude Code's permission callback initialization system, not in:
- The MCP server implementation
- The configuration files
- The user's setup process

The MCP server successfully connects and advertises tools, but the permission layer fails when attempting to invoke them.

## Requested Actions

1. **Investigate** why the `canUseTool` callback is not being provided to MCP tool invocations
2. **Fix** the callback initialization for MCP servers in Claude Code
3. **Document** proper MCP server permission configuration if additional steps are needed
4. **Provide workaround** if one exists until bug is fixed

## Test Account Details

If Anthropic engineers need a test case:
- MCP Server: `hostinger-api-mcp` (publicly available on npm)
- All configuration provided above can be replicated
- No special environment required beyond standard Claude Code installation

---

**Report Generated**: 2025-12-10
**Reported By**: Claude Code User (via Claude)
**Session Branch**: `claude/hostinger-tools-access-0139kpG28r9G3u9JukbKAhKg`
