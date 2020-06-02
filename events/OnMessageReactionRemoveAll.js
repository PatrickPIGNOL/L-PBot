const OnEvent = require("../OnEvent.js");
class OnMessageReactionRemoveAll extends OnEvent {
  constructor() {
    super("messageReactionRemoveAll");
  }

  async mExecute(pDiscordBot, ...args) {
    const message = args[0];
    await this.mOnMessageReactionRemoveAll(pDiscordBot, message);
  }

  async mOnMessageReactionRemoveAll(pDiscordBot, message) {
    console.error(`all reactions are removed from a message`);
  }
}

module.exports = new OnMessageReactionRemoveAll();