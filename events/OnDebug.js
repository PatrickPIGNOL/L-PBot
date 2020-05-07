class OnDebug {
  constructor() {
    this.aEventName = "debug";
  }
  
  mEventName() {
    return this.aEventName;
  }
  
  async mExecute(pDiscordBot, ...args) {
    const info = args[0];
    //await this.mOnDebug(pDiscordBot, info);
  }  
  
  async mOnDebug(pDiscordBot, info) {
    console.log(`debug -> ${info}`);
  }
}

module.exports = new OnDebug();

