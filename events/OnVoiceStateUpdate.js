class OnVoiceStateUpdate {
  constructor() {
    this.aEventName = "voiceStateUpdate";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const oldMember = args[0];
    const newMember = args[1];
    await this.mOnVoiceStateUpdate(pDiscordBot, oldMember, newMember);
  }

  async mOnVoiceStateUpdate(pDiscordBot, oldMember, newMember) {
    console.log(`a user changes voice state`);
  }
}

module.exports = new OnVoiceStateUpdate();