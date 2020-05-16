const OnEvent = require("../OnEvent.js");
class OnDisconnect extends OnEvent {
  constructor() {
    super("disconnect");
  }
  
  async mExecute(pDiscordBot, ...args) {
    const event = args[0];
    await this.mOnDisconnect(pDiscordBot, event);
  }
  
  async mOnDisconnect(pDiscordBot, event) {
    console.log(
      `The WebSocket has closed and will no longer attempt to reconnect`
    );
  }
}

module.exports = new OnDisconnect();