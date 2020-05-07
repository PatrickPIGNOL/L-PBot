class OnMessageReactionRemoveAll {
  constructor() {
    this.aEventName = "messageReactionRemoveAll";
  }

  mEventName() {
    return this.aEventName;
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