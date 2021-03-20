const Command = require("../Command.js");
class Points extends Command 
{
    constructor() 
	{
        super(
            "points",
            [],
            [],
            0,
            0,
            0,
            0,
            "points",
            "Retourne les points de reconnaissances et de participations de l'utilisateur",
            true,
            0
        );
    }
	mExecute(pDiscordBot, message, args) 
	{
		super.mExecute(pDiscordBot, message, args)
			.then
			(
				() => 
				{
					const vUser = message.author;
					let vReconnaissance = pDiscordBot.Database.Reconnaissances.mGetReconnaissances(message.guild.id, vUser.id);
					if (!vReconnaissance) 
					{
						vReconnaissance = 
						{
							GuildID: message.guild.id,
							GuildName: message.guild.name,
							MemberID: vUser.id,
							MemberTag: vUser.tag,
							Points: 0,
							Level: 0
						};
					}
					let vParticipation = pDiscordBot.Database.Participations.mGetParticipations(message.guild.id, vUser.id);
					if (!vParticipation) 
					{
						vParticipation = 
						{
							GuildID: message.guild.id,
							GuildName: message.guild.name,
							MemberID: vUser.id,
							MemberTag: vUser.tag,
							Points: 0,
							Level: 0
						};
					}
					let vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
						.setColor(pDiscordBot.aConfig.Good)
						.setAuthor(
							pDiscordBot.aClient.user.username,
							pDiscordBot.aClient.user.displayAvatarURL(),
							pDiscordBot.aConfig.URL
						)
						.setTitle("Points de " + message.author.username)
						.setDescription(
							"Retrouvez le classement complet de nos membres [reconnaissances](" +
							pDiscordBot.mConfig().Reconnaissance +
							") et [participations](" +
							pDiscordBot.mConfig().Participation +
							") via internet."
						)
						.setThumbnail(message.author.displayAvatarURL())
						.addFields(
							{
							name: "*Points de reconnaissances actuels :*",
							value:
								vReconnaissance.Points +
								" points (Niv. " +
								Math.floor(Math.log2(vReconnaissance.Points) + 1) +
								")",
							inline: false
							},
							{
							name: "*Prochain Niveau (" + (Math.floor(Math.log2(vReconnaissance.Points) + 1) + 1) + ") :*",
							value:
								Math.pow(2, Math.floor(Math.log2(vReconnaissance.Points) + 1)) +
								" points.",
							inline: false
							},
							{
							name: "*Points de participations actuels :*",
							value:
								vParticipation.Points +
								" points (Niv. " +
								Math.floor(Math.log2(vParticipation.Points) + 1) +
								")",
							inline: false
							},
							{
							name: "*Prochain Niveau (" + (Math.floor(Math.log2(vParticipation.Points) + 1) + 1) + ") :*",
							value:
								Math.pow(2, (Math.floor(Math.log2(vParticipation.Points) + 1))) +
								" points.",
							inline: false
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
			)
			.catch
			(
				e => 
				{
					console.error(e);
					message.reply(e);
					message.delete();
					return;
				}
			);
	}
}

module.exports = new Points();
