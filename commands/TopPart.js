const Command = require("../Command.js");
class TopPart extends Command {
  constructor() 
  {
    super(
      "toppart",
      [],
      [
        "ADMINISTRATOR", // (implicitly has all permissions, and bypasses all channel overwrites) 
      ],
      0,
      0,
      "toppart",
      "Top 10 classement des points de participation.",
      true,
      0
    );
  }
  mExecute(pDiscordBot, message, args) 
  {
    super.mExecute(pDiscordBot, message, args);
    console.log(message.guild.id);
    const top10 = pDiscordBot.mSQL()
      .prepare(
        "SELECT * FROM participations WHERE GuildID = ? ORDER BY points DESC, MemberTag ASC LIMIT 10;"
      )
      .all(message.guild.id)
    ;      
    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setColor(pDiscordBot.aConfig.Good)
      .setTitle("Top 10 des points de participation")
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setDescription(
        `Retrouvez [le classement complet de nos membres](${pDiscordBot.aConfig.Participation}) via internet.`
      );

    console.log("message embed created");
    let vRank = 1;
    top10.forEach(vData => {
      const vUserID = vData.MemberID;
      const vMember = message.guild.members.cache.find(
        vSearchMember => vSearchMember.user.id == vUserID
      );
      if (vMember) {
        const vUser = vMember.user;
        console.log(vRank + ":" + vUser.tag + ":" + vUser.id);

        console.log("user " + vUser.tag + " fetched");
        vEmbed.addField(
          `#${vRank} - ${vData.Points} points (Niv. ${vData.Level})`,
          `@${vUser.tag}`
        );
        console.log("Field added !");
        vRank++;
      }
      vData.GuildName = message.guild.name;
    });
    console.log("loop Finished !");
    message.channel.send(vEmbed);
    message.delete();
  }
}

module.exports = new TopPart();