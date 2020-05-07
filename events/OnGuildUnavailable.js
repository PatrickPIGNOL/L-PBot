class OnGuildUnavailable {
  constructor() {
    this.aEventName = "guildUnavailable";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const guild = args[0];
    await this.mOnGuildUnavailable(pDiscordBot, guild);
  }

  async mOnGuildUnavailable(pDiscordBot, guild) {
    console.error(
      `a guild becomes unavailable, likely due to a server outage: ${guild}`
    );
  }
}

module.exports = new OnGuildUnavailable();