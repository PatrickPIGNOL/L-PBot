const Table = require("./Table.js");
class ParticipationsTable extends Table
{
  constructor(pSQL)
  {
    super(pSQL);
  }
  mCreate()
  {
    this.SQL
      .prepare(
        "CREATE TABLE IF NOT EXISTS participations (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Points INTEGER, Level INTEGER, PRIMARY KEY (GuildID, MemberID));"
      )
      .run();
  }
  mDrop()
  {
    return this.SQL
      .prepare(
        "DROP TABLE IF EXISTS participations;"
      )
      .run();
  }
  mGetParticipations(pGuildID, pMemberID)
  {
    return this.SQL
      .prepare(
        "SELECT * FROM participations WHERE GuildID = ? AND MemberID = ? ORDER BY Points DESC"
      ).get(pGuildID, pMemberID);
  }
  mSetParticipations(pValue)
  {
    return this.SQL
      .prepare(
        "INSERT OR REPLACE INTO participations (GuildID, GuildName, MemberID, MemberTag, Points, Level) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Points, @Level)"
      ).run(pValue);
  }
}

module.exports = ParticipationsTable;