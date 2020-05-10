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
    pDiscordBot.aSQLite
      .prepare(
        "CREATE TABLE IF NOT EXISTS scores (guild TEXT, user TEXT, usertag TEXT, points INTEGER, level INTEGER, PRIMARY KEY (guild, user));"
      )
      .run();
    pDiscordBot.aSQL
      .prepare(
        "CREATE TABLE IF NOT EXISTS scores (guild TEXT, user TEXT, usertag TEXT, points INTEGER, level INTEGER, PRIMARY KEY (guild, user));"
      )
      .run();

    pDiscordBot.aSQL.getScore = pDiscordBot.aSQL.prepare(
      "SELECT * FROM scores WHERE guild = ? AND user = ? ORDER BY points ASC"
    );
    pDiscordBot.aSQL.setScore = pDiscordBot.aSQL.prepare(
      "INSERT OR REPLACE INTO scores (guild , user, usertag, points, level) VALUES (@guild, @user, @usertag, @points, @level);"
    );
    pDiscordBot.aSQLite.getScore = pDiscordBot.aSQLite.prepare(
      "SELECT * FROM scores WHERE guild = ? AND user = ? ORDER BY points ASC"
    );
    pDiscordBot.aSQLite.setScore = pDiscordBot.aSQLite.prepare(
      "INSERT OR REPLACE INTO scores (guild , user, usertag, points, level) VALUES (@guild, @user, @usertag, @points, @level);"
    );
    pDiscordBot.aSQL.pragma("synchronous = 1");
    pDiscordBot.aSQL.pragma("journal_mode = persist");
    pDiscordBot.aSQLite.pragma("synchronous = 1");
    pDiscordBot.aSQLite.pragma("journal_mode = persist");
    //this.aSQL.getScore().
  }
}

module.exports = new OnReady();
