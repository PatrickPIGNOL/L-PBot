
class OnGuildMemberAdd
{
  constructor()
  {
    this.aEventName = "guildMemberAdd";
  }
  mEventName()
  {
    return this.aEventName;
  }
  async mExecute(pDiscordBot, ...args)
  {
    const member = args[0];
    const vUser = member.user;
    const vGuild = member.guild;
    const vCache = vGuild.channels.cache;
    const vLogs = vCache.find(vChannelFound => vChannelFound.name === "logs");
    const vSystem = vCache.find(
      vChannelFound => vChannelFound.name === "system"
    );
    const vAccueil = vCache.find(
      vChannelFound => vChannelFound.name === "accueil-et-départs"
    );
    const vReglement = vCache.find(
      vChannelFound => vChannelFound.name === "règlement"
    );
    const vRoles = vCache.find(vChannelFound => vChannelFound.name === "rôles");
    const vBlabla = vCache.find(
      vChannelFound => vChannelFound.name === "bla-bla-bla"
    );
    const vFaq = vCache.find(vChannelFound => vChannelFound.name === "faq");
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
    // Do nothing if the channel wasn't found on this server
    if (!vLogs) {
      console.error('channel "logs" not found');
      return;
    }
    vLogs.send(vEmbed);

    if (!vSystem) {
      console.error('channel "system" not found');
      return;
    }
    vSystem.send(vEmbed);
    if (!vAccueil) {
      console.error('channel "accueil-et-départs" not found');
      return;
    }
    if (!vReglement) {
      console.error('channel "règlement" not found');
      return;
    }
    if (!vRoles) {
      console.error('channel "rôles" not found');
      return;
    }
    if (!vBlabla) {
      console.error('channel "faq" not found');
      return;
    }
    if (!vFaq) {
      console.error('channel "bla-bla-bla" not found');
      return;
    }
    const vNewcomer = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        vGuild.owner.user.username,
        vGuild.owner.user.displayAvatarURL()
      )
      .setColor(pDiscordBot.aConfig.Good)
      .setDescription(
        `Bienvenu à toi, ${vUser}.\nValide le règlement dans ${vReglement} svp.\nPuis attribue toi des rôles dans ${vRoles}.\nEnfin dis "Bonjour" dans ${vBlabla}.\nSi tu ne sais pas où aller, la ${vFaq} te guidera.`
      )
      .setThumbnail(vUser.displayAvatarURL());

    vAccueil.send({
      content: `${vUser}`,
      embed: vNewcomer
    });
  }
}

module.exports = new OnGuildMemberAdd();