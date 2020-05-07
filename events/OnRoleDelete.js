class OnRoleDelete {
  constructor() {
    this.aEventName = "roleDelete";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const role = args[0];
    await this.mOnRoleDelete(pDiscordBot, role);
  }

  async mOnRoleDelete(pDiscordBot, role) {
    console.error(`a guild role ${role} is deleted`);
  }
}

module.exports = new OnRoleDelete();