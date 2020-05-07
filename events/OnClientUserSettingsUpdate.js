class OnReconnecting {
  constructor() {
    this.aEventName = "clientUserSettingsUpdate";
  }
  
  mEventName() {
    return this.aEventName;
  }
  
  async mExecute(pDiscordBot, ...args) {
    const clientUserSettings = args[0];
    await this.mOnClientUserSettingsUpdate(pDiscordBot, clientUserSettings);
  }
  
  async mOnClientUserSettingsUpdate(pDiscordBot, clientUserSettings) {
    console.log(`clientUserSettingsUpdate -> client user's settings update`);
  }
}

module.exports = new OnReconnecting();

