const Command = require("../Command.js");
class Silence extends Command {
  constructor() {
    super(
      "silence",
      ["mute"],
      ["MUTE_MEMBERS"],
      2,
      1,
      0,
      0,
      "silence <@IDPersonne [@IDPersonne [...]] + Raison>",
      "Commande d'administration. Impose le silence à une ou plusieurs personnes.",
      true,
      0
    );
  }
  async mExecute(pDiscordBot, message, args) {
    super
      .mExecute(pDiscordBot, message, args)
      .then(() => {
        const vAuthor = message.author;
        const vLogsEmbed = new pDiscordBot.aDiscord.MessageEmbed()
          .setColor(pDiscordBot.aConfig.Bad)
          .setTitle("**Commande d'administration**")
          .setAuthor(
            pDiscordBot.aClient.user.username,
            pDiscordBot.aClient.user.displayAvatarURL(),
            pDiscordBot.aConfig.URL
          )
          .setThumbnail(message.author.displayAvatarURL())
          .setDescription(
            "L'utilisateur " +
              message.author +
              " à utilisé la commande " +
              "```" +
              `${message.content}` +
              "```" +
              ` dans le cannal ${message.channel}`
          );
        const vLogs = message.guild.channels.cache.find(
          vChannelFound => vChannelFound.name === "logs"
        );
        vLogs.send(vLogsEmbed);
        const vSysteme = message.guild.channels.cache.find(
          vChannelFound => vChannelFound.name === "system"
        );
        vSysteme.send(vLogsEmbed);
        message.mentions.members.forEach(async vMember => {
          const vMemberRole = message.guild.roles.cache.find(
            vRoleFound => vRoleFound.name === "Membre"
          );
          const vMutedRole = message.guild.roles.cache.find(
            vRoleFound => vRoleFound.name === "Muted"
          );
          const vNouveauRole = message.guild.roles.cache.find(
            vRoleFound => vRoleFound.name === "Nouveau"
          );
          vMember.roles.remove(vMemberRole.id, "Muted");
          vMember.roles.remove(vNouveauRole.id, "Muted");
          vMember.roles.add(vMutedRole.id, "Muted");
          message.guild.channels.cache.forEach(async (channel, id) => {
            const vHasMutedRole = await channel.permissionOverwrites.find(vPemissionOverrideFound=>vPemissionOverrideFound.id === vMutedRole.id);
            if (!vHasMutedRole) {
              await channel
                .createOverwrite(vMutedRole, {
                  READ_MESSAGE_HISTORY: true,
                  VIEW_CHANNEL: true
                })
                .then(
                  async channel => 
                    await console.log(
                      channel.name +
                        " : " +
                        (await channel.permissionOverwrites.get(vMutedRole.name))
                    )
                )
                .catch(async e => {
                  await console.error(e.stack);
                  return;
                });
            }
          });
          let vArgs = message.content.split(" ");
          vArgs.shift();
          const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
            .setColor(pDiscordBot.aConfig.Bad)
            .setTitle("**⚡🔨SILENCE🔨⚡**")
            .setAuthor(vAuthor.username, vAuthor.displayAvatarURL())
            .setImage(pDiscordBot.aConfig.ShutUp)
            .setThumbnail(vMember.user.displayAvatarURL())
            .setDescription(
              `${vAuthor}` +
                " à rendu muet " +
                `${vMember.user}` +
                ' pour la raison "' +
                vArgs.join(" ") +
                '".'
            );
          vMember.send(vEmbed);
          message.channel.send(vEmbed);
        });
        message.delete();
      })
      .catch(e => {
        console.error(e);
        message.reply(e);
        message.delete();
        return;
      });
  }
}

module.exports = new Silence();
