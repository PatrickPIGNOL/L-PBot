const OnEvent = require("../OnEvent.js");
class OnReconnecting extends OnEvent {
  constructor() {
    super("reconnecting");
  }
  
  async mExecute(pDiscordBot, ...args) {
    await this.mOnReconnecting(pDiscordBot);
  }
  
  async mOnReconnecting(pDiscordBot) {
    console.log(`client tries to reconnect to the WebSocket`);
  }
}

module.exports = new OnReconnecting();

