const OnEvent = require("../OnEvent.js");
class OnTypingStop extends OnEvent {
  constructor() {
    super("typingStop");
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