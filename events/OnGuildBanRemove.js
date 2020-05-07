class OnGuildBanRemove {
  constructor() {
    this.aEventName = "guildBanRemove";
  }
  
  mEventName() {
    return this.aEventName;
  }
  
  async mExecute(pDiscordBot, ...args) {
    const guild = args[0];
    const user = args[1];
    await this.mOnGuildBanRemove(pDiscordBot, guild, user);
  }
  
  async mOnGuildBanRemove(pDiscordBot, guild, user) {
    console.log(`Guild ${guild} has banned user ${user}`);
  }
}

module.exports = new OnGuildBanRemove();
