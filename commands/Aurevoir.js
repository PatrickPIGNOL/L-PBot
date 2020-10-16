const Command = require("../Command.js");
class Aurevoir extends Command {
  constructor() {
    super(
      "Aurevoir",
      ["bye"],
      [
        "ADMINISTRATOR" // (implicitly has all permissions, and bypasses all channel overwrites)
      ],
      0,
      1,
      0,
      0,
      "Aurevoir @IDPersonne1 [@IDPersonne2 [...]]",
      "Permet de souhaiter le bon vent à une ou plusieurs personne si le système ne l'a pas fait.",
      true,
      0
    );
  }
  mExecute(pDiscordBot, message, args) {
    super
      .mExecute(pDiscordBot, message, args)
      .then(() => {
        if (message.author !== message.guild.owner.user) {
          message.reply(
            "Vous n'avez pas la permission d'executer cette commande"
          );
          message.delete();
          return;
        }
        console.log(message.content);
		console.log(message.mentions.members.size);
		console.log(message.mentions.users.size);
        message.mentions.members.forEach(member => {
          console.log(member);
          const vOnGuildMemberRemove = require("../events/OnGuildMemberRemove.js");
          vOnGuildMemberRemove.mExecute(pDiscordBot, member);
        });
		message.mentions.users.forEach(member => {
          console.log(member);
          const vOnGuildMemberRemove = require("../events/OnGuildMemberRemove.js");
          vOnGuildMemberRemove.mExecute(pDiscordBot, member);
        });
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

module.exports = new Aurevoir();
