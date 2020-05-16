const OnEvent = require("../OnEvent.js");
class OnEmojiDelete extends OnEvent {
  constructor() {
    super("emojiDelete");
  }

  async mExecute(pDiscordBot, ...args) {
    const emoji = args[0];
    await this.mOnEmojiDelete(pDiscordBot, emoji);
  }

  async   mOnEmojiDelete(pDiscordBot, emoji) {
    console.log(`a custom guild emoji is deleted`);
  }
}

module.exports = new OnEmojiDelete();