class Citer {
  constructor() 
  {
    this.aName = "citer";
    this.aAliases = ['say', 'says', 'citation'];
    this.aPermissions = [
      /*
      "ADMINISTRATOR", // (implicitly has all permissions, and bypasses all channel overwrites)
      "CREATE_INSTANT_INVITE", // (create invitations to the guild)
      "KICK_MEMBERS",
      "BAN_MEMBERS",
      "MANAGE_CHANNELS",// (edit and reorder channels)
      "MANAGE_GUILD",// (edit the guild information, region, etc.)
      "ADD_REACTIONS",// (add new reactions to messages)
      "VIEW_AUDIT_LOG",
      "PRIORITY_SPEAKER",
      "STREAM",
      "VIEW_CHANNEL",
      "SEND_MESSAGES",
      "SEND_TTS_MESSAGES",
      "MANAGE_MESSAGES",// (delete messages and reactions)
      "EMBED_LINKS",// (links posted will have a preview embedded)
      "ATTACH_FILES",
      "READ_MESSAGE_HISTORY",// (view messages that were posted prior to opening Discord)
      "MENTION_EVERYONE",
      "USE_EXTERNAL_EMOJIS",// (use emojis from different guilds)
      "VIEW_GUILD_INSIGHTS",
      "CONNECT",// (connect to a voice channel)
      "SPEAK",// (speak in a voice channel)
      "MUTE_MEMBERS",// (mute members across all voice channels)
      "DEAFEN_MEMBERS",// (deafen members across all voice channels)
      "MOVE_MEMBERS",// (move members between voice channels)
      "USE_VAD",// (use voice activity detection)
      "CHANGE_NICKNAME",
      "MANAGE_NICKNAMES",// (change other members' nicknames)
      "MANAGE_ROLES",
      "MANAGE_WEBHOOKS",
      "MANAGE_EMOJIS"
      */
    ];
    this.aArgs = 2;
    this.aMentions = 1;
    this.aUsage = "+citer @IDPerson <citation>";
    this.aDescription = "";
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
  mPermissions()
  {
    return this.aPermissions;
  }
  mHavePermission(pDiscordBot, pGuild, pAuthor)
  {
    var vHavePermission = true;
    if(0 < this.aPermission.length)
    {
      const vAuthor = pGuild.members.cache.find(member =>
        member.user.id = pAuthor.id
      );  
      if(vAuthor)
      {
        vHavePermission = false;
        this.aPermission.forEach(vPermission => {
          if(vAuthor.hasPermission(vPermission))
          {
            vHavePermission = true;
          }  
        });
      }
      else
      {
        console.log("Erreur pas d'auteur pour le message");
        
        return;
      }
    }
    return vHavePermission;
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
    if (this.aGuildOnly && message.channel.type !== "text") {
      message.reply("I can't execute that command inside DMs!");
      message.delete();
      return;
    }
    
    if (this.aMentions && message.mentions.members.size < this.aMentions) {
      const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
        .setAuthor(
          pDiscordBot.aClient.user.username,
          pDiscordBot.aClient.user.displayAvatarURL(),
          pDiscordBot.aConfig.URL
        )
        .setTitle("**Erreur**")
        .setColor(pDiscordBot.aConfig.Bad)
        .setThumbnail(message.author.displayAvatarURL());
      message.reply("Vous devez mentionner un membre.");
      return;
    }
    if(this.aArgs && args.length < this.aArgs)
    {
      const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
        .setAuthor(
          pDiscordBot.aClient.user.username,
          pDiscordBot.aClient.user.displayAvatarURL(),
          pDiscordBot.aConfig.URL
        )
        .setTitle("**Erreur**")
        .setColor(pDiscordBot.aConfig.Bad)
        .setThumbnail(message.author.displayAvatarURL());
      message.reply("Vous devez fournir le texte à citer !`");
      return message.channel.send();
    }
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