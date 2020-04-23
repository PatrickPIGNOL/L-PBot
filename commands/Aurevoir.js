class Aurevoir {
  constructor() 
  {
    this.aName = "Aurevoir";
    this.aAliases = ['bye'];
    this.aArgs = false;
    this.aMentions = true;
    this.aUsage = "+Aurevoir @IDPersonne1 [@IDPersonne2 [...]]";
    this.aDescription = "Permet de souhaiter le bon vent à une ou plusieurs personne si le système ne l'a pas fait.";
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
  mExecute(pDiscordBot, message, args) 
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

    message.mentions.members.forEach(member => {
      const vOnGuildMemberRemove = require("../events/OnGuildMemberRemove.js");
      console.log(member);
      vOnGuildMemberRemove.mExecute(pDiscordBot, member);
    });
    message.delete();
  }
}

module.exports = new Aurevoir();