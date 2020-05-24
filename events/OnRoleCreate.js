const OnEvent = require("../OnEvent.js");
class OnRoleCreate extends OnEvent {
  constructor() {
    super("roleCreate");
  }

  async mExecute(pDiscordBot, ...args) {
    const role = args[0];
    await this.mOnRoleCreate(pDiscordBot, role);
  }

  async mOnRoleCreate(pDiscordBot, role) {
    console.error(`a guild role ${role}`);
  }
}

module.exports = new OnRoleCreate();