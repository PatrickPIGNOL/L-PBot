const Table = require("./Table.js");
class ReconnaissancesTable extends Table 
{
	constructor(pDatabase) 
	{
		super(pDatabase);
		this.mCreate();
	}
	mCreate() 
	{
		this.SQL.prepare
		(
			"CREATE TABLE IF NOT EXISTS reconnaissances (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Points INTEGER, Level INTEGER, PRIMARY KEY (GuildID, MemberID));"
		).run();
	}
	mDrop() 
	{
		this.SQL.prepare("DROP TABLE IF EXISTS reconnaissances;").run();
		this.Database.mSave();
	}
	mAllReconnaissances(pGuildID)
	{
		return this.SQL.prepare
		(
			"SELECT * FROM reconnaissances WHERE GuildID = ? ORDER BY points DESC, MemberTag ASC LIMIT 10;"
		).all(pGuildID);
	}
    mGetReconnaissances(pGuildID, pMemberID)
	{
		return this.SQL.prepare
		(
        	"SELECT * FROM reconnaissances WHERE GuildID = ? AND MemberID = ? ORDER BY Points DESC"
      	).get(pGuildID, pMemberID);
	}
	mSetReconnaissances(pValues)
	{
		this.SQL.prepare
		(
        	"INSERT OR REPLACE INTO reconnaissances (GuildID, GuildName, MemberID, MemberTag, Points, Level) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Points, @Level)"
		).run(pValues);
		this.Database.mSave();
	}
}

module.exports = ReconnaissancesTable;