const Command = require("../Command.js");
class TopReco extends Command {
	constructor() 
	{
		super
		(
			"topreco",
			[],
			[
				"ADMINISTRATOR" // (implicitly has all permissions, and bypasses all channel overwrites)
			],
			0,
			0,
			0,
			0,
			"topreco",
			"Top 10 classement des points de reconnaissances.",
			true,
			0
		);
	}
	mExecute(pDiscordBot, message, args) {
		super
		.mExecute(pDiscordBot, message, args)
		.then(() => 
		{
			const top10 = pDiscordBot.mSQL().Database.Reconnaissances.mAllReconnaissances(message.guild.id);
			const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
				.setColor(pDiscordBot.aConfig.Good)
				.setTitle("Top 10 des points de reconnaissances")
				.setAuthor
				(
					pDiscordBot.aClient.user.username,
					pDiscordBot.aClient.user.displayAvatarURL(),
					pDiscordBot.aConfig.URL
				)
				.setDescription
				(
					`Retrouvez [le classement complet de nos membres](${pDiscordBot.aConfig.Reconnaissance}) via internet.`
				);

			console.log("message embed created");
			let vRank = 1;
			top10.forEach(vData => 
			{
				const vUserID = vData.MemberID;
				const vMember = message.guild.members.cache.find
				(
					vSearchMember => vSearchMember.user.id == vUserID
				);
				if (vMember) 
				{
					const vUser = vMember.user;

					vEmbed.addField
					(
						`#${vRank} - ${vData.Points} points (Niv. ${Math.floor(Math.log2(vData.Points)+1)})`,
						`@${vUser.tag}`
					);
					vRank++;
				}
				vData.GuildName = message.guild.name;
			});
			message.channel.send(vEmbed);
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

module.exports = new TopReco();
