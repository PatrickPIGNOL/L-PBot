class OnRoleCreate {
  constructor() {
    this.aEventName = "roleCreate";
  }

  mEventName() {
    return this.aEventName;
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