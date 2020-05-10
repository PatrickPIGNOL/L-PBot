class Silence {
  constructor() 
  {
    this.aName = "silence";
    this.aAliases = ['mute'];
    this.aArgs = false;
    this.aMentions = true;
    this.aUsage = "+silence <raison + @IDPersonne(s)>";
    this.aDescription = "Commande d'administration. Impose le silence à une ou plusieurs personnes.";
    this.aGuildOnly = true;
    this.aCooldown = 5;
  }
  mName() {
    return this.aName;
  }
  mAliases()
  {
    return this.aAliases;
  }
  mArgs()
  {
    return this.aArgs;
  }
  mMentions()
  {
    return this.aMentions;
  }
  mUsage()
  {
    return this.aUsage;
  }  
  mDescription()
  {
    return this.aDescription;
  }
  mGuildOnly()
  {
    return this.aGuildOnly();
  }
  mCooldown()
  {
    return this.aCooldown();
  }
  async mExecute(pDiscordBot, message, args) 
  {
    const vMember = message.mentions.members.first();
    if (this.aMentions && !vMember) {
      const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
        .setAuthor(
          pDiscordBot.aClient.user.username,
          pDiscordBot.aClient.user.displayAvatarURL(),
          pDiscordBot.aConfig.URL
        )
        .setTitle("**Erreur**")
        .setColor(pDiscordBot.aConfig.Bad)
        .setThumbnail(vMember.user.displayAvatarURL());
      message.reply("Vous devez mentionner un membre.");
      message.delete();
      return;
    }
    if(this.aArgs && !args.length)
    {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
    if (this.aGuildOnly && message.channel.type !== "text") {
      return message.reply("I can't execute that command inside DMs!");
    }
    const vAuthor = message.author;
    const vLogsEmbed = new this.aDiscord.MessageEmbed()
      .setColor(this.aConfig.Bad)
      .setTitle("**Commande d'administration**")
      .setAuthor(
        this.aClient.user.username,
        this.aClient.user.displayAvatarURL(),
        this.aConfig.URL
      )
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(
        "L'utilisateur " +
          message.author +
          " à utilisé la commande " +
          "```" +
          `${message.content}` +
          "```" +
          ` dans le cannal ${message.channel}`
      );
    const vLogs = message.guild.channels.cache.find(
      vChannelFound => vChannelFound.name === "logs"
    );
    vLogs.send(vLogsEmbed);
    const vSysteme = message.guild.channels.cache.find(
      vChannelFound => vChannelFound.name === "system"
    );
    vSysteme.send(vLogsEmbed);
    if (message.author !== message.guild.owner.user) {
      message.reply("Vous n'avez pas la permission d'executer cette commande");
      message.delete();
      return;
    }
    await message.mentions.members.forEach(async vMember => {
      await message.guild.channels.cache.forEach(async (channel, id) => {
        if (!(await channel.permissionOverwrites.get(vMember.user.id))) {
          await channel
            .createOverwrite(vMember.user, {
              SEND_MESSAGES: false,
              SEND_TTS_MESSAGES: false,
              ATTACH_FILES: false,
              MENTION_EVERYONE: false,
              USE_EXTERNAL_EMOJIS: false,
              //CONNECT: false,
              SPEAK: false,
              USE_VAD: false
            })
            .then(
              async channel =>
                await console.log(
                  channel.name +
                    " : " +
                    (await channel.permissionOverwrites.get(vMember.user.id))
                )
            )
            .catch(async e => {
              await console.error(e.stack);
              return;
            });
        }
      });
      var vArgs = message.content.split(" ");
      vArgs.shift();
      const vEmbed = new this.aDiscord.MessageEmbed()
        .setColor(this.aConfig.Bad)
        .setTitle("**⚡🔨SILENCE🔨⚡**")
        .setAuthor(vAuthor.username, vAuthor.displayAvatarURL())
        .setImage(
          "https://cdn.discordapp.com/attachments/690978875446132796/702004987269480588/tumblr_p5sgzzfA881sc0ffqo3_540.gif"
        )
        .setThumbnail(vMember.user.displayAvatarURL())
        .setDescription(
          `${vAuthor}` +
            " à rendu muet " +
            `${vMember.user}` +
            ' pour la raison "' +
            vArgs.join(" ") +
            '".'
        );
      vMember.send(vEmbed);
      message.channel.send(vEmbed);
    });
    message.delete();
  }
}

module.exports = new Silence();