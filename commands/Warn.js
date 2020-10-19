const Command = require("../Command.js");
class Warn extends Command 
{
	constructor() 
	{
		super(
			"warn",
			[],
			[
				"ADMINISTRATOR"
			],
			2,
			1,
			"warn <@IDUtilisateur> <Raison>",
			"Warn l'utilisateur <@IDUtilisateur> pour la raison <Raison>.",
			true,
			0
		);
	}
	async mExecute(pDiscordBot, message, args) 
	{
		super.mExecute(pDiscordBot, message, args).then(() =>
        {
            const vAuthor = message.author;
            const vReason = args.join(" ");
            message.mentions.members.forEach(vMember => 
            {
                if (vMember !== message.guild.owner) 
                {
                    const vWarns = {      
                        GuildID:`${message.guild.id}`, 
                        GuildName:`${message.guild.name}`, 
                        MemberID: `${vMember.user.id}`,
                        MemberTag:`${vMember.user.tag}`,
                        ModeratorID: vAuthor.id,
                        ModeratorTag: vAuthor.tag,
                        Date: Date.now(),
                        Reason: vReason
                    };
                    pDiscordBot.mSQL().Database.Warns.mSetWarns(vWarns);
                    var vArgs = message.content.split(" ");
                    vArgs.shift();
                    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
                    .setColor(pDiscordBot.aConfig.Bad)
                    .setTitle("**⚠️WARN⚠️**")
                    .setAuthor(vAuthor.username, vAuthor.displayAvatarURL())
                    .setImage(pDiscordBot.aConfig.Two)
                    .setThumbnail(vMember.user.displayAvatarURL())
                    .setDescription(
                        `L'utilisateur ${vMember} à été Warn par le modérateur ${vAuthor} pour la raison : "${vReason}"`
                    );
                    message.channel.send(vEmbed);
                    vMember.user.send(vEmbed);
                }
            });
            const vSanctionsChannel = message.guild.channels.cache.find(vChannelFound => vChannelFound.name === pDiscordBot.Config.Parameters[message.guild.id]["SanctionsChannel"]);
            if(vSanctionsChannel)
            {
                vSanctionsChannel.send(vEmbed);
            }
            message.delete();

        }).catch(e => 
		{
			console.log(e);
			message.reply(e);
			message.delete();
			return; 
		});        
	}
}

module.exports = new Warn();
