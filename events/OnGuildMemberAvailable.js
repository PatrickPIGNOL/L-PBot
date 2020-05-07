class OnGuildMemberAvailable {
  constructor() {
    this.aEventName = "guildMemberAvailable";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const member = args[0];
    await this.mOnGuildMemberAvailable(pDiscordBot, member);
  }

  async mOnGuildMemberAvailable(pDiscordBot, member) {
    console.log(`member becomes available in a large guild: ${member.tag}`);
  }
}

module.exports = new OnGuildMemberAvailable();