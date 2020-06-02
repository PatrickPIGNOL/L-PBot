const Command = require("../Command.js");
class Sondage extends Command {
  constructor() 
  {
    super(
      "sondage",
      ["poll"],
      [
        "ADMINISTRATOR"
      ],
      0,
      0,
      "sondage",
      "Crée un sondage.",
      true,
      0
    ); 
    this.aName = "sondage";
    this.aAliases = ['poll'];
    this.aArgs = true;
    this.aMentions = false;
    this.aUsage = "+sondage";
    this.aDescription = "Crée un sondage.";
    this.aGuildOnly = true;
    this.aCooldown = 10;
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
}

module.exports = new Sondage();

