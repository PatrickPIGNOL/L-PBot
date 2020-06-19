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
        if (!message.mentions.members.first()) {
          message.reply("Vous devez citer au moins une personne");
          message.delete();
          return;
        }

        message.mentions.members.forEach(member => {
          const vOnGuildMemberRemove = require("../events/OnGuildMemberRemove.js");
          console.log(member);
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
