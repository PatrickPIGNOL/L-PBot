class OnGuildUpdate {
  constructor() {
    this.aEventName = "guildUpdate";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const oldGuild = args[0];
    const newGuild = args[1];
    await this.mOnGuildUpdate(pDiscordBot, oldGuild, newGuild);
  }

  async mOnGuildUpdate(pDiscordBot, oldGuild, newGuild) {
    console.error(`a guild is updated`);
  }
}

module.exports = new OnGuildUpdate();