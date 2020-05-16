const Command = require("../Command.js");
class QuiEstCe extends Command {
  constructor()  
  {
    super(
      "quiestce",
      ["quic","cqui","whois","whos", "who"],
      [],
      0,
      1,
      "quiestce @IDUtilisateur",
      "Qui est cette personne ?",
      true,
      5
    );
  }
  mExecute(pDiscordBot, message, args) 
  {
    super.mExecute(pDiscordBot, message, args);
    const vMember = message.mentions.members.first();
    const vUser = vMember.user;    
    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setTitle(vUser.username)
      .setColor(pDiscordBot.aConfig.Log)
      .setThumbnail(vUser.displayAvatarURL())
      .addFields(
        { name: "ID :", value: `${vUser.id}`, inline: true },
        { name: "Name :", value: `${vUser.username}`, inline: true },
        { name: "Tag :", value: `@${vUser.tag}`, inline: true },
        {
          name: "Date de création :",
          value: `${vUser.createdAt}`,
          inline: true
        }
      );
    message.channel.send(vEmbed);
    message.delete();
  }
}

module.exports = new QuiEstCe();
