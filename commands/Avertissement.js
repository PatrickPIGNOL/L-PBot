const Command = require("../Command.js");
class Avertissement extends Command {
  constructor() {
    super(
      "avertissement",
      ["warn"],
      ["ADMINISTRATOR", "KICK_MEMBERS", "BAN_MEMBERS"],
      0,
      0,
      "avertissement @IDPersonne [@IDPersonne[...]] + reason",
      "Met un avertissement à une personne.",
      true,
      0
    );
  }
  async mExecute(pDiscordBot, message, args) {
    super.mExecute(pDiscordBot, message, args);
    
    message.reply();
    message.delete();
  }
}

module.exports = new Avertissement();
