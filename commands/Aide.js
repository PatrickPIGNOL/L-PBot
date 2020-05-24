const Command = require("../Command.js");
class Aide extends Command {
  constructor() {
    super(
      "aide",
      ["help"],
      [],
      0,
      0,
      "aide",
      "Affiche l'aide du bot et toutes ses commandes.",
      true,
      5
    );
  }
  mExecute(pDiscordBot, message, args) {
    super.mExecute(pDiscordBot, message, args);
    let vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setColor(pDiscordBot.aConfig.Good)
      .setTitle(`"**${pDiscordBot.aClient.user.username}** command panel"`)
      .setAuthor(
        `${pDiscordBot.aClient.user.username}`,
        `${pDiscordBot.aClient.user.displayAvatarURL()}`,
        pDiscordBot.aConfig.URL
      )
      .setDescription("Robot à tout faire...\n\n__**Liste des commandes :**__")
      .setThumbnail(`${pDiscordBot.aClient.user.displayAvatarURL()}`);
    for (const vCommand of pDiscordBot.mClient().commands.array())
    {
      //console.log(vCommand);
      if(vCommand.mHavePermission(pDiscordBot, message))
      {
        let vName = `**${vCommand.mName()}**`
        if(vCommand.mAliases().length)
        {
          vName += ` Aliases : `;
          const vAliases = vCommand.mAliases();
          for(const vAlias of vAliases)
          {         
              vName += `${vAlias} `;
          }
        }
        vEmbed.addField(`${vName}`, `Usage : ${vCommand.mUsage()}\n${vCommand.mDescription()}`, false);
      }
    }
    message.author.send(vEmbed);
    message.delete();
  }
}

module.exports = new Aide();
