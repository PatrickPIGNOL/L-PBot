const Command = require("../Command.js");
class Citer extends Command{
  constructor() 
  {
    super(
      "citer",
      ["say", "says", "citation"],
      [],
      2,
      1,
      "citer @IDPerson <citation>",
      "Cite une personne dans un embed...",
      true,
      0
    );
  }
  async mExecute(pDiscordBot, message, args) 
  {
    super.mExecute(pDiscordBot, message, args) 
    const vEmitter = message.mentions.members.first();
    args.shift();
    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setTitle("Citation")
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL()        
      )
      .setColor(pDiscordBot.aConfig.Log)
      .setDescription(`${vEmitter.user}` + " à dit : *\"" + args.join(' ') + "\"*")
      .setThumbnail(vEmitter.user.displayAvatarURL());
    message.channel.send(vEmbed);
    message.delete();
  }
}

module.exports = new Citer();