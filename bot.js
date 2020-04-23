class DiscordBot {
  constructor() {
    this.aDiscord = require("discord.js");
    this.aClient = new this.aDiscord.Client();
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
  mOnReady() {
    this.aClient.user.setStatus("online");
    this.aClient.user.setActivity("écrire son code source...", { type: 1 });

    console.log(`${this.aClient.user.tag} - Je suis en ligne monsieur `);

    console.log(
      `${this.aClient.guilds.cache.first().members.cache.size} users, in ${
        this.aClient.guilds.cache.first().channels.cache.size
      } channels of ${this.aClient.guilds.cache.size} guilds.`
    );
    this.aSQLite
      .prepare(
        "CREATE TABLE IF NOT EXISTS scores (guild TEXT, user TEXT, usertag TEXT, points INTEGER, level INTEGER, PRIMARY KEY (guild, user));"
      )
      .run();
    this.aSQL
      .prepare(
        "CREATE TABLE IF NOT EXISTS scores (guild TEXT, user TEXT, usertag TEXT, points INTEGER, level INTEGER, PRIMARY KEY (guild, user));"
      )
      .run();

    this.aSQL.getScore = this.aSQL.prepare(
      "SELECT * FROM scores WHERE guild = ? AND user = ? ORDER BY points ASC"
    );
    this.aSQL.setScore = this.aSQL.prepare(
      "INSERT OR REPLACE INTO scores (guild , user, usertag, points, level) VALUES (@guild, @user, @usertag, @points, @level);"
    );
    this.aSQLite.getScore = this.aSQLite.prepare(
      "SELECT * FROM scores WHERE guild = ? AND user = ? ORDER BY points ASC"
    );
    this.aSQLite.setScore = this.aSQLite.prepare(
      "INSERT OR REPLACE INTO scores (guild , user, usertag, points, level) VALUES (@guild, @user, @usertag, @points, @level);"
    );
    this.aSQL.pragma("synchronous = 1");
    this.aSQL.pragma("journal_mode = persist");
    this.aSQLite.pragma("synchronous = 1");
    this.aSQLite.pragma("journal_mode = persist");
    //this.aSQL.getScore().
  }

  mRemerciements(message) {
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
                vScore = this.aSQL.getScore.get(message.guild.id, vUser.id);
                if (!vScore) {
                  vScore = {
                    guild: message.guild.id,
                    user: vUser.id,
                    usertag: vUser.tag,
                    points: 0,
                    level: 0
                  };
                }
                vScore.points++;
                console.log(vScore);
                var vMessage = `${message.author} a donné à ${vUser} +1 point de Reconnaissance soit un total de ${vScore.points}.\n`;
                const vLevel = Math.floor(Math.sqrt(vScore.points));
                if (vScore.level < vLevel) {
                  vScore.level = vLevel;
                  vMessage += `${vUser} est passé au niveau supérieur soit le niveau ${vScore.level}.\n:tada::confetti_ball: Félicitations ! :confetti_ball::tada:\n`;
                }
                console.log(vScore);
                const vEmbed = new this.aDiscord.MessageEmbed()
                  .setColor(this.aConfig.Good)
                  .setTitle("**Reconnaissance**")
                  .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL()
                  )
                  .setDescription(vMessage)
                  .setThumbnail(vUser.displayAvatarURL());
                message.channel.send(vEmbed);
                this.aSQL.setScore.run(vScore);
              }
            }
          }
        });
      }
    });
  }

  mWhois(message) {
    const vMember = message.mentions.members.first();
    if (!vMember) {
      const vEmbed = new this.aDiscord.MessageEmbed()
        .setAuthor(
          this.aClient.user.username,
          this.aClient.user.displayAvatarURL(),
          this.aConfig.URL
        )
        .setTitle("**Erreur**")
        .setColor(this.aConfig.Bad)
        .setThumbnail(vUser.displayAvatarURL());
      message.reply("Vous devez mentionner un membre.");
      message.delete();
      return;
    }
    const vUser = vMember.user;
    const vEmbed = new this.aDiscord.MessageEmbed()
      .setAuthor(
        this.aClient.user.username,
        this.aClient.user.displayAvatarURL(),
        this.aConfig.URL
      )
      .setTitle(vUser.username)
      .setColor(this.aConfig.Good)
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

  mPoints(message) {
    const vUser = message.author;
    var vScore = this.aSQL.getScore.get(message.guild.id, vUser.id);
    if (!vScore) {
      vScore = {
        guild: message.guild.id,
        user: vUser.id,
        usertag: vUser.tag,
        points: 0,
        level: 0
      };
    }
    var vEmbed = new this.aDiscord.MessageEmbed()
      .setColor(this.aConfig.Good)
      .setAuthor(
        this.aClient.user.username,
        this.aClient.user.displayAvatarURL(),
        this.aConfig.URL
      )
      .setTitle("Points de reconnaissances de " + message.author.username)
      .setDescription(
        "Retrouvez [le classement complet de tous nos membres](https://mercurial-ripe-rook.glitch.me/points) via internet."
      )
      .setThumbnail(message.author.displayAvatarURL())
      .addFields(
        {
          name: "*Points actuels :*",
          value: vScore.points + " points (Niv. " + vScore.level + ")",
          inline: true
        },
        {
          name: "*Prochain Niveau (" + (vScore.level + 1) + ") :*",
          value: (vScore.level + 1) * (vScore.level + 1) + " points.",
          inline: true
        },
        {
          name: "*@Identifiant :*",
          value: vUser,
          inline: false
        }
      );
    message.channel.send(vEmbed);
    message.delete();
  }

  mGive(message) {
    if (message.author !== message.guild.owner.user) {
      const vReply = new this.aDiscord.MessageEmbed()
        .setTitle("**Erreur**")
        .setColor(this.aConfig.Bad)
        .setAuthor(
          this.aClient.user.username,
          this.aClient.user.displayAvatarURL(),
          this.aConfig.URL
        )
        .setDescription(
          "Vous n'avez pas le droit d'utiliser la commande \"give\""
        );
      message.reply(vReply);
      message.delete();
      return;
    }
    const vArgs = message.content.slice().split(/ +/);
    if (isNaN(vArgs[1])) {
      const vReply = new this.aDiscord.MessageEmbed()
        .setTitle("**Erreur**")
        .setColor(this.aConfig.Bad)
        .setAuthor(
          this.aClient.user.username,
          this.aClient.user.displayAvatarURL(),
          this.aConfig.URL
        )
        .setDescription("Vous devez donner un nombre de points valide.");
      message.reply(vReply);
      message.delete();
      return;
    }
    if (!message.mentions.members.first()) {
      const vReply = new this.aDiscord.MessageEmbed()
        .setTitle("**Erreur**")
        .setColor(this.aConfig.Bad)
        .setAuthor(
          this.aClient.user.username,
          this.aClient.user.displayAvatarURL(),
          this.aConfig.URL
        )
        .setDescription("Vous devez mensionner au moins un utilisateur.");
      message.reply(vReply);
      message.delete();
      return;
    }
    const vPoints = parseInt(vArgs[1]);

    message.mentions.members.forEach(vMember => {
      var vUser = vMember.user;
      var vScore = this.aSQL.getScore.get(message.guild.id, vUser.id);
      if (!vScore) {
        vScore = {
          guild: message.guild.id,
          user: vUser.id,
          usertag: vUser.tag,
          points: 0,
          level: 1
        };
      } else {
        vScore.usertag = vUser.tag;
      }
      if (vPoints < 0) {
        vColor = this.aConfig.Bad;
      } else {
        vColor = this.aConfig.Good;
      }
      vScore.points += vPoints;
      var vColor;
      var vMessage = `${message.author} a donné à ${vMember} ${vPoints} point de Reconnaissance soit un total de ${vScore.points}.\n`;
      const vLevel = Math.floor(Math.sqrt(vScore.points));
      if (vScore.level != vLevel) {
        vMessage += `${vUser} est passé au niveau ${vLevel}.\n`;
        if (vScore.level < vLevel) {
          vMessage += `:tada::confetti_ball: Félicitations ! :confetti_ball::tada:\n`;
        } else {
          vMessage += `:sob::scream: Vous avez été rétrogradé ! :scream::sob:\n`;
        }
      }
      vScore.level = vLevel;
      this.aSQL.setScore.run(vScore);
      const vEmbed = new this.aDiscord.MessageEmbed()
        .setColor(vColor)
        .setAuthor(
          this.aClient.user.username,
          this.aClient.user.displayAvatarURL(),
          this.aConfig.URL
        )
        .setTitle("**Modification des points de reconnaissance**")
        .setThumbnail(vUser.displayAvatarURL())
        .setDescription(vMessage);
      message.channel.send(vEmbed);
    });
    message.delete();
  }

  mTop(message) {
    if (message.author !== message.guild.owner.user) {
      const vReply = new this.aDiscord.MessageEmbed()
        .setTitle("**Erreur**")
        .setColor(this.aConfig.Bad)
        .setAuthor(
          this.aClient.user.username,
          this.aClient.user.displayAvatarURL(),
          this.aConfig.URL
        )
        .setDescription(
          "Vous n'avez pas la permission d'utiliser la commande \"top\""
        );
      message.reply(vReply);
      message.delete();
      return;
    }
    console.log("entering top");
    const top10 = this.aSQL
      .prepare(
        "SELECT * FROM scores WHERE guild = ? ORDER BY points DESC, usertag ASC LIMIT 10;"
      )
      .all(message.guild.id);
    const embed = new this.aDiscord.MessageEmbed()
      .setColor(this.aConfig.Good)
      .setTitle("Top 10 des points de reconnaissances")
      .setAuthor(
        this.aClient.user.username,
        this.aClient.user.displayAvatarURL(),
        this.aConfig.URL
      )
      .setDescription(
        "Retrouvez [le classement complet de tous nos membres](https://mercurial-ripe-rook.glitch.me/points) via internet."
      );

    console.log("message embed created");
    var vRank = 1;
    top10.forEach(vData => {
      const vUserID = vData.user;
      console.log(vUserID);
      console.log(vData);
      console.log("Rank #" + vRank);
      const vMember = message.guild.members.cache.find(
        vSearchMember => vSearchMember.user.id == vUserID
      );
      if (vMember) {
        const vUser = vMember.user;
        console.log(vRank + ":" + vUser.tag + ":" + vUser.id);

        console.log("user " + vUser.tag + " fetched");
        embed.addField(
          `#${vRank} - ${vData.points} points (Niv. ${vData.level})`,
          `@${vUser.tag}`
        );
        //embed.setImage(vUser.displayAvatarURL());
        console.log("Field added !");
        vRank++;
      }
    });
    console.log("loop Finished !");
    message.channel.send(embed);
    message.delete();
  }

  async mMute(message) {
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
        if(!await channel.permissionOverwrites.get(vMember.user.id))
        {
          await channel.createOverwrite(vMember.user, {
            SEND_MESSAGES: false,
            SEND_TTS_MESSAGES: false,
            ATTACH_FILES: false,
            MENTION_EVERYONE: false,
            USE_EXTERNAL_EMOJIS: false,
            //CONNECT: false,
            SPEAK: false,
            USE_VAD: false
          })
          .then(async channel => await console.log(channel.name + " : " + await channel.permissionOverwrites.get(vMember.user.id)))
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
          .setAuthor(
            vAuthor.username,
            vAuthor.displayAvatarURL()
          )
          .setImage("https://cdn.discordapp.com/attachments/690978875446132796/702004987269480588/tumblr_p5sgzzfA881sc0ffqo3_540.gif")
          .setThumbnail(vMember.user.displayAvatarURL())
          .setDescription(`${vAuthor}` +
              " à rendu muet " + `${vMember.user}` + " pour la raison \"" + vArgs.join(" ") + "\"."
        );
      vMember.send(vEmbed);
      message.channel.send(vEmbed);
    });
    message.delete();
  }
  
  mAllMute(message) {
    
  }
  
  async mUnMute(message)
  {
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
        var vPermission = await channel.permissionOverwrites.get(vMember.user.id)
        if(vPermission)
        {
          await vPermission.delete().catch(e => {
            console.error(e.stack);
            return;
          });
        }
      });
      var vArgs = message.content.split(" ");
      vArgs.shift();
      const vEmbed = new this.aDiscord.MessageEmbed()
          .setColor(this.aConfig.Good)
          .setTitle("**🕊️🤝PARLONS EN PAIX🤝🕊️**")
          .setAuthor(
            vAuthor.username,
            vAuthor.displayAvatarURL()
          )
          .setImage("https://cdn.discordapp.com/attachments/690978875446132796/702185805418070118/tumblr_n0dvc88MiT1rv1d8ho3_500.gif")
          .setThumbnail(vMember.user.displayAvatarURL())
          .setDescription(`${vAuthor}` +
              " à rendu la parole à " + `${vMember.user}` + " pour la raison \"" + vArgs.join(" ") + "\"."
        );
      vMember.send(vEmbed);
      message.channel.send(vEmbed);
    });
    message.guild.channels.cache.forEach(async (channel, id) => {        
        var vPermission = channel.permissionOverwrites.get()
        if(vPermission)
        {
          await vPermission.delete();
        }
    });
    message.delete();
  }
  
  mAllUnMute(message)
  {
    
  }
  
  mKick(message){
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
    if(!message.mentions.members.first())
    {
      message.reply("Vous devez mentionner un membre.");
      message.delete();
      return;
    }
    console.log(message.content);
    message.mentions.members.forEach(vMember => {
      if(vMember !== message.guild.owner){
        var vArgs = message.content.split(" ");
        vArgs.shift();
        const vEmbed = new this.aDiscord.MessageEmbed()
          .setColor(this.aConfig.Bad)
          .setTitle("**⚡🔨EXCLUSION🔨⚡**")
          .setAuthor(
            vAuthor.username,
            vAuthor.displayAvatarURL()
          )
          .setImage("https://cdn.discordapp.com/attachments/690978875446132796/701620863383896104/5161568c3139718e683d5a2f553b2033.gif")
          .setThumbnail(vMember.user.displayAvatarURL())
          .setDescription(`${vAuthor}` +
              " à exclu " + `${vMember.user}` + " pour la raison \"" + vArgs.join(" ") + "\"."
        ); 
        message.channel.send(vEmbed);      
        vMember.user.send(vEmbed).then(()=>{
          vMember.kick(vArgs.join(" "));
        });
      }
    });
    message.delete();
  }
  
  mAllKick(message){
    
  }
  
  mBan(message){
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
    if(!message.mentions.members.first())
    {
      message.reply("Vous devez mentionner un membre.");
      message.delete();
      return;
    }
    console.log(message.content);
    message.mentions.members.forEach(vMember => {
      if(vMember !== message.guild.owner){
        var vArgs = message.content.split(" ");
        vArgs.shift();
        const vEmbed = new this.aDiscord.MessageEmbed()
          .setColor(this.aConfig.Bad)
          .setTitle("**⚡🔨BANNISSEMENT🔨⚡**")
          .setAuthor(
            vAuthor.username,
            vAuthor.displayAvatarURL()
          )
          .setImage("https://cdn.discordapp.com/attachments/690978875446132796/701791329855996024/tenor.gif")
          .setThumbnail(vMember.user.displayAvatarURL())
          .setDescription(`${vAuthor}` +
              " à banni " + `${vMember.user}` + " pour la raison \"" + vArgs.join(" ") + "\"."
        ); 
        message.channel.send(vEmbed);      
        vMember.user.send(vEmbed).then(()=>{
          vMember.ban({ days: 0, reason: message.content});
        });
      }
    });
    message.delete();    
  }
  
  mAllBan(message){
    
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
  
  mBye(message){
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
    } else if (message.content.startsWith(this.aConfig.Prefix + "poll")) {
      this.mPoll(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "whois")) {
      this.mWhois(message);
    } else {
      message.delete();
    }
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
    if(oldChannel && newChannel)
    {
      console.log(
        `channelUpdate -> a channel is updated from ${oldChannel.name} to ${newChannel.name}`
      );  
    }
    else if (oldChannel)
    {
      console.log(
        `channelUpdate -> a channel is updated from ${oldChannel.name}`
      );
    }
    else if (newChannel)
    {
      console.log(
        `channelUpdate -> a channel is updated to ${newChannel.name}`
      );  
    }
    else
    {
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
