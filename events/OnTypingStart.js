class OnTypingStart {
  constructor() {
    this.aEventName = "typingStart";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const channel = args[0];
    const user = args[1];
    await this.mOnTypingStart(pDiscordBot, channel, user);
  }

  async mOnTypingStart(pDiscordBot, channel, user) {
    console.log(`<${user.tag}> has started typing in channel ${channel.name}`);
  }
}

module.exports = new OnTypingStart();