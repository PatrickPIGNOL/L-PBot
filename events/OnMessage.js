const OnEvent = require("../OnEvent.js");
class OnMessage extends OnEvent 
{
	constructor() 
	{
		super("message");
	}

	async mExecute(pDiscordBot, ...args) 
	{
		const message = args[0];
		await this.mOnMessage(pDiscordBot, message);
	}

	async mOnMessage(pDiscordBot, message)
	{
		console.log
		(
			"Nouveau message <" +
			message +
			"> de @" +
			message.author.tag +
			"(" +
			message.author.id +
			") dans #" +
			message.channel.name +
			' : "' +
			message.content +
			'";\n'
		);
        
		if (message.author.bot) 
		{
            this.mRaids(pDiscordBot, message);
			console.log("message is a bot message. Returning.");
			return;
		}

		if(message.mentions.has(pDiscordBot.mClient().user))
		{
			const vEmbed = new pDiscordBot.Discord.MessageEmbed()
				.setAuthor
				(
					pDiscordBot.aClient.user.username,
					pDiscordBot.aClient.user.displayAvatarURL(),
					pDiscordBot.aConfig.URL
				)
				.setColor(pDiscordBot.aConfig.Good)
				.setTitle(`Bonjour`)
				.setDescription(`Bonjour à toi ${message.author}.\nTu ne sais pas comment m'appeler ? C'est pourtant simple...\nMon préfixe est : **${pDiscordBot.mConfig().Prefix}**\nPour avoir la liste des commandes disponibles il faut donc que tu tape "**${pDiscordBot.mConfig().Prefix}aide**".\nVoila c'est pas plus compliqué que ça...`)
				.setThumbnail(message.author.displayAvatarURL());
			message.reply(vEmbed);
			message.delete();       
			return;
		}
		this.mRemerciements(pDiscordBot, message);

		if (!message.content.startsWith(pDiscordBot.aConfig.Prefix)) 
		{
			this.mRaids(pDiscordBot, message);
			this.mParticipation(pDiscordBot, message);
			console.log("message is not a command. Returning.");
			return;
		}

		const vArgs = message.content.slice(pDiscordBot.aConfig.Prefix.length).split(/ +/);
    
   		const vCommandName = vArgs.shift().toLowerCase();

		const vCommand = pDiscordBot.aClient.commands.get(vCommandName) || pDiscordBot.aClient.commands.find
		(
			vCommandFound =>
			vCommandFound.mAliases() &&
			vCommandFound.mAliases().includes(vCommandName)
		);

		if (vCommand) 
		{
			vCommand.mExecute(pDiscordBot, message, vArgs);
		}
  	}

	mRaids(pDiscordBot, message)
	{ 
		if(message.guild)
		{
			let vRaid = pDiscordBot.mSQL().Database.Raids.mGetRaids(message.guild.id, message.author.id, message.content);
			if(!vRaid)
			{
				vRaid = 
                {
                    GuildID : message.guild.id,
                    GuildName : message.guild.name,
                    MemberID : message.author.id,
                    MemberTag : message.author.tag,
                    Message : message.content,
                    Number : 0, 
                    Date : Date.now()
				}
			}
			if(Date.now() - vRaid.Date < 300000)
			{          
				vRaid.Number++;
			}        
			else
			{
				vRaid.Number = 1;
			}
			vRaid.Date = Date.now();
			pDiscordBot.mSQL().Database.Raids.mSetRaids(vRaid);
			if(vRaid.Number > 4)
			{ 
                if(message.author.id !== message.guild.owner.user.id)
				{
                    if(message.author.id !== pDiscordBot.mClient().user.id)
                    {
                        if(message.member)
                        {
                            console.log(`attempt to ban ${message.member.user.tag}`);
                            message.member.ban({days: 1, reason: "Auto-Ban : Raider detected."})
                                .catch
                                (
                                    err=>
                                    {
                                        console.log(err);
                                    }
                                );
                        }
                        else
                        {            
                            const vMember = message.guild.members.fetch(message.author.id);
                            if(vMember)
                            {
                                console.log(`attempt to ban ${vMember.user.tag}`);
                                vMember.ban({days: 1, reason: "Auto-Ban : Raider detected"})
                                    .catch
                                    (
                                        err=>
                                        {
                                            console.log(err);
                                        }
                                    );
                            }
                        }
                    }
				}
			}
			const vRaids = pDiscordBot.mSQL().Database.Raids.mGetAllRaids(message.guild.id);
			vRaids.forEach
            (
                vData => 
                {
                    if(Date.now() - vData.Date > 300000)
                    {
                        pDiscordBot.mSQL().Database.Raids.mDelRaids(vData.rowid);
                    }
                }
            );
    	}
 	}
  
