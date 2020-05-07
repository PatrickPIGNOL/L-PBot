class OnReconnecting {
  constructor() {
    this.aEventName = "reconnecting";
  }
  
  mEventName() {
    return this.aEventName;
  }
  
  async mExecute(pDiscordBot, ...args) {
    await this.mOnReconnecting(pDiscordBot);
  }
  
  async mOnReconnecting(pDiscordBot) {
    console.log(`client tries to reconnect to the WebSocket`);
  }
}

module.exports = new OnReconnecting();

