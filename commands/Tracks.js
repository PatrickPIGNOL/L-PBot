const Command = require("../Command.js");
class Tracks extends Command 
{
    constructor() 
    {
        super
        (
            "tracks",
            ["track"],
            ["ADMINISTRATOR"],
            1,
            0,
            0,
            0,
            "",
            "",
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
            let vTitle = "";
            let vDescription = "";
            const vCommand = args.shift().toLowerCase().trim();
            if(vCommand === "list")
            {
                vTitle = "**Liste des pistes audio**"
                const vData = pDiscordBot.mSQL().Database.Tracks.mSelectAll();
                if(vData.length === 0)
                {
                    vDescription += `Pas d'enregistrements\n`
                    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
                        .setTitle(vTitle)
                        .setAuthor(
                            pDiscordBot.aClient.user.username,
                            pDiscordBot.aClient.user.displayAvatarURL(),
                            pDiscordBot.aConfig.URL
                        )
                        .setColor(pDiscordBot.aConfig.Good)
                        .setDescription(vDescription)
                        .setThumbnail(message.author.displayAvatarURL());
                        message.channel.send(vEmbed);        
                }
                else
                {
                    vDescription += `id|Titre|Artiste\n`
                    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
                        .setTitle(vTitle)
                        .setAuthor(
                            pDiscordBot.aClient.user.username,
                            pDiscordBot.aClient.user.displayAvatarURL(),
                            pDiscordBot.aConfig.URL
                        )
                        .setColor(pDiscordBot.aConfig.Good)
                        .setDescription(vDescription)
                        .setThumbnail(message.author.displayAvatarURL());
                        message.channel.send(vEmbed);        
                    vData.forEach
                    (
                        vLine =>
                        {
                            message.channel.send(`${vLine.rowid}|${vLine.Title}|${vLine.Artist}\n`);
                        }
                    )
                }
                
                message.delete();
                return
            }
            else if(vCommand === "add")
            {
                const vValues = 
                {
                    Title: args.shift(), 
                    Artist: args.shift(), 
                    LicenceImageURL: args.shift(), 
                    LicenceURL: args.shift(),
                    Links: args.join(" ")
                };
                pDiscordBot.mSQL().Database.Tracks.mInsert(vValues);
                vTitle = "**Nouvelle piste audio ajoutée !**"
                vDescription = `La piste ${vValues.Title} de ${vValues.Artist} à bien été ajoutée.`;
                message.delete();
            }
            else if(vCommand == "remove")
            {
                vTitle = "**Piste audio supprimée !**"
                args.forEach
                (
                    vValue=>
                    {
                        pDiscordBot.mSQL().Database.Tracks.mRemove(vValue);
                        vDescription = `La piste id : ${vValue} à bien été supprimée.`;
                    }
                );
                message.delete();
            }
            const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
                .setTitle(vTitle)
                .setAuthor(
                    pDiscordBot.aClient.user.username,
                    pDiscordBot.aClient.user.displayAvatarURL(),
                    pDiscordBot.aConfig.URL
                )
                .setColor(pDiscordBot.aConfig.Good)
                .setDescription(vDescription)
                .setThumbnail(message.author.displayAvatarURL());
                message.channel.send(vEmbed);
        })
        .catch(e => {
            console.error(e);
            message.reply(e);
            message.delete();
            return;
        });
    }
}

module.exports = new Tracks();