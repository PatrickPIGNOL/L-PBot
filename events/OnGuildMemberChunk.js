class OnGuildMembersChunk {
  constructor() {
    this.aEventName = "guildMemberChunk";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const members = args[0];
    const guild = args[1];
    await this.mOnGuildMembersChunk(pDiscordBot, members, guild);
  }

  async mOnGuildMembersChunk(pDiscordBot, members, guild) {
    console.error(`a chunk of guild members is received`);
  }
}

module.exports = new OnGuildMembersChunk();