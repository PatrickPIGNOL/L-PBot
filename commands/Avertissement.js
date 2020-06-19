const Command = require("../Command.js");
class Avertissement extends Command {
  constructor() {
    super(
      "avertissement",
      ["warn"],
      ["ADMINISTRATOR", "KICK_MEMBERS", "BAN_MEMBERS"],
      0,
      1,
      0,
      0,
      "avertissement @IDPersonne [@IDPersonne[...]] + reason",
      "Met un avertissement à une personne.",
      true,
      0
    );
  }
  async mExecute(pDiscordBot, message, args) {
    super.mExecute(pDiscordBot, message, args).then(() => {
        message.reply("not implemented");
        message.delete();
      })
      .catch(e => {
      console.error(e);
      message.reply(e);
      message.delete();
      return;
    });
  }
}

module.exports = new Avertissement();
