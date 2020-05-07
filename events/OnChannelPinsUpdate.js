class OnChannelPinsUpdate {
  constructor() {
    this.aEventName = "channelPinsUpdate";
  }
  
  mEventName() {
    return this.aEventName;
  }
  
  async mExecute(pDiscordBot, ...args) {
    const channel = args[0];
    const time = args[1];
    await this.mOnReconnecting(pDiscordBot, channel, time);
  }
  
  async mOnChannelPinsUpdate(pDiscordBot, channel, time) {
    console.log(`channelPinsUpdate: ${channel}:${time}`);
  }
}

module.exports = new OnChannelPinsUpdate();

