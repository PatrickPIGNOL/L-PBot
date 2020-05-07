class OnWarn {
  constructor() {
    this.aEventName = "warn";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const info = args[0];
    await this.mOnWarn(pDiscordBot, info);
  }

  async mOnWarn(pDiscordBot, info) {
    console.log(`warn: ${info}`);
  }
}

module.exports = new OnWarn();