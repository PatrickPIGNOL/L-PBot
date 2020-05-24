const OnEvent = require("../OnEvent.js");
class OnRoleUpdate extends OnEvent {
  constructor() {
    super("roleUpdate");
  }

  async mExecute(pDiscordBot, ...args) {
    const oldRole = args[0];
    const newRole = args[1];
    await this.mOnRoleUpdate(pDiscordBot, oldRole, newRole);
  }

  async mOnRoleUpdate(pDiscordBot, oldRole, newRole) {
    console.error(`a guild role ${oldRole}, ${newRole} is updated`);
  }
}

module.exports = new OnRoleUpdate();