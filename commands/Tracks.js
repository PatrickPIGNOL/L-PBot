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
                const vData = pDiscordBot.Database.Tracks.mSelectAll();
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
				const vRegExp = new RegExp("_", "gi");
				let vTitle = args.shift()
				vTitle = vTitle.replace(vRegExp, " ");
				let vArtist = args.shift();
				vArtist = vArtist.replace(vRegExp, " ");
                const vValues = 
                {
                    Title: vTitle, 
                    Artist: vArtist, 
                    LicenceImageURL: args.shift(), 
                    LicenceURL: args.shift(),
                    Links: args.join(" ")
                };
                pDiscordBot.Database.Tracks.mInsert(vValues);
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
                        pDiscordBot.Database.Tracks.mRemove(vValue);
                        vDescription = `La piste id : ${vValue} à bien été supprimée.`;
                    }
                );
                message.delete();
            }
			else if(vCommand == "replace")
			{
				const vData = pDiscordBot.Database.Tracks.mSelectAll();
				const vRegExp = new RegExp("_", "gi");				
				vData.forEach
				(
					vLine=>
					{
						let vTitle = vLine.Title;
						let vArtist = vLine.Artist;
						vTitle = vTitle.replace(vRegExp, " ");
						vArtist = vArtist.replace(vRegExp, " ");
						vLine.Title = vTitle;
						vLine.Artist = vArtist;
						pDiscordBot.Database.Tracks.mUpdate(vLine);
					}
				)
				message.delete();
				return;
			}
			else if(vCommand == "update")
			{
				const vID = args.shift();
				const vField = args.shift().toLowerCase();
				const vData = pDiscordBot.Database.Tracks.mSelectID(vID);
				if(vData)
				{
					if(vField == "title")
					{
						vData.Title = args.join(" ");
					}
					else if(vField == "artist")
					{
						vData.Artist = args.join(" ");
					}
					else if(vField == "licenceimageurl")
					{
						vData.LicenceImageURL = args.shift();
					}
					else if(vField == "licenceurl")
					{
						vData.LicenceURL = args.shift();
					}
					else if(vField == "links")
					{
						vData.Links = args.join(" ");
					}
					pDiscordBot.Database.Tracks.mUpdate(vData);
					message.delete();
					return;
				}
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