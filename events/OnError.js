class OnError {
  constructor() {
    this.aEventName = "error";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const error = args[0];
    await this.mOnError(pDiscordBot, error);
  }

  async mOnError(pDiscordBot, error) {
    console.error(
      `client's WebSocket encountered a connection error: ${error}`
    );
  }
}

module.exports = new OnError();