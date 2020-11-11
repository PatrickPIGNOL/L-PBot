/*
"ADMINISTRATOR", // (implicitly has all permissions, and bypasses all channel overwrites)
"CREATE_INSTANT_INVITE", // (create invitations to the guild)
"KICK_MEMBERS",
"BAN_MEMBERS",
"MANAGE_CHANNELS",// (edit and reorder channels)
"MANAGE_GUILD",// (edit the guild information, region, etc.)
"ADD_REACTIONS",// (add new reactions to messages)
"VIEW_AUDIT_LOG",
"PRIORITY_SPEAKER",
"STREAM",
"VIEW_CHANNEL",
"SEND_MESSAGES",
"SEND_TTS_MESSAGES",
"MANAGE_MESSAGES",// (delete messages and reactions)
"EMBED_LINKS",// (links posted will have a preview embedded)
"ATTACH_FILES",
"READ_MESSAGE_HISTORY",// (view messages that were posted prior to opening Discord)
"MENTION_EVERYONE",
"USE_EXTERNAL_EMOJIS",// (use emojis from different guilds)
"VIEW_GUILD_INSIGHTS",
"CONNECT",// (connect to a voice channel)
"SPEAK",// (speak in a voice channel)
"MUTE_MEMBERS",// (mute members across all voice channels)
"DEAFEN_MEMBERS",// (deafen members across all voice channels)
"MOVE_MEMBERS",// (move members between voice channels)
"USE_VAD",// (use voice activity detection)
"CHANGE_NICKNAME",
"MANAGE_NICKNAMES",// (change other members' nicknames)
"MANAGE_ROLES",
"MANAGE_WEBHOOKS",
"MANAGE_EMOJIS"
*/

class Command 
{
	constructor
	(
		pName,
		pAliases,
		pPermissions,
		pArgs,
		pMemberMentions,
		pRoleMentions,
		pChannelMentions,
		pUsage,
		pDescription,
		pGuildOnly,
		pCooldown
	) 
	{
		this.aName = pName;
		this.aAliases = pAliases;
		this.aPermissions = pPermissions;
		this.aArgs = pArgs;
		this.aMemberMentions = pMemberMentions;
		this.aRoleMentions = pRoleMentions;
		this.aChannelMentions = pChannelMentions;
		this.aUsage = pUsage;
		this.aDescription = pDescription;
		this.aGuildOnly = pGuildOnly;
		this.aCooldown = pCooldown;
	}
	mName() 
	{
		return this.aName;
	}
	mAliases() 
	{
		return this.aAliases;
	}
	mPermissions() 
	{
		return this.aPermissions;
	}
	mHavePermission(pDiscordBot, pMessage) 
	{
		let vHavePermission = true;
		if (this.aPermissions && this.aPermissions.length) 
		{
			vHavePermission = false;
			const vMemberAuthor = pMessage.member;
			if (vMemberAuthor) 
			{
				for(const vPermissionFound of this.aPermissions) 
				{
					if (vMemberAuthor.hasPermission(vPermissionFound)) 
					{
						vHavePermission = true;            
						return vHavePermission;
					}
				}
			}
			else 
			{
				console.log("Erreur pas d'auteur pour le message");
				vHavePermission = false;
			}
		}
		return vHavePermission;
	}
	mArgs() 
	{
		return this.aArgs;
	}
	mMemberMentions() 
	{
		return this.aMentions;
	}
	mRoleMentions()
	{
		return this.aRoleMentions;
	}
	mChannelMentions()
	{
		return this.aChannelMentions;
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
	async mExecute(pDiscordBot, message, args) {
		if (!this.mHavePermission(pDiscordBot, message)) {
		const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
			.setAuthor(
			pDiscordBot.aClient.user.username,
			pDiscordBot.aClient.user.displayAvatarURL(),
			pDiscordBot.aConfig.URL
			)
			.setTitle("**Erreur**")
			.setColor(pDiscordBot.aConfig.Bad)
			.setThumbnail(message.author.displayAvatarURL())
			.setDescription(
			"Vous n'avez pas la permission d'executer cette commande."
			);
		throw vEmbed;
		}
        console.log("member mentions: "+this.aMemberMentions);
        console.log("member mentions: "+message.mentions.has(""));
        console.log("message users: " + message.mentions.users.size)
        console.log("message members: " + message.mentions.members.size)
        console.log("message user:\n"+message.mentions.users.first());
        console.log("message member:\n"+message.mentions.members.first());
		if (this.aMemberMentions <= message.mentions.users.size || this.aMemberMentions <= message.mentions.members.size) 
        {
            
        }
        else
		{
			const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
				.setAuthor(
				pDiscordBot.aClient.user.username,
				pDiscordBot.aClient.user.displayAvatarURL(),
				pDiscordBot.aConfig.URL
				)
				.setTitle("**Erreur**")
				.setColor(pDiscordBot.aConfig.Bad)
				.setThumbnail(message.author.displayAvatarURL())
				.setDescription(
				`Vous devez mentionner au moins ${this.aMemberMentions} membre(s).`
				);
			throw vEmbed;
		}
		if (this.aRoleMentions > message.mentions.roles.length) 
		{
			const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
				.setAuthor(
				pDiscordBot.aClient.user.username,
				pDiscordBot.aClient.user.displayAvatarURL(),
				pDiscordBot.aConfig.URL
				)
				.setTitle("**Erreur**")
				.setColor(pDiscordBot.aConfig.Bad)
				.setThumbnail(message.author.displayAvatarURL())
				.setDescription(
				`Vous devez mentionner au moins ${this.aRoleMentions} rôle(s).`
				);
			throw vEmbed;
		}
		if (this.aChannelMentions > message.mentions.channels.length) 
		{
			const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
				.setAuthor(
				pDiscordBot.aClient.user.username,
				pDiscordBot.aClient.user.displayAvatarURL(),
				pDiscordBot.aConfig.URL
				)
				.setTitle("**Erreur**")
				.setColor(pDiscordBot.aConfig.Bad)
				.setThumbnail(message.author.displayAvatarURL())
				.setDescription(
				`Vous devez mentionner au moins ${this.aChannelMentions} salon(s).`
				);
			throw vEmbed;
		}
		if (this.aArgs > args.length) 
		{
			const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
				.setAuthor(
				pDiscordBot.aClient.user.username,
				pDiscordBot.aClient.user.displayAvatarURL(),
				pDiscordBot.aConfig.URL
				)
				.setTitle("**Erreur**")
				.setColor(pDiscordBot.aConfig.Bad)
				.setThumbnail(message.author.displayAvatarURL())
				.setDescription(
				`Vous devez fournir au moins ${this.aArgs} paramètres !`
				);
			throw vEmbed;
		}
		if (this.aGuildOnly && message.channel.type !== "text") 
		{
			const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
				.setAuthor(
				pDiscordBot.aClient.user.username,
				pDiscordBot.aClient.user.displayAvatarURL(),
				pDiscordBot.aConfig.URL
				)
				.setTitle("**Erreur**")
				.setColor(pDiscordBot.aConfig.Bad)
				.setThumbnail(message.author.displayAvatarURL())
				.setDescription(
				"Je ne peux pas executer cette commande dans un cannal privé !"
				);
			throw vEmbed;
		}
	}
}

module.exports = Command;
