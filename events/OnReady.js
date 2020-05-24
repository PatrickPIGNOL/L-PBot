const OnEvent = require("../OnEvent.js");
class OnReady extends OnEvent {
  constructor() {
    super("ready");
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
        "CREATE TABLE IF NOT EXISTS warns (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Date TEXT, Reason TEXT);"
      )
      .run();
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
      "INSERT OR REPLACE INTO scores (GuildID, GuildName, MemberID, MemberTag, Points, Level) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Points, @Level)"
    );
    pDiscordBot.aSQL.getMembers = pDiscordBot.aSQL.prepare(
      "SELECT * FROM members WHERE GuildID = ? AND MemberID = ? ORDER BY JoinDate ASC"
    );
    pDiscordBot.aSQL.setMembers = pDiscordBot.aSQL.prepare(
      "INSERT OR REPLACE INTO members (GuildID, GuildName, MemberID, MemberTag, JoinDate, LeftDate) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @JoinDate, @LeftDate)"
    );
    pDiscordBot.aSQL.getWarns = pDiscordBot.aSQL.prepare(
      "SELECT * FROM warns WHERE GuildID = ? AND MemberID = ? ORDER BY Date ASC"
    );
    pDiscordBot.aSQL.setWarns = pDiscordBot.aSQL.prepare(
      "INSERT OR REPLACE INTO warns (GuildID, GuildName, MemberID, MemberTag, Date, Reason) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Date, @Reason)"
    );
    pDiscordBot.aSQL.pragma("synchronous = 1");
    pDiscordBot.aSQL.pragma("journal_mode = persist");
  }
}

module.exports = new OnReady();