	mParticipation(pDiscordBot, message)
	{
		let vParticipation;
		if (message.guild) 
		{
			vParticipation = pDiscordBot.mSQL().Database.Participations.mGetParticipations
            (
				message.guild.id,
				message.author.id
			);
			if (!vParticipation) 
			{
				vParticipation = 
                {
				    GuildID: message.guild.id,
				    GuildName: message.guild.name,
				    MemberID: message.author.id,
				    MemberTag: message.author.tag,
				    Points: 0,
				    Level: 0
				};
			}
			vParticipation.Points++;
			const vLevel = Math.floor(Math.log2(vParticipation.Points)+1);
			if (vParticipation.Level < vLevel) 
			{
				vParticipation.Level = vLevel;
				let vMessage = `${message.author} à un total de ${vParticipation.Points} points de Participation et est passé au niveau de participation supérieur soit le niveau ${vParticipation.Level} .\n:tada::confetti_ball: Félicitations ! :confetti_ball::tada:\n`;
				const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
					.setColor(pDiscordBot.aConfig.Good)
					.setTitle("**Participation**")
					.setAuthor
                    (
						pDiscordBot.mClient().user.username,
						pDiscordBot.mClient().user.displayAvatarURL(),
						pDiscordBot.mConfig().URL
					)
					.setDescription(vMessage)
					.setThumbnail(message.author.displayAvatarURL());
				message.channel.send(vEmbed);
			}     
      		pDiscordBot.mSQL().Database.Participations.mSetParticipations(vParticipation);
            this.mActualizeClassment(pDiscordBot, message);
        }
	}
  
    mRemerciements(pDiscordBot, message) 
    {
        const vArgs = message.content.split(/ +/);
        vArgs.forEach
        (
            vArg => 
            {
                const vWord = vArg.toLowerCase();
                if 
                (
                    vWord.includes("merci")
                    ||
                    vWord.includes("thank")
                    ||
                    vWord.includes("thx")
                    ||
                    vWord.includes("gracia")
                ) 
                {
                    message.mentions.members.forEach
                    (
                        vMember => 
                        {
                            const vUser = vMember.user;       
                            if (message.author !== vUser) 
                            {
                                let vReconnaissance;
                                if (message.guild) 
                                {
                                    vReconnaissance = pDiscordBot.mSQL().Database.Reconnaissances.mGetReconnaissances(
                                        message.guild.id,
                                        vUser.id
                                    );
                                    if (!vReconnaissance) 
                                    {
                                        vReconnaissance = {
                                            GuildID: message.guild.id,
                                            GuildName: message.guild.name,
                                            MemberID: vUser.id,
                                            MemberTag: vUser.tag,
                                            Points: 0,
                                            Level: 0
                                        };
                                    }
                                    vReconnaissance.Points++;
                                    var vMessage = `${message.author} a donné à ${vUser} +1 point de Reconnaissance soit un total de ${vReconnaissance.Points}.\n`;
                                    const vLevel = Math.floor(Math.log2(vReconnaissance.Points)+1);
                                    if (vReconnaissance.Level < vLevel) 
                                    {
                                        vReconnaissance.Level = vLevel;
                                        vMessage += `${vUser} est passé au niveau supérieur soit le niveau ${vReconnaissance.Level}.\n:tada::confetti_ball: Félicitations ! :confetti_ball::tada:\n`;
                                    }
                                    pDiscordBot.mSQL().Database.Reconnaissances.mSetReconnaissances(vReconnaissance);
                                    this.mActualizeClassment(pDiscordBot, message);
                                    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
                                        .setColor(pDiscordBot.aConfig.Good)
                                        .setTitle("**Reconnaissance**")
                                        .setAuthor(
                                            message.author.username,
                                            message.author.displayAvatarURL()
                                        )
                                        .setDescription(vMessage)
                                        .setThumbnail(vUser.displayAvatarURL());
                                    message.channel.send(vEmbed);
                                }
                            }          
                        }
                    );
                }
            }
        );
    }

