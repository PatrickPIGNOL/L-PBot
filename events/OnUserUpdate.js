class OnUserUpdate {
  constructor() {
    this.aEventName = "userUpdate";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const oldUser = args[0];
    const newUser = args[1];
    await this.mOnUserUpdate(pDiscordBot, oldUser, newUser);
  }

  async mOnUserUpdate(pDiscordBot, oldUser, newUser) {
    console.log(`user's details (e.g. username) are changed`);
  }
}

module.exports = new OnUserUpdate();