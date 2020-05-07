class OnEmojiUpdate {
  constructor() {
    this.aEventName = "emojiUpdate";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const oldEmoji = args[0];
    const newEmoji = args[1]
    await this.mOnEmojiUpdate(pDiscordBot, oldEmoji, newEmoji);
  }

  async mOnEmojiUpdate(pDiscordBot, oldEmoji, newEmoji) {
    console.log(`a custom guild emoji is updated`);
  }
}

module.exports = new OnEmojiUpdate();