const Command = require("../Command.js");
class Bienvenue extends Command 
{
    constructor() 
    {
        super
        (
            "bienvenue",
            ["welcome"],
            [
                "ADMINISTRATOR" // (implicitly has all permissions, and bypasses all channel overwrites)
            ],
            0,
            1,
            0,
            0,
            "bienvenue @IDPersonne [@IDPersonne2 [...]]",
            "Permet de souhaiter la bienvenue à une ou plusieurs personne si le système ne l'a pas fait.",
            true,
            0
        );
    }
    mExecute(pDiscordBot, message, args) 
    {
        super
            .mExecute(pDiscordBot, message, args)
            .then
            (
                () => 
                {
                    const vMember = message.mentions.members.size;
                    if (this.mMemberMentions() > vMember) 
                    {
                        const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
                            .setAuthor
                            (
                                pDiscordBot.aClient.user.username,
                                pDiscordBot.aClient.user.displayAvatarURL(),
                                pDiscordBot.aConfig.URL
                            )
                            .setTitle("**Erreur**")
                            .setColor(pDiscordBot.aConfig.Bad)
                            .setThumbnail(vMember.user.displayAvatarURL());
                        message.reply("Vous devez mentionner un membre.");
                        message.delete();
                        return;
                    }
                    if (message.author !== message.guild.owner.user) 
                    {
                        message.reply
                        (
                            "Vous n'avez pas la permission d'executer cette commande"
                        );
                        message.delete();
                        return;
                    }
                    const member = message.mentions.members.forEach
                    (
                        member => 
                        {
                            console.log("bienvenue : " +member.user.tag)
                            const vOnGuildMemeberAdd = require("../events/OnGuildMemberAdd.js");
                            vOnGuildMemeberAdd.mExecute(pDiscordBot, member);
                        }
                    );
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

module.exports = new Bienvenue();
