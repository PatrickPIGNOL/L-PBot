const Command = require("../Command.js");
class DiscordJS extends Command 
{
    constructor() 
    {
        super
        (
            "discordjs",
            ["djs"],
            [],
            1,
            0,
            0,
            0,
            "discordjs [<@IDUtilisateurCible>[...]] {[class NomClasse]|[<mots clés>]}", 
            "Affiche la page d'aide ou de recherche de discord.js.org pour la requête concernée",
            true,
            0
        );
    }
    
    async mExecute(pDiscordBot, message, args) 
    {
        super.mExecute(pDiscordBot, message, args)
            .then
            (
                () => 
                {
                    let vLink;
                    let vMembers = new Array();
                    if(message.mentions.members.size > 0)
                    {
                        message.mentions.members.forEach
                        (
                            vMember => 
                            {
                                vMembers.push(vMember);              
                                args.shift();
                            }
                        );
                    }
                    let vIntros = [
                        "Lire la documentation et trouver la réponse par sois-même est le meilleur moyen d'apprendre...\n",
                        "L'informatique c'est pas magique ... c'est de la recherche et de l'apprentissage avant tout...\n",
                        "Lorsque l'on se cogne la tête contre un pot et que cela sonne creux, ça n'est pas forcément le pot qui est vide...(confucius)\n",
                        "Notre plus grande gloire n'est point de tomber, mais de savoir nous relever chaque fois que nous tombons...(confucius)\n",
                        "Nulle pierre ne peut être polie sans friction, nul homme ne peut parfaire son expérience sans épreuve...(confucius)\n",
                        "L'homme de bien ne demande rien qu'à lui-même ; l'homme de peu demande tout aux autres...(confucius)\n",
                        "Quand un homme a faim, mieux vaut lui apprendre à pêcher que de lui donner un poisson...(confucius)\n",
                        "J'entends et j'oublie, Je vois et je me souviens, Je fais et je comprends...(confucius)\n",
                        "Celui qui aime à apprendre est bien près du savoir...(confucius)\n",
                        "Celui qui déplace la montagne, c'est celui qui commence à enlever les petites pierres...(confucius)\n",
                        "L'expérience est une bougie qui n'éclaire que celui qui la porte...(confucius)\n",
                        "Apprendre sans réfléchir est vain. Réfléchir sans apprendre est dangereux...(confucius)\n",
                        "On s'égare rarement en s'imposant soi-même des règles sévères...(confucius)\n",
                        "Je ne peux rien pour qui ne se pose pas de questions...(confucius)\n",
                        "L'ouvrier qui veut bien faire son travail doit commencer par aiguiser ses instruments...(confucius)\n",
                        "Qui comprend le nouveau en réchauffant l'ancien peut devenir un maître...(confucius)\n",
                        "Un grand homme est dur avec lui-même ; un petit homme est dur avec les autres...(confucius)\n",
                        "Toute l'obscurité du monde ne peut pas éteindre la lumière d'une bougie...(confucius)\n"
                    ];
                    const vIntrosRandom = Math.floor(Math.random() * vIntros.length);
                    let vMessage = vIntros[vIntrosRandom];
                    vMembers.forEach
                    (
                        vMember => 
                        {
                            vMessage += `${vMember}, `;
                        }
                    );
                    switch(vMembers.length)
                    {
                        case 0:
                        {
                            vMessage += "Tu veux bien ";
                        }break;
                        case 1:
                        {
                            vMessage += "tu veux bien ";
                        }break;
                        default:
                        {
                            vMessage += "vous voulez bien ";
                        }break;
                    }
                
                    if(args[0].toLowerCase() === "class")
                    {
                        args.shift();
                        vLink = `https://discord.js.org/#/docs/main/stable/class/${args.join(" ")}`;
                        vMessage += `regarder la documentation suivante :\n${vLink}`;
                    }
                    else
                    {
                        vLink = `https://discord.js.org/#/docs/main/stable/search?q=${args.join(" ")}`;          
                        vMessage += `exploiter la recherche suivante :\n${vLink}`;
                    }
                    vMessage += "\nD'avance, merci ..."
                    let vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
                        .setAuthor(
                            message.author.username,
                            message.author.displayAvatarURL()
                        )
                        .setTitle("DOCUMENTATION")
                        .setColor(pDiscordBot.aConfig.Good)
                        .setDescription(vMessage);  
                    if(vMembers.length === 1)
                    {          
                        vEmbed.setThumbnail(vMembers[0].user.displayAvatarURL());
                    }
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

module.exports = new DiscordJS();