    mActualizeClassment(pDiscordBot, message)
    {
        const vChannel = message.guild.channels.cache.find
        (
            ChannelFound => ChannelFound.id === "692550920399093870"
        );
        
		vChannel.bulkDelete(50);
		let vOnlineMembers = 0;
		let vFeminin = 0;
		let vMasculin = 0;
		const vRoleFeminin = message.guild.roles.cache.find
		(
			vRoleFound => vRoleFound.name === "Feminin"
		);
		const vRoleMasculin = message.guild.roles.cache.find
		(
			vRoleFound => vRoleFound.name === "Masculin"
		);
		message.guild.members.cache.forEach
		(
			vMemberFound => 
			{
				if (vMemberFound.presence.status !== "offline") 
				{
					vOnlineMembers++;
				}
				if 
				(
					vMemberFound.roles.cache.find
					(
						vRoleFound => 
						vRoleFound === vRoleFeminin
					)
				) 
				{
					vFeminin++;
				}
				if 
				(
					vMemberFound.roles.cache.find
					(
						vRoleFound => 
						vRoleFound === vRoleMasculin
					)
				) 
				{
					vMasculin++;
				}
			}
		);
		const vStatsEmbed = new pDiscordBot.aDiscord.MessageEmbed()
			.setAuthor
			(
				pDiscordBot.aClient.user.username,
				pDiscordBot.aClient.user.displayAvatarURL(),
				pDiscordBot.aConfig.URL
			)
			.setTitle("📊Statistiques🗠")
			.setColor(pDiscordBot.aConfig.Good)
			.setDescription(`Statistique du serveur ${message.guild.name}`)
			.addFields
			(
				{
					name: "**Propriétaire**",
					value: `${message.guild.owner}`,
					inline: false
				},
				{
					name: "**Utilisateurs Online**",
					value: `${vOnlineMembers}`,
					inline: true
				},
				{
					name: "**Utilisateurs Total**",
					value: `${message.guild.memberCount}`,
					inline: true
				},
				{
					name: "**Proportions des Genres**",
					value: `Nous avons ${vFeminin} membres ${vRoleFeminin} déclarés pour ${vMasculin} membres ${vRoleMasculin} déclarés soit un ratio de **${ Math.round((vFeminin * 100) / (vFeminin + vMasculin)) }% de membres ${vRoleFeminin} déclarés**.\n**Membres ${vRoleFeminin} n'hesitez pas à inviter vos amies, vous êtes les bienvenues :slight_smile:**`,
					inline: false
				}
			);
		vChannel.send(vStatsEmbed)
			.catch
			(
				err=>
				{
					console.log(err);
				}
			);
		
		const topreco10 = pDiscordBot.mSQL().Database.Reconnaissances.mAllReconnaissances(message.guild.id);
		const vTopRecoEmbed = new pDiscordBot.aDiscord.MessageEmbed()
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
		let vRankReco = 1;
		topreco10.forEach
		(
			vData => 
			{
				const vUserID = vData.MemberID;
				const vMember = message.guild.members.cache.find
				(
					vSearchMember => vSearchMember.user.id == vUserID
				);
				if (vMember) 
				{
					const vUser = vMember.user;

					vTopRecoEmbed.addField
					(
						`#${vRankReco} - ${vData.Points} points (Niv. ${Math.floor(Math.log2(vData.Points))})`,
						`@${vUser.tag}`
					);
					vRankReco++;
				}
				vData.GuildName = message.guild.name;
			}
		);
		vChannel.send(vTopRecoEmbed)
		.catch
		(
			err=>
			{
				console.log(err);
			}
		);

		const toppart10 = pDiscordBot.mSQL().Database.Participations.mAllParticipations(message.guild.id);
		const vTopPartEmbed = new pDiscordBot.aDiscord.MessageEmbed()
			.setColor(pDiscordBot.aConfig.Good)
			.setTitle("Top 10 des points de participation")
			.setAuthor
			(
				pDiscordBot.aClient.user.username,
				pDiscordBot.aClient.user.displayAvatarURL(),
				pDiscordBot.aConfig.URL
			)
			.setDescription
			(
				`Retrouvez [le classement complet de nos membres](${pDiscordBot.aConfig.Participation}) via internet.`
			);

		let vRankPart = 1;
		toppart10.forEach
		(
			vData => 
			{
				const vUserID = vData.MemberID;
				const vMember = message.guild.members.cache.find
				(
					vSearchMember => vSearchMember.user.id == vUserID
				);
				if (vMember) 
				{
					const vUser = vMember.user;

					vTopPartEmbed.addField
					(
						`#${vRankPart} - ${vData.Points} points (Niv. ${Math.floor(Math.log2(vData.Points))})`,
						`@${vUser.tag}`
					);
					vRankPart++;
				}
				vData.GuildName = message.guild.name;
			}
		);        
		vChannel.send(vTopPartEmbed)
			.catch
			(
				err=>
				{
					console.error(err);
				}
			);
    }
}

module.exports = new OnMessage();
