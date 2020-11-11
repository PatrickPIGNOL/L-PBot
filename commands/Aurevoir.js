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
      0,
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
      .then(() => 
      {
        
        if(message.mentions.members.size > 0)
        {
            message.mentions.members.forEach(member => 
            {
                const vOnGuildMemberRemove = require("../events/OnGuildMemberRemove.js");
                console.log(member);
                vOnGuildMemberRemove.mExecute(pDiscordBot, member);
            });
        }
        if(message.mentions.users.size > 0)
        {
            message.mentions.users.forEach(user => 
            {
                const vOnGuildMemberRemove = require("../events/OnGuildMemberRemove.js");
                console.log(user);
                vOnGuildMemberRemove.mExecute(pDiscordBot, user);
            });
        }
        args.forEach((pUser)=>{
            vUser = pDiscordBot.mClient().users.resolve(pUser);
            if(vUser)
            {
                const vOnGuildMemberRemove = require("../events/OnGuildMemberRemove.js");
                console.log(vUser);
                vOnGuildMemberRemove.mExecute(pDiscordBot, vUser);
            }
        })
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
