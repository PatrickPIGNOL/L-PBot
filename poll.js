const DiscordBot = require('./bot.js');

class Poll
{
    constructor()
    {
        this.aTitle = "";
        this.aAuthor;
        this.aDescription = "";
        this.aOptions = [];
    }
    setTitle(pTitle)
    {
        this.aTitle = pTitle;
        return this;
    }
    setAuthor(pAuthor)
    {
        this.aAuthor = pAuthor;
        return this;
    }
    setDescription(pDescription)
    {
        this.aDescription = pDescription;
        return this;
    }
    getEmbed()
    {
        return new Discord.MessageEmbed()
          .setTitle(this.aTitle)
          .setAuthor(this.aAuthor.username, this.aAuthor.displayAvatarURL())
          .setDescription(this.aDescription);
    }
}