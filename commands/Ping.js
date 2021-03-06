const Command = require("../Command.js");
class Ping extends Command 
{
    constructor() 
    {
        super
        (
            "ping",
            ["pong"],
            [],
            0,
            0,
            0,
            0,
            "ping",
            "Commande pour tester l'activité du bot. Répond : 'Pong!'.",
            true,
            0
        );
    }
    async mExecute(pDiscordBot, message, args) 
    {
        super
        .mExecute(pDiscordBot, message, args)
        .then(() => 
        {
            const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
                .setAuthor(
                    pDiscordBot.aClient.user.username,
                    pDiscordBot.aClient.user.displayAvatarURL(),
                    pDiscordBot.aConfig.URL
                )
                .setColor(pDiscordBot.aConfig.Good)
                .setDescription(`Pong !`)
                .setThumbnail(message.author.displayAvatarURL());
                message.reply(vEmbed);
                message.delete();
        })
        .catch(e => {
            console.error(e);
            message.reply(e);
            message.delete();
            return;
        });
    }
}

module.exports = new Ping();
