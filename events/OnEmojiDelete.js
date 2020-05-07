class OnEmojiDelete {
  constructor() {
    this.aEventName = "emojiDelete";
  }

  mEventName() {
    return this.aEventName;
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