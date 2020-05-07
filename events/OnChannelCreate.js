class OnChannelCreate {
  constructor() {
    this.aEventName = "channelCreate";
  }
  
  mEventName() {
    return this.aEventName;
  }
  
  async mExecute(pDiscordBot, ...args) {
    const channel = args[0];
    await this.mOnChannelCreate(pDiscordBot, channel);
  }
  
  async  mOnChannelCreate(channel) {
    console.log(`channelCreate: ${channel}`);
  }
}

module.exports = new OnChannelCreate();
