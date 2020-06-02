const OnEvent = require("../OnEvent.js");
class OnReady extends OnEvent {
  constructor() {
    super("ready");
  }

  async mExecute(pDiscordBot, ...args) {
    await this.mOnReady(pDiscordBot);
  }

  mChange(pDiscordBot)
  {
    pDiscordBot.mClient().user.setStatus('online');
    const vActivityRandom = Math.floor(Math.random() * 3);
    const vActivity = [
      'PLAYING',
      'LISTENING',
      'WATCHING',
    ];
    let vTextes;
    let vTextRandom;
    switch(vActivityRandom)
    {
      case 0:
      {
        vTextRandom = Math.floor(Math.random() * 5);
        vTextes = [
          "écrire son code source...",
          "éliminer ses bugs...",
          "créer de nouvelles fonctionalités...",
          "faire le café... ah non, il est pas prévu pour ça...", 
          "bug#!&?₱~...",
        ];
      }break;
      case 1:
      {
        vTextRandom = Math.floor(Math.random() * 1);
        vTextes = [
          "je bug, je bug soir et matin, je bug sur http://glitch.com ...",
        ];
      }break;
      case 2:
      {
        vTextRandom = Math.floor(Math.random() * 2);
        vTextes = [
          "je suis clue... je vais créer le système parfait ...",
          "de la doc sur https://discord.js.org/...",
        ]; 
      }break;
    }
    pDiscordBot.aClient.user.setActivity(vTextes[vTextRandom], {
      type: vActivity[vActivityRandom]
    });
  }

  async mOnReady(pDiscordBot) {
    
    this.mChange(pDiscordBot);
    setTimeout(
      () => {
        this.mChange(pDiscordBot);
      },
      900000
    );

    console.log(`${pDiscordBot.aClient.user.tag} - Je suis en ligne ...`);

    console.log(
      `${
        pDiscordBot.aClient.guilds.cache.first().members.cache.size
      } users, in ${
        pDiscordBot.aClient.guilds.cache.first().channels.cache.size
      } channels of ${pDiscordBot.aClient.guilds.cache.size} guilds.`
    );
    pDiscordBot.mSQL().prepare(
        "CREATE TABLE IF NOT EXISTS autoroles (GuildID TEXT, GuildName TEXT, RoleID TEXT, RoleName TEXT, PRIMARY KEY (GuildID));"
      )
      .run();
    pDiscordBot.mSQL().prepare(
        "CREATE TABLE IF NOT EXISTS raids (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Message TEXT, Number INTEGER, Date DOUBLE, PRIMARY KEY (GuildID, MemberID, Message));"
      )
      .run();
    pDiscordBot.mSQL().prepare(
        "CREATE TABLE IF NOT EXISTS participations (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Points INTEGER, Level INTEGER, PRIMARY KEY (GuildID, MemberID));"
      )
      .run();
    pDiscordBot.mSQL().prepare(
        "CREATE TABLE IF NOT EXISTS economy (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Money DOUBLE, Date DOUBLE, PRIMARY KEY (GuildID, MemberID));"
      )
      .run();
    pDiscordBot.mSQL().prepare(
        "CREATE TABLE IF NOT EXISTS warns (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Date TEXT, Reason TEXT);"
      )
      .run();
    pDiscordBot.mSQL().prepare(
        "CREATE TABLE IF NOT EXISTS reconnaissances (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Points INTEGER, Level INTEGER, PRIMARY KEY (GuildID, MemberID));"
      )
      .run();
    pDiscordBot.mSQL().prepare(
        "CREATE TABLE IF NOT EXISTS scores (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Points INTEGER, Level INTEGER, PRIMARY KEY (GuildID, MemberID));"
      )
      .run();
    pDiscordBot.mSQL().prepare(
        "CREATE TABLE IF NOT EXISTS members (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, JoinDate TEXT, LeftDate TEXT, PRIMARY KEY (GuildID, MemberID));"
      )
      .run();
    
    pDiscordBot.mSQL().getAutoroles = pDiscordBot.mSQL().prepare(
      "SELECT * FROM autoroles WHERE GuildID = ?"
    );
    pDiscordBot.mSQL().setAutoroles = pDiscordBot.mSQL().prepare(
      "INSERT OR REPLACE INTO autoroles (GuildID, GuildName, RoleID, RoleName) VALUES (@GuildID, @GuildName, @RoleID, @RoleName)"
    );
    pDiscordBot.mSQL().getRaids = pDiscordBot.mSQL().prepare(
      "SELECT * FROM raids WHERE GuildID = ? AND MemberID = ? AND Message = ? ORDER BY Date DESC, Number DESC"
    );
    pDiscordBot.mSQL().setRaids = pDiscordBot.mSQL().prepare(
      "INSERT OR REPLACE INTO raids (GuildID, GuildName, MemberID, MemberTag, Message, Number, Date) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Message, @Number, @Date)"
    );
    pDiscordBot.mSQL().getReconnaissances = pDiscordBot.mSQL().prepare(
      "SELECT * FROM reconnaissances WHERE GuildID = ? AND MemberID = ? ORDER BY Points DESC"
    );
    pDiscordBot.mSQL().setReconnaissances = pDiscordBot.mSQL().prepare(
      "INSERT OR REPLACE INTO reconnaissances (GuildID, GuildName, MemberID, MemberTag, Points, Level) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Points, @Level)"
    );
    pDiscordBot.mSQL().getParticipations = pDiscordBot.mSQL().prepare(
      "SELECT * FROM participations WHERE GuildID = ? AND MemberID = ? ORDER BY Points DESC"
    );
    pDiscordBot.mSQL().setParticipations = pDiscordBot.mSQL().prepare(
      "INSERT OR REPLACE INTO participations (GuildID, GuildName, MemberID, MemberTag, Points, Level) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Points, @Level)"
    );
    pDiscordBot.mSQL().getMembers = pDiscordBot.mSQL().prepare(
      "SELECT * FROM members WHERE GuildID = ? AND MemberID = ? ORDER BY JoinDate ASC"
    );
    pDiscordBot.mSQL().setMembers = pDiscordBot.mSQL().prepare(
      "INSERT OR REPLACE INTO members (GuildID, GuildName, MemberID, MemberTag, JoinDate, LeftDate) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @JoinDate, @LeftDate)"
    );
    pDiscordBot.mSQL().getWarns = pDiscordBot.mSQL().prepare(
      "SELECT * FROM warns WHERE GuildID = ? AND MemberID = ? ORDER BY Date ASC"
    );
    pDiscordBot.mSQL().setWarns = pDiscordBot.mSQL().prepare(
      "INSERT OR REPLACE INTO warns (GuildID, GuildName, MemberID, MemberTag, Date, Reason) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Date, @Reason)"
    );
    pDiscordBot.mSQL().getEconomy = pDiscordBot.mSQL().prepare(
      "SELECT * FROM economy WHERE GuildID = ? AND MemberID = ? ORDER BY MemberTag ASC"
    );
    pDiscordBot.mSQL().setEconomy = pDiscordBot.mSQL().prepare(
      "INSERT OR REPLACE INTO economy (GuildID, GuildName, MemberID, MemberTag, Money, Date) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Money, @Date)"
    );
    pDiscordBot.mSQL().pragma("synchronous = 1");
    pDiscordBot.mSQL().pragma("journal_mode = persist");
  }
}

module.exports = new OnReady();
