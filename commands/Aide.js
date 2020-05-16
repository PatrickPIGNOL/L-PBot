const Command = require("../Command.js");
class Aide extends Command {
  constructor() {
    super(
      "aide",
      ["help"],
      [],
      0,
      0,
      "aide",
      "Affiche l'aide du bot et toutes ses commandes.",
      true,
      5
    );
  }
  mExecute(pDiscordBot, message, args) {
    super.mExecute(pDiscordBot, message, args);
    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setColor(pDiscordBot.aConfig.Good)
      .setTitle(`"**${pDiscordBot.aClient.user.username}** command panel"`)
      .setAuthor(
        `${pDiscordBot.aClient.user.username}`,
        `${pDiscordBot.aClient.user.displayAvatarURL()}`,
        pDiscordBot.aConfig.URL
      )
      .setDescription("Robot à tout faire...\n\n__**Liste des commandes :**__")
      .setThumbnail(`${pDiscordBot.aClient.user.displayAvatarURL()}`)
      .addFields(
        {
          name: "**Préfixe**",
          value:
            `${pDiscordBot.aConfig.Prefix}` +
            "\n*(tapez le préfixe devant une commande pour que le robot la prenne en compte)*.",
          inline: false
        },
        {
          name: "**help**",
          value: "Retourne la liste des commandes disponibles.",
          inline: false
        },
        {
          name: "**ping**",
          value: 'Répond : "pong".',
          inline: false
        },
        {
          name: "**points**",
          value:
            "Affiche votre solde de points de reconnaissance ainsi que vote progression.",
          inline: false
        },
        {
          name: "**boule8**",
          value:
            "Affiche une réponse ... aléatoire ?",
          inline: false
        },
        {
          name: "**De futures commandes sont à venir**",
          value: "Actuellement en création de nouvelles commandes utiles",
          inline: false
        } //info sur des prochaines commandes
      );
    message.author.send(vEmbed);
    message.delete();
  }
}

module.exports = new Aide();
