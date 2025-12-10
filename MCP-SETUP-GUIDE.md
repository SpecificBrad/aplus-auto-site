# Hostinger MCP Server Setup Guide

## 🎯 Goal
Configure Claude Code to use Hostinger MCP server for direct deployment capabilities.

---

## ✅ Step 1: Create Hostinger API Token

1. **Login to Hostinger:**
   - Go to: https://hpanel.hostinger.com/profile/api

2. **Create New API Token:**
   - Click "Create API Token"
   - Give it a descriptive name (e.g., "Claude Code MCP")
   - Copy the token immediately (you won't see it again!)
   - Store it securely

3. **Save Token:**
   - Keep it handy for Step 2

---

## ✅ Step 2: Configure Claude Code MCP

### **Option A: Using Claude Code Settings (Recommended)**

1. **Open Claude Code Settings**
   - Click on settings/preferences
   - Look for "MCP Servers" or "Model Context Protocol" section

2. **Add Hostinger MCP Server**
   ```json
   {
     "mcpServers": {
       "hostinger": {
         "command": "hostinger-api-mcp",
         "args": ["--stdio"],
         "env": {
           "API_TOKEN": "YOUR_ACTUAL_TOKEN_HERE"
         }
       }
     }
   }
   ```

3. **Replace `YOUR_ACTUAL_TOKEN_HERE`** with your actual API token from Step 1

### **Option B: Manual Configuration File**

If Claude Code uses a configuration file:

1. **Find MCP Config Location:**
   - Linux/Mac: `~/.config/claude-code/mcp_settings.json`
   - Windows: `%APPDATA%\Claude Code\mcp_settings.json`
   - Or wherever Claude Code stores MCP configs

2. **Edit/Create the file:**
   ```json
   {
     "mcpServers": {
       "hostinger": {
         "command": "hostinger-api-mcp",
         "args": ["--stdio"],
         "env": {
           "API_TOKEN": "paste_your_token_here"
         }
       }
     }
   }
   ```

3. **Save the file**

---

## ✅ Step 3: Verify MCP Server Installation

The MCP server is already installed globally:
```bash
which hostinger-api-mcp
# Should show: /opt/node22/bin/hostinger-api-mcp
```

If not installed, run:
```bash
npm install -g hostinger-api-mcp
```

---

## ✅ Step 4: Restart Claude Code

1. **Completely close Claude Code**
2. **Reopen Claude Code**
3. **Start a new conversation/session**

The MCP server will initialize on startup.

---

## ✅ Step 5: Verify MCP Tools Available

In your new Claude Code session, ask:
> "What Hostinger tools do you have access to?"

You should see tools like:
- `hostinger_deploy_static_website`
- `hostinger_list_websites`
- `hostinger_get_deployment_status`
- `hostinger_create_dns_record`
- And more...

---

## 🎯 What You Can Do With MCP

### **Static Website Deployment**
Deploy your HTML/CSS/JS website directly:
```
"Deploy the website in hostinger-deploy/ folder to my Hostinger account"
```

### **Check Deployment Status**
Monitor ongoing deployments:
```
"Check the status of my website deployment"
```

### **Manage DNS**
Configure domain DNS records:
```
"Add an A record pointing to 1.2.3.4"
```

### **List Websites**
See all your hosted sites:
```
"List all my Hostinger websites"
```

---

## 🔒 Security Best Practices

**Protect Your API Token:**
- ✅ Store in secure config file only
- ✅ Never commit to version control
- ✅ Use environment variables when possible
- ✅ Rotate tokens periodically
- ❌ Don't share in chat or screenshots
- ❌ Don't hardcode in scripts

**Add to .gitignore:**
```bash
echo "mcp_settings.json" >> .gitignore
echo ".env" >> .gitignore
```

---

## 🐛 Troubleshooting

### **MCP Tools Not Showing Up**

**Check:**
1. Claude Code was fully restarted
2. Configuration syntax is correct (valid JSON)
3. API token is valid (not expired/deleted)
4. MCP server is installed: `hostinger-api-mcp --help`

**Fix:**
- Restart Claude Code again
- Check console for MCP initialization errors
- Verify token in Hostinger dashboard

### **"API Token Invalid" Error**

**Causes:**
- Token was deleted
- Token expired
- Wrong token pasted

**Fix:**
- Create new token in Hostinger
- Update configuration
- Restart Claude Code

### **"Command Not Found" Error**

**Cause:**
- MCP server not installed globally

**Fix:**
```bash
npm install -g hostinger-api-mcp
```

Then restart Claude Code.

---

## 📊 Expected Configuration Result

After successful setup:

```
✅ MCP server installed
✅ API token configured
✅ Claude Code restarted
✅ New session started
✅ Hostinger tools available
✅ Ready to deploy!
```

---

## 🚀 Next Steps After Setup

Once MCP is working:

1. **Deploy the website:**
   ```
   "Deploy the A+ Auto Centre website to Hostinger"
   ```

2. **Verify deployment:**
   ```
   "Check if the deployment succeeded"
   ```

3. **Test the live site:**
   Visit your domain to confirm

---

## 📝 Quick Reference

**MCP Server Command:**
```bash
hostinger-api-mcp --stdio
```

**Configuration Template:**
```json
{
  "mcpServers": {
    "hostinger": {
      "command": "hostinger-api-mcp",
      "args": ["--stdio"],
      "env": {
        "API_TOKEN": "your_token_here"
      }
    }
  }
}
```

**Test MCP Server Manually:**
```bash
API_TOKEN="your_token" hostinger-api-mcp --stdio
```

---

## ⏱️ Time Estimate

- **Step 1** (Create token): 2 minutes
- **Step 2** (Configure): 3 minutes
- **Step 3** (Verify install): 1 minute
- **Step 4** (Restart): 1 minute
- **Step 5** (Test): 2 minutes

**Total:** ~10 minutes

---

## 🎯 Success Criteria

You'll know it's working when:
1. New Claude Code session starts without errors
2. Asking about Hostinger tools shows available commands
3. You can list your Hostinger websites
4. Deployment commands work

---

## 💡 Tips

**For Faster Testing:**
- Keep Hostinger dashboard open in another tab
- Have your domain/site info ready
- Test with a simple command first ("list websites")
- Then try deployment

**For Deployment:**
- Make sure you know which Hostinger account/website
- Have the deployment folder ready (already created: `hostinger-deploy/`)
- Check your Hostinger plan supports the features

---

## 📚 Additional Resources

- **Hostinger MCP GitHub:** https://github.com/hostinger/api-mcp-server
- **Hostinger API Docs:** https://developers.hostinger.com/
- **MCP Protocol Docs:** https://modelcontextprotocol.io/

---

## ✅ Checklist

Before starting new session:
- [ ] API token created
- [ ] Configuration file updated with token
- [ ] Claude Code fully restarted
- [ ] Ready to test MCP tools

After new session starts:
- [ ] Ask Claude what Hostinger tools are available
- [ ] Verify tools show up
- [ ] Test with simple command
- [ ] Proceed with deployment

---

## 🎉 Once Working

You'll be able to:
- Deploy websites with a simple command
- Update sites instantly
- Manage DNS without leaving Claude Code
- Monitor deployments in real-time
- Much faster than manual FTP uploads!

---

Good luck with the setup! Once you've configured and restarted Claude Code, we can deploy the website directly through MCP commands.
