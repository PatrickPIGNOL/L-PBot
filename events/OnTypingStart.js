const OnEvent = require("../OnEvent.js");
class OnTypingStart extends OnEvent {
  constructor() {
    super("typingStart");
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