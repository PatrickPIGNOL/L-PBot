const Command = require("../Command.js");
class Statistiques extends Command 
{
    constructor() 
    {
        super
        (
            "statistiques",
            ["stats"],
            ["ADMINISTRATOR"],
            0,
            0,
            0,
            0,
            "statistiques",
            "Affiche les statistiques du serveur ...",
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
            () => 
            {
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
                        if (vMemberFound.roles.cache.find(vRoleFound => vRoleFound === vRoleFeminin)) 
                        {
                            vFeminin++;
                        }
                        if (vMemberFound.roles.cache.find(vRoleFound => vRoleFound === vRoleMasculin)) 
                        {
                            vMasculin++;
                        }
                    }
                );
                const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
                .setAuthor(
                    pDiscordBot.aClient.user.username,
                    pDiscordBot.aClient.user.displayAvatarURL(),
                    pDiscordBot.aConfig.URL
                )
                .setTitle("📊Statistiques🗠")
                .setColor(pDiscordBot.aConfig.Good)
                .setDescription(`Statistique du serveur ${message.guild.name}`)
                .addFields(
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
                    value: `Nous avons ${vFeminin} membres ${vRoleFeminin} déclarés pour ${vMasculin} membres ${vRoleMasculin} déclarés soit un ratio de **${
                        Math.round((vFeminin * 100) / (vFeminin + vMasculin))
                    }% de membres ${vRoleFeminin} déclarés**.\n**Membres ${vRoleFeminin} n'hesitez pas à inviter vos amies, vous êtes les bienvenues :slight_smile:**`,
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

module.exports = new Statistiques();
