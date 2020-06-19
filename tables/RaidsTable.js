const Table = require("./Table.js");
class RaidsTable extends Table {
  constructor(pSQL) {
    super(pSQL);
  }
  mCreate() 
  {
    this.SQL.prepare
    (
      "CREATE TABLE IF NOT EXISTS raids (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Message TEXT, Number INTEGER, Date DOUBLE, PRIMARY KEY (GuildID, MemberID, Message));"
    ).run();
  }
  mDrop() 
  {
    this.SQL.prepare("DROP TABLE IF EXISTS raids;").run();
  }
  mGetAllRaids(pGuildID) 
  {
    return this.SQL.prepare("SELECT rowid, * FROM raids WHERE GuildID == ? ORDER BY Date DESC").all(pGuildID);;
  }
  mGetRaids(pGuildID, pMemberID, pMessage) 
  {
    return this.SQL.prepare
    (
      "SELECT * FROM raids WHERE GuildID = ? AND MemberID = ? AND Message = ? ORDER BY Date DESC, Number DESC"
    ).get(pGuildID, pMemberID, pMessage);
  }
  mSetRaids(pValues) 
  {
    return this.SQL.prepare
    (
      "INSERT OR REPLACE INTO raids (GuildID, GuildName, MemberID, MemberTag, Message, Number, Date) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Message, @Number, @Date)"
    ).run(pValues);
  }
  mDelRaids(pRowID) 
  {
    return this.SQL.prepare
    (
      "DELETE FROM raids WHERE rowid == ?"
    ).run(pRowID)
  }
}

module.exports = RaidsTable;
