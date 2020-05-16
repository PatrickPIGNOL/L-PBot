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
class Command {
  constructor(
    pName,
    pAliases,
    pPermissions,
    pArgs,
    pMentions,
    pUsage,
    pDescription,
    pGuildOnly,
    pCooldown
  ) {
    this.aName = pName;
    this.aAliases = pAliases;
    this.aPermissions = pPermissions;
    this.aArgs = pArgs;
    this.aMentions = pMentions;
    this.aUsage = pUsage;
    this.aDescription = pDescription;
    this.aGuildOnly = pGuildOnly;
    this.aCooldown = pCooldown;
  }
  mName() {
    return this.aName;
  }
  mAliases() {
    return this.aAliases;
  }
  mPermissions() {
    return this.aPermissions;
  }
  mHavePermission(pDiscordBot, pGuild, pAuthor) {
    let vHavePermission = true;
    if (0 < this.aPermission.length) {
      vHavePermission = false;
      const vMemberAuthor = pGuild.members.cache.find(
        member => (member.user.id = pAuthor.id)
      );
      if (vMemberAuthor) {
        this.aPermission.forEach(vPermission => {
          if (vMemberAuthor.hasPermission(vPermission)) {
            return true;
          }
        });
      } else {
        console.log("Erreur pas d'auteur pour le message");
        return vHavePermission;
      }
    }
    return vHavePermission;
  }
  mArgs() {
    return this.aArgs;
  }
  mMentions() {
    return this.aMentions;
  }
  mUsage() {
    return this.aUsage;
  }
  mDescription() {
    return this.aDescription;
  }
  mGuildOnly() {
    return this.aGuildOnly();
  }
  mCooldown() {
    return this.aCooldown();
  }
  async mExecute(pDiscordBot, message, args) {
    if (this.aPermissions.length > 0) {
      const vMember = message.guild.members.cache.find(
        vMember => vMember.user.id === message.author.id
      );
      let vAuthorHavePermission = false;
      this.aPermissions.forEach(vPermission => {
        if (vMember.hasPermission(vPermission)) {
          vAuthorHavePermission = true;
        }
      });
      if (!vAuthorHavePermission) {
        const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
          .setAuthor(
            pDiscordBot.aClient.user.username,
            pDiscordBot.aClient.user.displayAvatarURL(),
            pDiscordBot.aConfig.URL
          )
          .setTitle("**Erreur**")
          .setColor(pDiscordBot.aConfig.Bad)
          .setThumbnail(message.author.displayAvatarURL())
          .setDescription(
            "Vous n'avez pas la permission d'executer cette commande."
          );
        message.reply(vEmbed);
        message.delete();
        return;
      }
    }
    if (this.aMentions > message.mentions.members.length) {
      const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
        .setAuthor(
          pDiscordBot.aClient.user.username,
          pDiscordBot.aClient.user.displayAvatarURL(),
          pDiscordBot.aConfig.URL
        )
        .setTitle("**Erreur**")
        .setColor(pDiscordBot.aConfig.Bad)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(
          `Vous devez mentionner au moins ${this.aMentions} membre(s).`
        );
      message.reply(vEmbed);
      message.delete();
      return;
    }
    if (this.aArgs > 0 && args.length < this.aArgs) {
      const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
        .setAuthor(
          pDiscordBot.aClient.user.username,
          pDiscordBot.aClient.user.displayAvatarURL(),
          pDiscordBot.aConfig.URL
        )
        .setTitle("**Erreur**")
        .setColor(pDiscordBot.aConfig.Bad)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(
          `Vous devez fournir au moins ${this.aArgs} paramètres !`
        );
      message.reply(vEmbed);
      message.delete();
      message.reply(vEmbed);
      return;
    }
    if (this.aGuildOnly && message.channel.type !== "text") {
      const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
        .setAuthor(
          pDiscordBot.aClient.user.username,
          pDiscordBot.aClient.user.displayAvatarURL(),
          pDiscordBot.aConfig.URL
        )
        .setTitle("**Erreur**")
        .setColor(pDiscordBot.aConfig.Bad)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(
          "Je ne peux pas executer cette commande dans un cannal privé !"
        );
      message.reply(vEmbed);
      message.delete();
      message.reply(vEmbed);
      return message.reply();
    }
  }
}

module.exports = Command;
