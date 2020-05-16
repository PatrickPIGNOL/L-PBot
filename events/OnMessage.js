class OnMessage {
  constructor() {
    this.aEventName = "message";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const message = args[0];
    await this.mOnMessage(pDiscordBot, message);
  }

  async mOnMessage(pDiscordBot, message) {
    console.log(
      "Nouveau message <" +
        message +
        "> de @" +
        message.author.tag +
        "(" +
        message.author.id +
        ") dans #" +
        message.channel.name +
        ' : "' +
        message.content +
        '";\n'
    );
    if (message.author.bot) {
      console.log("message is a bot message. Returning.");
      return;
    }

    this.mRemerciements(pDiscordBot, message);

    if (!message.content.startsWith(pDiscordBot.aConfig.Prefix)) {
      console.log("message is not a command. Returning.");
      return;
    }
    const vArgs = message.content
      .slice(pDiscordBot.aConfig.Prefix.length)
      .split(/ +/);
    
    const vCommandName = vArgs.shift().toLowerCase();

    const vCommand =
      pDiscordBot.aClient.commands.get(vCommandName) ||
      pDiscordBot.aClient.commands.find(
        vCommandFound =>
          vCommandFound.mAliases() &&
          vCommandFound.mAliases().includes(vCommandName)
      );

    if (vCommand) {
      vCommand.mExecute(pDiscordBot, message, vArgs);
    }
  }

  mRemerciements(pDiscordBot, message) {
    const vArgs = message.content.slice().split(/ +/);
    vArgs.forEach(vArg => {
      if (
        vArg.toLowerCase().startsWith("merci") ||
        vArg.toLowerCase().startsWith("remerci") ||
        vArg.toLowerCase().startsWith("remercie") ||
        vArg.toLowerCase() === "thanks" ||
        vArg.toLowerCase() === "thank" ||
        vArg.toLowerCase() === "thx" ||
        vArg.toLowerCase() === "thank's"
      ) {
        console.log("remerciements détectés");
        message.mentions.members.forEach(vMember => {
          console.log(vMember);
          const vUser = vMember.user;
          console.log(`utilisateur @${vUser.tag} (${vUser.id}) détecté.`);
          if (!vUser.bot) {
            if (message.author !== vUser) {
              var vScore;
              if (message.guild) {
                vScore = pDiscordBot.aSQL.getScore.get(
                  message.guild.id,
                  vUser.id
                );
                if (!vScore) {
                  vScore = {
                    GuildID: message.guild.id,
                    GuildName: message.guild.name,
                    MemberID: vUser.id,
                    MemberTag: vUser.tag,
                    Points: 0,
                    Level: 0
                  };
                }
                vScore.Points++;
                console.log(vScore);
                var vMessage = `${message.author} a donné à ${vUser} +1 point de Reconnaissance soit un total de ${vScore.Points}.\n`;
                const vLevel = Math.floor(Math.sqrt(vScore.Points));
                if (vScore.Level < vLevel) {
                  vScore.Level = vLevel;
                  vMessage += `${vUser} est passé au niveau supérieur soit le niveau ${vScore.Level}.\n:tada::confetti_ball: Félicitations ! :confetti_ball::tada:\n`;
                }
                console.log(vScore);
                const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
                  .setColor(pDiscordBot.aConfig.Good)
                  .setTitle("**Reconnaissance**")
                  .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL()
                  )
                  .setDescription(vMessage)
                  .setThumbnail(vUser.displayAvatarURL());
                message.channel.send(vEmbed);
                pDiscordBot.aSQL.setScore.run(vScore);
              }
            }
          }
        });
      }
    });
  }
}

module.exports = new OnMessage();
