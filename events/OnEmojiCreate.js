const OnEvent = require("../OnEvent.js");
class OnEmojiCreate extends OnEvent {
  constructor() {
    super("emojiCreate");
  }

  async mExecute(pDiscordBot, ...args) {
    const emoji = args[0];
    await this.mOnEmojiCreate(pDiscordBot, emoji);
  }

  async mOnEmojiCreate(pDiscordBot, emoji) {
    console.log(`a custom emoji is created in a guild`);
  }
}

module.exports = new OnEmojiCreate();
