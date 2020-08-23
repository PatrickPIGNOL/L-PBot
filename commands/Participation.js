const Command = require("../Command.js");
class Reconnaissance extends Command {
	constructor() 
	{
		super
		(
			"participation",
			["part"],
			["ADMINISTRATOR"],
			2,
			1,
			0,
			0,
			"Participation <[+|-]int> @IDPersonne[ @IDPersonne[ ...]]",
			"Donne ou enlève des points de reconnaissances à une ou plusieurs personnes",
			true,
			0
		);
	}
	mExecute(pDiscordBot, message, args) 
	{
		super.mExecute(pDiscordBot, message, args)
			.then(() => 
			{
				const vMember = message.mentions.members.first();
				const vArgs = message.content.split(/ +/);
				if (isNaN(args[0])) 
				{
					const vReply = new pDiscordBot.aDiscord.MessageEmbed()
						.setTitle("**Erreur**")
						.setColor(pDiscordBot.aConfig.Bad)
						.setAuthor
						(
							pDiscordBot.aClient.user.username,
							pDiscordBot.aClient.user.displayAvatarURL(),
							pDiscordBot.aConfig.URL
						)
						.setDescription("Vous devez donner un nombre de points valide.");
					message.reply(vReply);
					message.delete();
					return;
				}
				const vPoints = parseInt(vArgs[1]);
				message.mentions.members.forEach(vMember => 
				{
					let vUser = vMember.user;
					let vParticipation = pDiscordBot
						.mSQL()
						.getParticipations.get(message.guild.id, vUser.id);
					if (!vParticipation) 
					{
						vParticipation = {
						GuildID: message.guild.id,
						GuildName: message.guild.name,
						MemberID: vUser.id,
						MemberTag: vUser.tag,
						Points: 0,
						Level: 1
						};
					}
					else
					{
						vParticipation.MemberTag = vUser.tag;
					}
					vParticipation.GuildName = message.guild.name;
					let vColor;
					if (vPoints < 0) 
					{
						vColor = pDiscordBot.aConfig.Bad;
					}
					else
					{
						vColor = pDiscordBot.aConfig.Good;
					}
					vParticipation.Points += vPoints;
					let vMessage = `${message.author} a donné à ${vMember} ${vPoints} point de Participation soit un total de ${vParticipation.Points}.\n`;
					const vLevel = Math.floor(Math.sqrt(vParticipation.Points));
					if (vParticipation.Level != vLevel) 
					{
						vMessage += `${vUser} est passé au niveau ${vLevel}.\n`;
						if (vParticipation.Level < vLevel) 
						{
							vMessage += `:tada::confetti_ball: Félicitations ! :confetti_ball::tada:\n`;
						} 
						else
						{
							vMessage += `:sob::scream: Vous avez été rétrogradé ! :scream::sob:\n`;
						}
					}
					vParticipation.Level = vLevel;
					pDiscordBot.aSQL.setParticipations.run(vParticipation);
					const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
						.setColor(vColor)
						.setAuthor
						(
							pDiscordBot.aClient.user.username,
							pDiscordBot.aClient.user.displayAvatarURL(),
							pDiscordBot.aConfig.URL
						)
						.setTitle("**Modification des points de participations**")
						.setThumbnail(vUser.displayAvatarURL())
						.setDescription(vMessage);
					message.channel.send(vEmbed);
				});
				message.delete();
			})
			.catch(e => 
			{
				console.error(e);
				message.reply(e);
				message.delete();
				return;
			});
	}
}

module.exports = new Reconnaissance();
