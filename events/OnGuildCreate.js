class OnGuildCreate {
  constructor() {
    this.aEventName = "guildCreate";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const guild = args[0];
    await this.mOnGuildCreate(pDiscordBot, guild);
  }

  async mOnGuildCreate(pDiscordBot, guild) {
    console.log(`the client joins a guild`);
  }
}

module.exports = new OnGuildCreate();