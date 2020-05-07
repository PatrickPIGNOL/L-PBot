class Boule8 {
  constructor() 
  {
    this.aName = "boule8";
    this.aAliases = ['8ball'];
    this.aArgs = true;
    this.aMentions = false;
    this.aUsage = "boule8 <Question ?>";
    this.aDescription = "Donne une réponse aléatoire ?";
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

    const vRandom = Math.floor(Math.random() * 20);
    
    let vTextes = [
    "Essaye plus tard",
    "D'après moi oui",
    "C'est non",
    "Essaye encore",
    "C'est certain",
    "Peu probable",
    "Pas d'avis",
    "Oui absolument",
    "Faut pas rêver",
    "C'est ton destin",      
    "Tu peux compter dessus",
    "N'y compte pas",
    "Le sort en est jeté",
    "Oui",
    "Impossible",
    "Une chance sur deux",
    "Sans aucun doute",
    "Ça sent mauvais",
    "Repose ta question",
    "Très probable",
    "Très improbable",
    "Il manque un paramètre",
    "C'est bien parti",
    "Mieux vaut oublier"
    ];
    
    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL()
      )
      .setColor(pDiscordBot.aConfig.Good)
      .setTitle("** La boule 🎱 **")
      .setDescription("A la question : ***« " + args.join(" ") + " »***\nLa boule 🎱 à répondu : ***« " + vTextes[vRandom] + " »***");
    message.guild.channels.cache.find(vChannelFound => vChannelFound.name === "boule🎱").send(vEmbed);
    message.delete();
  }
}

module.exports = new Boule8();

