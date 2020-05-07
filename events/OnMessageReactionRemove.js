class OnMessageReactionRemove {
  constructor() {
    this.aEventName = "messageReactionRemove";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const messageReaction = args[0];
    const user = args[1];
    await this.mOnMessageReactionRemove(pDiscordBot, messageReaction, user);
  }

  async mOnMessageReactionRemove(pDiscordBot, messageReaction, user) {
    console.log(`a reaction is removed from a message`);
  }

}

module.exports = new OnMessageReactionRemove();