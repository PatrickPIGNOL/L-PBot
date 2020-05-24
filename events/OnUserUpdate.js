const OnEvent = require("../OnEvent.js");
class OnUserUpdate extends OnEvent {
  constructor() {
    super("userUpdate");
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