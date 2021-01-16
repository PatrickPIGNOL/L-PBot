const Command = require("../Command.js");

class ReactRole extends Command 
{
    constructor() 
    {
        super
        (
            "reactrole",
            ["reactroles", "react"],
            ["ADMINISTRATOR"],
            1,
            0,
            0,
            0,
            "reactrole {list} | {add MessageID <emoji> @Role} | {remove MessageID <emoji>} | {delete MessageID}",
            "Commande pour lister, ajouter ou retirer des roles attribués par réaction à un message.",
            true,
            0
        );
    }
    async mExecute(pDiscordBot, message, args) 
    {
        super
            .mExecute(pDiscordBot, message, args)
            .then
            (
                async () => 
                {
                    let vTitle = ""
                    let vDescription = "";
                    const vCommand = args.shift();
                    console.log(vCommand)
                    if(vCommand.toLowerCase() === "list")
                    {
                        vTitle = "**Liste des ReactRoles**";
                        vDescription += "**Liste des roles attribués aux réactions :**\n";
                        const vValues = pDiscordBot.mSQL().Database.ReactRoles.mSelectAllIDGuild(message.guild.id);
                        if(vValues && vValues.length > 0)
                        {
                            console.log(vValues)
                            for(let vIndex = 0; vIndex < vValues.length; vIndex++)
                            {
                                const vValue = vValues[vIndex];
                                const vChannel = message.guild.channels.resolve(vValue.ChannelID);
                                const vEmoji = vValue.Emoji;
                                const vRole = message.guild.roles.resolve(vValue.RoleID);
                                let vMessage = null;
                                if
                                (
                                    ! 
                                    (
                                        vMessage = vChannel.messages.cache.find
                                        (
                                            vMessageFound => vMessageFound.id === vValue.MessageID
                                        )
                                    )
                                )
                                {
                                    await vChannel.messages.fetch(vValue.MessageID, true, true)
                                        .then
                                        (
                                            vMessageFound=>
                                            {
                                                vMessage = vMessageFound;
                                            }
                                        )
                                        .catch(e=>{console.error(e)});
                                }
                                console.log(vMessage);
                                vDescription += `Channel: ${vChannel}, Message: ${vMessage.url}, Emoji: ${vEmoji} => ${vRole}\n`;
                            }
                        }
                        else
                        {
                            vDescription += `*Aucun enregistrement*\n`;
                        }
                    }
                    else if(vCommand.toLowerCase() === "add")
                    {
						/*
                        if(message.mentions.roles.size === 0)
                        {
                            vTitle = "**ERREUR**"
                            vDescription = "Vous devez mentionner au moins un Role"
                            const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
                                .setAuthor(
                                    pDiscordBot.aClient.user.username,
                                    pDiscordBot.aClient.user.displayAvatarURL(),
                                    pDiscordBot.aConfig.URL
                                )
                                .setTitle(vTitle)
                                .setColor(pDiscordBot.aConfig.Bad)
                                .setDescription(vDescription)
                                .setThumbnail(message.author.displayAvatarURL());
                            message.reply(vEmbed);
                            message.delete();
                            return;
                        }
                        const vMessageID = args.shift().trim();
                        let vMessage = null;
                        if
                        (
                            ! 
                            (
                                vMessage = message.channel.messages.cache.find
                                (
                                    vMessageFound => vMessageFound.id === vMessageID
                                )
                            )
                        )
                        {
                            await message.channel.messages.fetch(vMessageID, true, true)
                                .then
                                (
                                    vMessageFound=>
                                    {
                                        vMessage = vMessageFound;
                                    }
                                )
                                .catch(e=>console.error);
                        }                        
                        if(!vMessage)
                        {
                            vTitle = "**ERREUR**";
                            vDescription = `Le message ${vMessageID} est introuvable`;
                            const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
                                .setAuthor(
                                    pDiscordBot.aClient.user.username,
                                    pDiscordBot.aClient.user.displayAvatarURL(),
                                    pDiscordBot.aConfig.URL
                                )
                                .setTitle(vTitle)
                                .setColor(pDiscordBot.aConfig.Bad)
                                .setDescription(vDescription)
                                .setThumbnail(message.author.displayAvatarURL());
                            message.reply(vEmbed);
                            message.delete();
                            return;
                        }
                        vTitle = "**Ajout d'un Role-Reaction**"
                        const vEmoji = args.shift();
                        const vRoles = message.mentions.roles;
                        vRoles.forEach
                        (
                            vRoleFound=>
                            {
                                console.log(vRoleFound);                      
                                const vValues =
                                {
                                    GuildID: message.guild.id,
                                    GuildName: message.guild.name,
                                    ChannelID: message.channel.id,
                                    ChannelName: message.channel.name,
                                    MessageID: vMessage.id,
                                    Emoji: vEmoji,
                                    RoleID: vRoleFound.id,
                                    RoleName: vRoleFound.name
                                }
                                vDescription += `Ajout : \n\tChannel: ${message.channel}, message : ${message.url}, emoji : ${vEmoji}, role : ${vRoleFound}\n`;
                                pDiscordBot.mSQL().Database.ReactRoles.mInsert(vValues);

                                const vReactioRole = vMessage.createReactionCollector
                                (
                                    (reaction, user)=> reaction.emoji === vEmoji,
                                    { dispose: true }
                                );
                                vReactioRole.on
                                (
                                    'collect', 
                                    (reaction, user) => 
                                    {
                                        console.log("collect !");
                                        let vMember = null
                                        if
                                        (
                                            !
                                            (vMember = reaction.message.guild.members.resolve(user.id))
                                        )
                                        {
                                            reaction.message.guild.members.fetch(user.id, true, true)
                                                .then
                                                (
                                                    vMemberFound=>
                                                    {
                                                        vMember = vMemberFound
                                                    }
                                                )
                                        }
                                        if(!vMemberFound)
                                        {
                                            return;
                                        }
                                        const vReactions = pDiscordBot.mSQL().Database.ReactRoles.mSelectAllIDMessageEmoji(reaction.message.id, reaction.emoji);
                                        vReactions.forEach
                                        (
                                            vReactionFound=>
                                            {
                                                let vRole = null;
                                                if(! (vRole = reaction.message.guild.roles.resolve(vReactionFound.RoleID)))
                                                {
                                                    reaction.guild.roles.fetch(vReactionFound.RoleID, true, true)
                                                        .then
                                                        (
                                                            vRoleFound=>
                                                            {
                                                                vRole = vRoleFound;
                                                            }
                                                        )
                                                }
                                                if(! vRole)
                                                {
                                                    console.log("role @"+vReactionFound.RoleName + " is not found on this server")
                                                    return;
                                                }
                                                console.log(vRole.name)
                                                vMember.roles.add(vRole);
                                            }
                                        )
                                        
                                    }
                                );
                            }
                        )
                        vMessage.react(vEmoji);
						*/
                    }
                    else if(vCommand.toLowerCase() === "remove")
                    {
                        
                    }
                    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
                        .setAuthor(
                            pDiscordBot.aClient.user.username,
                            pDiscordBot.aClient.user.displayAvatarURL(),
                            pDiscordBot.aConfig.URL
                        )
                        .setTitle(vTitle)
                        .setColor(pDiscordBot.aConfig.Good)
                        .setDescription(vDescription)
                        .setThumbnail(message.author.displayAvatarURL());
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

module.exports = new ReactRole();


/*
    const filter = m => m.content.includes('discord');
    const filter = (reaction, user) =>
    {
        return reaction.emoji.name === '👍' && user.id === message.author.id;
    };

    const collector = message.createReactionCollector(filter, { dispose: true });

    collector.on('collect', (reaction, user) => {
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    });

    collector.on('remove', (reaction, user) => {
        // Do something.
    });

    collector.on('dispose', (reaction, user) => {
        // Do something.
    });

    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });
*/