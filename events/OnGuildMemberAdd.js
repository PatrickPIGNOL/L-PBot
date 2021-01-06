const OnEvent = require("../OnEvent.js");
class OnGuildMemberAdd extends OnEvent 
{
	constructor() 
	{
		super("guildMemberAdd");
	}

	async mExecute(pDiscordBot, ...args) 
	{
		const member = args[0];
		await this.mOnGuildMemberAdd(pDiscordBot, member);
	}

	async mOnGuildMemberAdd(pDiscordBot, member) 
	{
		if (member.user.bot) 
		{
			const vBotAutoroles = pDiscordBot
				.mSQL()
				.Database.Autoroles.mGetAutoroles(member.guild.id, "bot");
			if (vBotAutoroles) 
			{
				vBotAutoroles.forEach(vBotAutorole => 
				{
					const vBotRole = member.guild.roles.cache.find(
						vRoleFound => vRoleFound.id === vBotAutorole.RoleID
					);
					if (vBotRole) 
					{
						member.roles.add(vBotRole, "autorole onGuildMemberAdd");
					}
				});
			}
		}
		else
		{
			const vUserAutoroles = pDiscordBot
				.mSQL()
				.Database.Autoroles.mGetAutoroles(member.guild.id, "user");
			if (vUserAutoroles) 
			{
				vUserAutoroles.forEach(vUserAutorole => 
				{
					const vUserRole = member.guild.roles.cache.find(
						vRoleFound => vRoleFound.id === vUserAutorole.RoleID
					);
					if (vUserRole) 
					{
						member.roles.add(vUserRole, "autorole onGuildMemberAdd");
					}
				});
			}
		}

		const vUser = member.user;
		const vGuild = member.guild;
		const vCache = vGuild.channels.cache;
        const vChannels = vGuild.channels;
        const vLogs = vChannels.resolve("701309571292987457");
		//const vLogs = vCache.find(vChannelFound => vChannelFound.name === "logs");
        const vSystem = vChannels.resolve("697190165034041434");
		/*
        const vSystem = vCache.find(
			vChannelFound => vChannelFound.name === "system"
		);
        */
        const vAccueil = vChannels.resolve("641367048412463138");
		/*
        const vAccueil = vCache.find(
			vChannelFound => vChannelFound.name === "🤝accueil-et-départs"
		);
        */
        const vReglement = vChannels.resolve("683937090425192467");
        /*
		const vReglement = vCache.find(
			vChannelFound => vChannelFound.name === "🗹règlement"
		);
        */
        const vRoles = vChannels.resolve("683943564534743073");
		//const vRoles = vCache.find(vChannelFound => vChannelFound.name === "🎭rôles");
		const vBlabla = vChannels.resolve("641370649771769907");
        /*
        const vBlabla = vCache.find(
			vChannelFound => vChannelFound.name === "😃bla-bla-bla"
		);
        */
        const vFaq = vChannels.resolve("689848376891539459");
		//const vFaq = vCache.find(vChannelFound => vChannelFound.id === "689848376891539459");
		// Send the message, mentioning the member
		const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
			.setAuthor(
				pDiscordBot.aClient.user.username,
				pDiscordBot.aClient.user.displayAvatarURL(),
				pDiscordBot.aConfig.URL
			)
			.setColor(pDiscordBot.aConfig.Good)
			.setDescription(`Nouvel arrivant sur le serveur : ${vUser}.`)
			.setThumbnail(vUser.displayAvatarURL());
			//vGuild.owner.send(vEmbed);
		if (!vLogs) 
		{
			console.error('channel "logs" not found');
			return;
		}
		vLogs.send(vEmbed);

		if (!vSystem) 
		{
			console.error('channel "system" not found');
			return;
    	}
		vSystem.send(vEmbed);
		if (!vAccueil) 
		{
			console.error('channel "🤝accueil-et-départs" not found');
			return;
		}
		if (!vReglement) 
		{
			console.error('channel "🗹règlement" not found');
			return;
		}
		if (!vRoles) 
		{
			console.error('channel "🎭rôles" not found');
			return;
		}
		if (!vBlabla) 
		{
			console.error('channel "😃bla-bla-bla" not found');
			return;
		}
		if (!vFaq) 
		{
			console.error('channel "❓faq" not found');
			return;
		}
		const vNewcomer = new pDiscordBot.aDiscord.MessageEmbed()
			.setAuthor(
				vGuild.owner.user.username,
				vGuild.owner.user.displayAvatarURL()
			)
			.setColor(pDiscordBot.aConfig.Good)
			.setDescription(
				`Bienvenu à toi, ${vUser}.\n1/ Valide le règlement dans ${vReglement} svp. Tu aura alors accès à tous les salons du serveur.\n2/ Puis attribue toi des rôles dans ${vRoles}.\n3/ Enfin dis "Bonjour" dans ${vBlabla}.\nSi tu ne sais pas où aller, la ${vFaq} te guidera.`
			)
			.setThumbnail(vUser.displayAvatarURL());
		vAccueil.send
		(
			{content: `${vUser}`, embed: vNewcomer}
		);
	}
}

module.exports = new OnGuildMemberAdd();
