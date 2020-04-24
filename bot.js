class DiscordBot {
  constructor() {
    this.aFS = require("fs");
    this.aDiscord = require("discord.js");
    this.aClient = new this.aDiscord.Client();
    this.aClient.commands = new this.aDiscord.Collection();
    const vCommandFiles = this.aFS
      .readdirSync("./commands")
      .filter(vFileFound => vFileFound.endsWith(".js"));
    for (const vFile of vCommandFiles) {
      const vCommand = require(`./commands/${vFile}`);
      // set a new item in the Collection
      // with the key as the command name and the value as the exported module
      this.aClient.commands.set(vCommand.mName(), vCommand);
    }
    this.aConfig = require("./config.json");
    this.aConfig.token = process.env.SECRET;
    this.aSQLite = require("better-sqlite3");
    this.aSQL = new this.aSQLite("./scores.sqlite");
    this.aSQLite = new this.aSQLite("./discordbot.sqlite");
    this.aMS = require("ms");
  }
  mLogin() {
    this.aClient.login(this.aConfig.token);
    this.aClient.clearImmediate();
    this.aClient.removeAllListeners();

    const vEventsFiles = this.aFS
      .readdirSync("./events")
      .filter(vFileFound => vFileFound.endsWith(".js"));
    for (const vFile of vEventsFiles) {
      const vEvent = require(`./events/${vFile}`);
      // set a new item in the Collection
      // with the key as the command name and the value as the exported module
      //this.aClient.commands.set(vEvent.mName(), vEvent);
      this.aClient.on(vEvent.mEventName(), (...args)=>{vEvent.mExecute(this, ...args);});
    }
    /*
    this.aClient.on("ready", () => {
      this.mOnReady();
    });

    this.aClient.on("message", async message => {
      this.mOnMessage(message);
    });

    this.aClient.on("guildMemberUpdate", (oldMember, newMember) => {
      this.mOnGuildMemberUpdate(oldMember, newMember);
    });

    this.aClient.on("guildMemberAdd", member => {
      this.mOnGuildMemberAdd(member);
    });

    this.aClient.on("guildMemberRemove", member => {
      this.mOnGuildMemberRemove(member);
    });

    this.aClient.on("presenceUpdate", (oldMember, newMember) => {
      this.mOnPresenceUpdate(oldMember, newMember);
    });

    this.aClient.on("guildBanAdd", (guild, user) => {
      this.mOnGuildBanAdd(guild, user);
    });

    this.aClient.on("guildBanRemove", (guild, user) => {
      this.mOnGuildBanRemove(guild, user);
    });

    this.aClient.on("reconnecting", () => {
      this.mOnReconnecting();
    });

    this.aClient.on("channelCreate", channel => {
      this.mOnChannelCreate(channel);
    });

    this.aClient.on("channelDelete", channel => {
      this.mOnChannelDelete(channel);
    });

    this.aClient.on("channelPinsUpdate", (channel, time) => {
      this.mOnChannelPinsUpdate(channel, time);
    });

    this.aClient.on("channelUpdate", (oldChannel, newChannel) => {
      this.mOnChannelUpdate(oldChannel, newChannel);
    });

    this.aClient.on(
      "clientUserGuildSettingsUpdate",
      clientUserGuildSettings => {
        this.mOnClientUserGuildSettingsUpdate(clientUserGuildSettings);
      }
    );

    this.aClient.on("clientUserSettingsUpdate", clientUserSettings => {
      this.mOnClientUserSettingsUpdate(clientUserSettings);
    });

    this.aClient.on("debug", info => {
      this.mOnDebug(info);
    });

    this.aClient.on("disconnect", event => {
      this.mOnDisconnect(event);
    });

    this.aClient.on("emojiCreate", emoji => {
      this.mOnEmojiCreate(emoji);
    });

    this.aClient.on("emojiDelete", emoji => {
      this.mOnEmojiDelete(emoji);
    });

    this.aClient.on("emojiUpdate", (oldEmoji, newEmoji) => {
      this.mOnEmojiUpdate(oldEmoji, newEmoji);
    });

    this.aClient.on("error", error => {
      this.mOnError(error);
    });

    this.aClient.on("guildCreate", guild => {
      this.mOnGuildCreate(guild);
    });

    this.aClient.on("guildDelete", guild => {
      this.mOnGuildDelete(guild);
    });

    this.aClient.on("guildMemberAvailable", member => {
      this.mOnGuildMemberAvailable(member);
    });

    this.aClient.on("guildMemberSpeaking", (member, speaking) => {
      this.mOnGuildMemberSpeaking(member, speaking);
    });

    this.aClient.on("guildMembersChunk", (members, guild) => {
      this.mOnGuildMembersChunk(members, guild);
    });

    this.aClient.on("guildUnavailable", guild => {
      this.mOnGuildUnavailable(guild);
    });

    this.aClient.on("guildUpdate", (oldGuild, newGuild) => {
      this.mOnGuildUpdate(oldGuild, newGuild);
    });

    this.aClient.on("messageDeleteBulk", messages => {
      this.mOnMessageDeleteBulk(messages);
    });

    this.aClient.on("messageDelete", message => {
      this.mOnMessageDelete(message);
    });

    this.aClient.on("messageReactionAdd", (messageReaction, user) => {
      this.mOnMessageReactionAdd(messageReaction, user);
    });

    this.aClient.on("messageReactionRemove", (messageReaction, user) => {
      this.mOnMessageReactionRemove(messageReaction, user);
    });
    this.aClient.on("messageReactionRemoveAll", message => {
      this.mOnMessageReactionRemoveAll(message);
    });

    this.aClient.on("messageUpdate", (oldMessage, newMessage) => {
      this.mOnMessageUpdate(oldMessage, newMessage);
    });

    this.aClient.on("resume", replayed => {
      this.mOnResume(replayed);
    });

    this.aClient.on("roleCreate", role => {
      this.mOnRoleCreate(role);
    });

    this.aClient.on("roleDelete", role => {
      this.mOnRoleDelete(role);
    });

    this.aClient.on("roleUpdate", (oldRole, newRole) => {
      this.mOnRoleUpdate(oldRole, newRole);
    });

    this.aClient.on("typingStart", (channel, user) => {
      this.mOnTypingStart(channel, user);
    });

    this.aClient.on("typingStop", (channel, user) => {
      this.mOnTypingStop(channel, user);
    });

    this.aClient.on("userNoteUpdate", (user, oldNote, newNote) => {
      this.mOnUserNoteUpdate(user, oldNote, newNote);
    });

    this.aClient.on("voiceStateUpdate", (oldMember, newMember) => {
      this.mOnVoiceStateUpdate(oldMember, newMember);
    });

    this.aClient.on("warn", info => {
      this.mOnWarn(info);
    });
    */
  }
  mDiscord() {
    return this.aDiscord();
  }
  mClient() {
    return this.aClient;
  }
  mConfig() {
    return this.aConfig;
  }
  mSQL() {
    return this.aSQL;
  }
  
  mClear(message) {
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
    const vArgs = message.content.slice(this.aConfig.Prefix.length).split(/ +/);
    console.log("number : " + vArgs[1]);
    if (!vArgs[1] || isNaN(vArgs[1])) {
      message.reply("Vous devez spécifier un nobmre valide");
      message.delete();
      return;
    }
    const vMax = vArgs[1];
    const vChannel = message.channel;
    var vCount = 0;
    message
      .delete()
      .then(() => {
        const vList = vChannel.messages
          .fetch({ limit: vMax })
          .then(vMessages => {
            vMessages
              .forEach((vMessage, vIndex) => {
                try {
                  vMessage
                    .delete()
                    .then(vDeletedMessage => {
                      console.error(
                        "deleting message # " +
                          vIndex +
                          " : " +
                          vMessage.content
                      );
                      vCount++;
                    })
                    .catch(e => {
                      console.error(e);
                    });
                } catch (e) {
                  console.error(e);
                }
              })
              .then(() => {
                const vEmbed = new this.aDiscord.MessageEmbed()
                  .setColor(this.aConfig.Bad)
                  .setAuthor(
                    this.aClient.user.username,
                    this.aClient.user.displayAvatarURL(),
                    this.aConfig.URL
                  )
                  .setTitle("Commande d'administration")
                  .setDescription(vCount + " message deleted");
                vChannel.send(vEmbed);
              });
          });
      })
      .catch(e => {
        console.error(e);
      });
  }

  mClean(message) {
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
    const vSysteme = message.guild.channels.cache.find(
      vChannelFound => vChannelFound.name === "system"
    );
    vLogs.send(vLogsEmbed);
    vSysteme.send(vLogsEmbed);
    if (message.author !== message.guild.owner.user) {
      message.reply("Vous n'avez pas la permission d'executer cette commande");
      message.delete();
      return;
    }
    const vArgs = message.content.slice(this.aConfig.Prefix.length).split(/ +/);
    console.log("number : " + vArgs[1]);
    if (!vArgs[1] || isNaN(vArgs[1])) {
      message.reply("Vous devez spécifier un nobmre valide");
      message.delete();
      return;
    }
    const vMax = vArgs[1];
    const vChannel = message.channel;
    var vCount = 0;
    const vList = vChannel.messages.fetch({ limit: vMax });
    message.channel
      .bulkDelete(vMax)
      .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
      .catch(console.error);
  }

  mBienvenue(message) {
    if (message.author !== message.guild.owner.user) {
      message.reply("Vous n'avez pas la permission d'executer cette commande");
      message.delete();
      return;
    }
    if (!message.mentions.members.first()) {
      message.reply("Vous devez citer au moins une personne");
      message.delete();
      return;
    }

    const member = message.mentions.members.forEach(member => {
      const vUser = member.user;
      this.mOnGuildMemberAdd(member);
    });
    message.delete();
  }

  mBye(message) {
    if (message.author !== message.guild.owner.user) {
      message.reply("Vous n'avez pas la permission d'executer cette commande");
      message.delete();
      return;
    }
    if (!message.mentions.members.first()) {
      message.reply("Vous devez citer au moins une personne");
      message.delete();
      return;
    }

    const member = message.mentions.members.forEach(member => {
      const vUser = member.user;
      this.mOnGuildMemberRemove(member);
    });
    message.delete();
  }

  mPing(message) {
    const vPong = new this.aDiscord.MessageEmbed()
      .setAuthor(
        this.aClient.user.username,
        this.aClient.user.displayAvatarURL,
        this.aConfig.URL
      )
      .setColor(this.aConfig.Good)
      .setDescription(`Pong !`)
      .setThumbnail(message.author.displayAvatarURL());
    message.reply(vPong);
    message.delete();
  }

  mPoll(message) {
    //
    //        const args = message.content.slice(config.Prefix.length).split(/"+/);
    //        var vIndexPoll = 0;
    //        var vPollArgs = new Array();
    //        var vPollTitle = "";
    //        for (var vIndex = 0; vIndex < args.length; vIndex++) {
    //          if (args[vIndex].trim() === "" || args[vIndex].trim() === "poll") {
    //          } else {
    //            if (vPollTitle === "") {
    //              vPollTitle = args[vIndex];
    //            } else {
    //              vPollArgs.push(args[vIndex]);
    //            }
    //          }
    //        }
    //
    //        for (var vIndex = 0; vIndex < vPollArgs.length; vIndex++) {
    //          console.log(vIndex + "=>" + vPollArgs[vIndex]);
    //        }
    //
    //        try {
    //          PollEmbed(message, vPollTitle, vPollArgs, 0);
    //        } catch (error) {
    //          console.log(error.message);
    //        }
    //
  }

  mHelp(message) {
    const commandHelp = new this.aDiscord.MessageEmbed()
      .setColor(this.aConfig.Good)
      .setTitle(`"**${this.aClient.user.username}** command panel"`)
      .setAuthor(
        `${this.aClient.user.username}`,
        `${this.aClient.user.displayAvatarURL()}`,
        this.aConfig.URL
      )
      .setDescription("Robot à tout faire...\n\n__**Liste des commandes :**__")
      .setThumbnail(`${this.aClient.user.displayAvatarURL()}`)
      .addFields(
        {
          name: "**Préfixe**",
          value:
            `${this.aConfig.Prefix}` +
            "\n*(tapez le préfixe devant une commande pour que le robot la prenne en compte)*.",
          inline: false
        },
        {
          name: "**help**",
          value: "Retourne la liste des commandes disponibles.",
          inline: false
        },
        {
          name: "**ping**",
          value: 'Répond : "pong".',
          inline: false
        },
        {
          name: "**points**",
          value:
            "Affiche votre solde de points de reconnaissance ainsi que vote progression.",
          inline: false
        },
        {
          name: "**De futures commandes sont à venir**",
          value: "Actuellement en création de nouvelles commandes utiles",
          inline: false
        } //info sur des prochaines commandes
      );
    message.author.send(commandHelp);
    message.delete();
  }

  async mOnMessage(message) {
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

    this.mRemerciements(message);

    if (!message.content.startsWith(this.aConfig.Prefix)) {
      console.log("message is not a command. Returning.");
      return;
    }
    const vArgs = message.content.slice(this.aConfig.Prefix.length).split(/ +/);
    //const command = args.shift().toLowerCase();
    const vCommandName = vArgs.shift().toLowerCase();

    const vCommand =
      this.aClient.commands.get(vCommandName) ||
      this.aClient.commands.find(
        vCommandFound =>
          vCommandFound.mAliases() &&
          vCommandFound.mAliases().includes(vCommandName)
      );

    if (!vCommand) {
      return;
    }
    vCommand.mExecute(this, message, vArgs);

    /*
    if (message.content.startsWith(this.aConfig.Prefix + "bienvenue")) {
      this.mBienvenue(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "bye")) {
      this.mBye(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "help")) {
      this.mHelp(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "points")) {
      this.mPoints(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "give")) {
      this.mGive(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "top")) {
      this.mTop(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "mute")) {
      this.mMute(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "allmute")) {
      this.mAllMute(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "unmute")) {
      this.mUnMute(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "kick")) {
      this.mKick(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "allkick")) {
      this.mAllKick(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "ban")) {
      this.mBan(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "allban")) {
      this.mAllBan(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "clear")) {
      this.mClear(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "clean")) {
      this.mClean(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "ping")) {
      this.mPing(message);
      this.aClient.commands.get("ping").execute(message, args);
    } else if (message.content.startsWith(this.aConfig.Prefix + "poll")) {
      this.mPoll(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "whois")) {
      this.mWhois(message);
    } else {
      message.delete();
    }
*/
  }

  mOnGuildMemberUpdate(oldMember, newMember) {
    var vThumbnail = "";
    var vGuild = this.aClient.guilds.cache.find(
      vGuild => vGuild.name === "Logique & Programmation"
    );
    var vLogs = vGuild.channels.cache.find(
      vChannelFound => vChannelFound.name === "logs"
    );
    const vLogsEmbed = new this.aDiscord.MessageEmbed()
      .setAuthor(
        this.aClient.user.username,
        this.aClient.user.displayAvatarURL(),
        this.aConfig.URL
      )
      .setDescription(vMessage)
      .setThumbnail(vThumbnail)
      .setColor(this.aConfig.Log);
    vLogs.send(vLogsEmbed);
    var vMessage = "";
    if (oldMember && newMember) {
      vThumbnail = newMember.user.displayAvatarURL();
      vMessage += `a guild member changes from ${oldMember.tag} to ${newMember.tag} - i.e. new role, removed role, nickname.\n`;
      vMessage += `old nickname : ${oldMember.user.nickname}; new nickname : ${newMember.user.nickname}\n`;
      vMessage += `old tag : ${oldMember.user.tag}; new tag : ${newMember.user.tag}\n`;
      vMessage += `old roles :\n`;
      for (var vIndex = 0; vIndex < oldMember.roles.size; vIndex++) {
        vMessage += `${oldMember.user.roles[vIndex].tag}\n`;
      }
      vMessage += `new roles :\n`;
      for (var vIndex = 0; vIndex < newMember.roles.size; vIndex++) {
        vMessage += `${newMember.roles[vIndex].tag}\n`;
      }
    } else if (oldMember) {
      vThumbnail = oldMember.user.displayAvatarURL();
      vMessage += `a guild member changes from ${oldMember.tag} - i.e. new role, removed role, nickname.\n`;
      vMessage += `old nickname : ${oldMember.nickname}\n`;
      vMessage += `old tag : ${oldMember.tag}\n`;
      vMessage += `old roles :\n`;
      for (var vIndex = 0; vIndex < oldMember.roles.size; vIndex++) {
        vMessage += `${oldMember.roles[vIndex].tag}\n`;
      }
      vMessage += `new roles :\n`;
      for (var vIndex = 0; vIndex < newMember.roles.size; vIndex++) {
        vMessage += `${newMember.roles[vIndex].tag}\n`;
      }
    } else if (newMember) {
      vThumbnail = newMember.user.displayAvatarURL();
      vMessage = `a guild member changes to ${newMember.tag} - i.e. new role, removed role, nickname.\n`;
      vMessage += `new nickname : ${newMember.nickname}\n`;
      vMessage += `new tag : ${newMember.tag}\n`;
      vMessage += `new roles :\n`;
      for (var vIndex = 0; vIndex < newMember.roles.size; vIndex++) {
        vMessage += `${newMember.roles[vIndex].tag}\n`;
      }
    } else {
      vMessage += `a guild member changes - i.e. new role, removed role, nickname.`;
    }
  }
  mOnGuildMemberAdd(member) {
    console.log(member.user.username + "enter server");
    const vUser = member.user;
    const vGuild = member.guild;
    const vCache = vGuild.channels.cache;
    const vLogs = vCache.find(vChannelFound => vChannelFound.name === "logs");
    const vSystem = vCache.find(
      vChannelFound => vChannelFound.name === "system"
    );
    const vAccueil = vCache.find(
      vChannelFound => vChannelFound.name === "accueil-et-départs"
    );
    const vReglement = vCache.find(
      vChannelFound => vChannelFound.name === "règlement"
    );
    const vRoles = vCache.find(vChannelFound => vChannelFound.name === "rôles");
    const vBlabla = vCache.find(
      vChannelFound => vChannelFound.name === "bla-bla-bla"
    );
    const vFaq = vCache.find(vChannelFound => vChannelFound.name === "faq");
    // Send the message, mentioning the member
    const vEmbed = new this.aDiscord.MessageEmbed()
      .setAuthor(
        this.aClient.user.username,
        this.aClient.user.displayAvatarURL(),
        this.aConfig.URL
      )
      .setColor(this.aConfig.Good)
      .setDescription(`Nouvel arrivant sur le serveur : ${vUser}.`)
      .setThumbnail(vUser.displayAvatarURL());
    //vGuild.owner.send(vEmbed);
    // Do nothing if the channel wasn't found on this server
    if (!vLogs) {
      console.error('channel "logs" not found');
      return;
    }
    vLogs.send(vEmbed);

    if (!vSystem) {
      console.error('channel "system" not found');
      return;
    }
    vSystem.send(vEmbed);
    if (!vAccueil) {
      console.error('channel "accueil-et-départs" not found');
      return;
    }
    if (!vReglement) {
      console.error('channel "règlement" not found');
      return;
    }
    if (!vRoles) {
      console.error('channel "rôles" not found');
      return;
    }
    if (!vBlabla) {
      console.error('channel "faq" not found');
      return;
    }
    if (!vFaq) {
      console.error('channel "bla-bla-bla" not found');
      return;
    }
    const vNewcomer = new this.aDiscord.MessageEmbed()
      .setAuthor(
        vGuild.owner.user.username,
        vGuild.owner.user.displayAvatarURL()
      )
      .setColor(this.aConfig.Good)
      .setDescription(
        `Bienvenu à toi, ${vUser}.\nValide le règlement dans ${vReglement} svp.\nPuis attribue toi des rôles dans ${vRoles}.\nEnfin dis "Bonjour" dans ${vBlabla}.\nSi tu ne sais pas où aller, la ${vFaq} te guidera.`
      )
      .setThumbnail(vUser.displayAvatarURL());

    vAccueil.send({
      content: `${vUser}`,
      embed: vNewcomer
    });
  }
  mOnGuildMemberRemove(member) {
    const vUser = member.user;
    const vGuild = member.guild;
    const vCache = vGuild.channels.cache;
    const vAccueil = vGuild.channels.cache.find(
      vChannelFound => vChannelFound.name === "accueil-et-départs"
    );
    const vLogs = vCache.find(vChannelFound => vChannelFound.name === "logs");
    if (!vLogs) {
      console.error('channel "logs" not found');
      return;
    }

    const vEmbed = new this.aDiscord.MessageEmbed()
      .setAuthor(
        this.aClient.user.username,
        this.aClient.user.displayAvatarURL(),
        this.aConfig.URL
      )
      .setColor(this.aConfig.Bad)
      .setDescription(`${member} est parti du serveur.`)
      .setThumbnail(vUser.displayAvatarURL());
    vLogs.send(vEmbed);
    const vSystem = vCache.find(
      vChannelFound => vChannelFound.name === "system"
    );
    if (!vSystem) {
      console.error('channel "system" not found');
      return;
    }
    vSystem.send(vEmbed);
    if (!vAccueil) {
      console.log('channel "accueil-et-départs" not found');
      return;
    }
    const vLeaver = new this.aDiscord.MessageEmbed()
      .setAuthor(
        vGuild.owner.user.username,
        vGuild.owner.user.displayAvatarURL()
      )
      .setColor(this.aConfig.Bad)
      .setDescription(`Bon vent à toi, ${member}.`)
      .setThumbnail(vUser.displayAvatarURL());
    vAccueil.send(vLeaver);
  }
  mOnGuildBanAdd(guild, user) {
    console.log(`Guild ${guild} has banned user ${user}`);
  }
  mOnGuildBanRemove(guild, user) {
    console.log(`Guild ${guild} has banned user ${user}`);
  }
  mOnReconnecting() {
    console.log(`client tries to reconnect to the WebSocket`);
  }
  mOnChannelCreate(channel) {
    console.log(`channelCreate: ${channel}`);
  }
  mOnChannelDelete(channel) {
    console.log(`channelDelete: ${channel}`);
  }
  mOnChannelPinsUpdate(channel, time) {
    console.log(`channelPinsUpdate: ${channel}:${time}`);
  }
  mOnChannelUpdate(oldChannel, newChannel) {
    if (oldChannel && newChannel) {
      console.log(
        `channelUpdate -> a channel is updated from ${oldChannel.name} to ${newChannel.name}`
      );
    } else if (oldChannel) {
      console.log(
        `channelUpdate -> a channel is updated from ${oldChannel.name}`
      );
    } else if (newChannel) {
      console.log(
        `channelUpdate -> a channel is updated to ${newChannel.name}`
      );
    } else {
      console.log(
        `channelUpdate -> a channel is updated - e.g. name change, topic change`
      );
    }
  }
  mOnClientUserGuildSettingsUpdate(clientUserGuildSettings) {
    console.log(
      `clientUserGuildSettingsUpdate -> client user's settings update`
    );
  }
  mOnClientUserSettingsUpdate(clientUserSettings) {
    console.log(`clientUserSettingsUpdate -> client user's settings update`);
  }
  mOnDebug(info) {
    //console.log(`debug -> ${info}`);
  }
  mOnDisconnect(event) {
    console.log(
      `The WebSocket has closed and will no longer attempt to reconnect`
    );
  }
  mOnEmojiCreate(emoji) {
    console.log(`a custom emoji is created in a guild`);
  }
  mOnEmojiDelete(emoji) {
    console.log(`a custom guild emoji is deleted`);
  }
  mOnEmojiUpdate(oldEmoji, newEmoji) {
    console.log(`a custom guild emoji is updated`);
  }
  mOnError(error) {
    console.error(
      `client's WebSocket encountered a connection error: ${error}`
    );
  }
  mOnGuildCreate(guild) {
    console.log(`the client joins a guild`);
  }
  mOnGuildDelete(guild) {
    console.log(`the client deleted/left a guild`);
  }
  mOnGuildMemberAvailable(member) {
    console.log(`member becomes available in a large guild: ${member.tag}`);
  }
  mOnGuildMemberSpeaking(member, speaking) {
    console.log(`a guild member starts/stops speaking: ${member.tag}`);
  }
  mOnGuildMembersChunk(members, guild) {
    console.error(`a chunk of guild members is received`);
  }
  mOnGuildUnavailable(guild) {
    console.error(
      `a guild becomes unavailable, likely due to a server outage: ${guild}`
    );
  }
  mOnGuildUpdate(oldGuild, newGuild) {
    console.error(`a guild is updated`);
  }
  mOnMessageDelete(message) {
    var vMessage =
      `le message <` +
      message.id +
      `> est supprimé -> content:"${message.content}" -> embeds :`;
    message.embeds.forEach(embed => {
      vMessage += embed;
    });
    console.error(vMessage);
    var vEmbed = new this.aDiscord.MessageEmbed()
      .setColor(this.aConfig.Bad)
      .setAuthor(
        this.aClient.user.username,
        this.aClient.user.displayAvatarURL(),
        this.aConfig.URL
      )
      .setTitle("**Suppression de message**")
      .setDescription(vMessage);
    var vLogs = message.guild.channels.cache.find(
      vChannelFound => vChannelFound.name === "logs"
    );
    if (vLogs) {
      vLogs.send(vEmbed);
    }
  }
  mOnMessageDeleteBulk(messages) {
    var vEmbed = new this.aDiscord.MessageEmbed()
      .setAuthor(
        this.aClient.user.username,
        this.aClient.user.displayAvatarURL(),
        this.aConfig.URL
      )
      .setTitle("DeleteBulk")
      .setDescription("Ces messages ont été supprimés en masse.")
      .setColor(this.aConfig.Bad);
    messages.forEach(message => {
      if (message.content === "") {
        vEmbed.addField(message.id, message.embed, false);
      } else {
        vEmbed.addField(message.id, message.content, false);
      }
    });
    const vLogs = this.aClient.guilds.cache
      .first()
      .channels.cache.find(vChannelFound => vChannelFound.name === "logs");
    if (vLogs) {
      vLogs.send(vEmbed);
    }
  }
  mOnMessageReactionAdd(messageReaction, user) {
    console.log(`a reaction is added to a message`);
  }
  mOnMessageReactionRemove(messageReaction, user) {
    console.log(`a reaction is removed from a message`);
  }
  mOnMessageReactionRemoveAll(message) {
    console.error(`all reactions are removed from a message`);
  }
  mOnMessageUpdate(oldMessage, newMessage) {
    console.log(`a message is updated`);
  }
  mOnPresenceUpdate(oldMember, newMember) {
    var vMessage = "";
    if (oldMember && newMember) {
      vMessage += `Un membre à changé son statut passant de ${oldMember.user}:${oldMember.status} à ${newMember.user}:${newMember.status}.`;
    } else if (oldMember) {
      vMessage += `Un membre à changé son statut de ${oldMember.user}:${oldMember.status}.`;
    } else if (newMember) {
      vMessage += `Un membre à changé son statut à ${newMember.user}:${newMember.status}.`;
    } else {
      vMessage += `Un membre à changé son statut.`;
    }
    var vLogs = this.aClient.guilds.cache
      .first()
      .channels.cache.find(vChannel => vChannel.name === "logs");
    const vLogEmbed = new this.aDiscord.MessageEmbed()
      .setColor(this.aConfig.Log)
      .setTitle("Presence Update")
      .setAuthor(
        this.aClient.user.username,
        this.aClient.user.displayAvatarURL(),
        this.aConfig.URL
      )
      .setDescription(vMessage);
    vLogs.send(vLogEmbed);
  }
  mOnResume(replayed) {
    console.log(`whenever a WebSocket resumes, ${replayed} replays`);
  }
  mOnRoleCreate(role) {
    console.error(`a guild role ${role}`);
  }
  mOnRoleDelete(role) {
    console.error(`a guild role ${role} is deleted`);
  }
  mOnRoleUpdate(oldRole, newRole) {
    console.error(`a guild role ${oldRole}, ${newRole} is updated`);
  }
  mOnTypingStart(channel, user) {
    console.log(`<${user.tag}> has started typing in channel ${channel.name}`);
  }
  mOnTypingStop(channel, user) {
    console.log(`<${user.tag}> has stopped typing`);
  }
  mOnUserNoteUpdate(user, oldNote, newNote) {
    console.log(`a member's note is updated`);
  }
  mOnUserUpdate(oldUser, newUser) {
    console.log(`user's details (e.g. username) are changed`);
  }
  mOnVoiceStateUpdate(oldMember, newMember) {
    console.log(`a user changes voice state`);
  }
  mOnWarn(info) {
    console.log(`warn: ${info}`);
  }
}

module.exports = new DiscordBot();
