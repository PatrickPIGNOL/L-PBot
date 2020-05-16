const OnEvent = require("../OnEvent.js");
class OnGuildBanAdd extends OnEvent {
  constructor() {
    super("guildBanAdd");
  }

  async mExecute(pDiscordBot, ...args) {
    const guild = args[0];
    const user = args[1];
    await this.mOnGuildBanAdd(pDiscordBot, guild, user);
  }

  async mOnGuildBanAdd(pDiscordBot, guild, user) {
    console.log(`Guild ${guild} has banned user ${user}`);
  }
}

module.exports = new OnGuildBanAdd();
