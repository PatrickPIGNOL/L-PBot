const fetch = require("node-fetch");
const OnEvent = require("../OnEvent.js");
class OnReady extends OnEvent {
  constructor() {
    super("ready");
  }

  async mExecute(pDiscordBot, ...args) {
    await this.mOnReady(pDiscordBot);
  }

  async mChange(pDiscordBot) {
    pDiscordBot.mClient().user.setStatus("online");
    const vActivityRandom = Math.floor(Math.random() * 3);
    const vActivity = ["PLAYING", "LISTENING", "WATCHING"];
    let vTextes;
    let vTextRandom;
    switch (vActivityRandom) {
      case 0:
        {
          vTextRandom = Math.floor(Math.random() * 5);
          vTextes = [
            "écrire son code source...",
            "éliminer ses bugs...",
            "créer de nouvelles fonctionalités...",
            "faire le café... ah non, il est pas prévu pour ça...",
            "bug#!&?₱~...",
            "passer le test de turring..."
          ];
        }
        break;
      case 1:
        {
          vTextRandom = Math.floor(Math.random() * 4);
          vTextes = [
            "je bug, je bug soir et matin, je bug sur http://glitch.com ...",
            "puisqu'on est jeune et con puisqu'ils sont vieux et fous...",
            "c'est dans l'air, c'est dans l'air, c'est dans l'air, c'est salutaire...",
            "libérée..., délivrée..., je ne mentirais plus jamais ..."
          ];
        }
        break;
      case 2:
        {
          vTextRandom = Math.floor(Math.random() * 9);
          vTextes = [
            "je suis clue... je vais créer le système parfait ...",
            "de la doc sur https://discord.js.org/...",
            "Wally...",
            "tu veux un petit clou ?",
            "cette année la récolte à été très mauvaise, alors il faut payer le double !",
            "je suis désolé,... je ne savais pas comment ça fonctionnais,... où est-ce que je vous le met ?",
            "c'est normal ! Les pauvre, c'est fait pour être très pauvre et les riches, très riches !",
            "je s'appelle groot !",
            "mon précieux ..."
          ];
        }
        break;
    }
    pDiscordBot.aClient.user.setActivity(vTextes[vTextRandom], {
      type: vActivity[vActivityRandom]
    });
  }

    async mOnReady(pDiscordBot) 
    {
        this.mChange(pDiscordBot);
        setInterval(() => {
            this.mChange(pDiscordBot);
        }, 900000);

        console.log(`${pDiscordBot.aClient.user.tag} - Je suis en ligne ...`);

        let vMembers = 0;
        let vChannels = 0;
        pDiscordBot.aClient.guilds.cache.forEach(vGuildFound => {
            vMembers += vGuildFound.members.cache.size;
            vChannels += vGuildFound.channels.cache.size;
        });

        console.log(
            `${vMembers} Members, in ${vChannels} channels of ${pDiscordBot.aClient.guilds.cache.size} guilds.`
        );
        
        pDiscordBot
            .mSQL()
            .prepare(
                "CREATE TABLE IF NOT EXISTS RoleGroup (GuildID TEXT, GuildName TEXT, GroupName TEXT, Mode TEXT, RequiredRoles TEXT, IgnoredRoles TEXT, Require1Role BOOLEAN, RemoveExistingOtherRoles BOOLEAN, MinimumRoles INTEGER, MaximumRoles Integer, PRIMARY KEY (GuildID, GroupName));"
            )
            .run();
        pDiscordBot
            .mSQL()
            .prepare(
                "CREATE TABLE IF NOT EXISTS RoleCommand (GuildID TEXT, GuildName TEXT, RoleGroupID INTEGER REFERENCES RoleGroup(rowid) ON UPDATE CASCADE ON DELETE CASCADE, CommandName TEXT, Role TEXT, PRIMARY KEY (GuildID, RoleGroupID, CommandName));"
            )
        .run();
        pDiscordBot
            .mSQL()
            .prepare(
                "CREATE TABLE IF NOT EXISTS RoleMenu (GuildID TEXT, GuildName TEXT, RoleGroupID INTEGER REFERENCES RoleGroup(rowid) ON UPDATE CASCADE ON DELETE CASCADE, MessageID TEXT, RemoveRole BOOLEAN, DMConfirmRole BOOLEAN, PRIMARY KEY (GuildID, MessageID));"
            )
            .run();
        pDiscordBot
            .mSQL()
            .prepare(
                "CREATE TABLE IF NOT EXISTS RoleMenuCommand (GuildID TEXT, GuildName TEXT, RoleMenuID INTEGER REFERENCES RoleMenu(rowid) ON UPDATE CASCADE ON DELETE CASCADE, RoleCommandID INTEGER REFERENCES RoleCommand(rowid) ON UPDATE CASCADE ON DELETE CASCADE, Emoji TEXT, PRIMARY KEY (GuildID, RoleMenuID, RoleCommandID));"
            )
            .run();
    
        
        pDiscordBot.mSQL().pragma("synchronous = 1");
        pDiscordBot.mSQL().pragma("journal_mode = persist");
        pDiscordBot.mSQL().pragma("foreign_keys = ON");
    }
}

module.exports = new OnReady();
