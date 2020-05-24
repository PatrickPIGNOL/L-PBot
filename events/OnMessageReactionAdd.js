const OnEvent = require("../OnEvent.js");
class OnMessageReactionAdd extends OnEvent {
  constructor() {
    super("messageReactionAdd");
  }

  async mExecute(pDiscordBot, ...args) {
    const messageReaction = args[0]; 
    const user = args[1];
    await this.mOnMessageReactionAdd(pDiscordBot, messageReaction, user);
  }

  async mOnMessageReactionAdd(pDiscordBot, messageReaction, user) {
    console.log(`a reaction is added to a message`);
  }
}

module.exports = new OnMessageReactionAdd();

