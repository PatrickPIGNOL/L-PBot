class OnReady {
  constructor() {
    this.aEventName = "ready";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    await this.mOnReady(pDiscordBot);
  }

  async mOnReady(pDiscordBot) {
    pDiscordBot.aClient.user.setStatus("online");
    pDiscordBot.aClient.user.setActivity("écrire son code source...", {
      type: 1
    });

    console.log(`${pDiscordBot.aClient.user.tag} - Je suis en ligne ...`);

    console.log(
      `${
        pDiscordBot.aClient.guilds.cache.first().members.cache.size
      } users, in ${
        pDiscordBot.aClient.guilds.cache.first().channels.cache.size
      } channels of ${pDiscordBot.aClient.guilds.cache.size} guilds.`
    );
    pDiscordBot.aSQL.prepare(
        "CREATE TABLE IF NOT EXISTS scores (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Points INTEGER, Level INTEGER, PRIMARY KEY (GuildID, MemberID));"
      )
      .run();
    pDiscordBot.aSQL.prepare(
        "CREATE TABLE IF NOT EXISTS members (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, JoinDate TEXT, LeftDate TEXT, PRIMARY KEY (GuildID, MemberID));"
      )
      .run();
    pDiscordBot.aSQL.getScore = pDiscordBot.aSQL.prepare(
      "SELECT * FROM scores WHERE GuildID = ? AND MemberID = ? ORDER BY Points DESC"
    );
    pDiscordBot.aSQL.setScore = pDiscordBot.aSQL.prepare(
      "INSERT OR REPLACE INTO scores (GuildID, GuildName, MemberID, MemberTag, Points, Level) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Points, @Level);"
    );
    pDiscordBot.aSQL.pragma("synchronous = 1");
    pDiscordBot.aSQL.pragma("journal_mode = persist");
  }
}

module.exports = new OnReady();
