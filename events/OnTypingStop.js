class OnTypingStop {
  constructor() {
    this.aEventName = "typingStop";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const channel = args[0];
    const user = args[1];
    await this.mOnTypingStop(pDiscordBot, channel, user);
  }

  async mOnTypingStop(pDiscordBot, channel, user) {
    console.log(`<${user.tag}> has stopped typing`);
  }
}

module.exports = new OnTypingStop();