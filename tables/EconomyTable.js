const Table = require("./Table.js");
class EconomyTable extends Table
{
	constructor(pSQL)
	{
		super(pSQL);
		this.mCreate();
	}
	mCreate()
	{
		this.SQL.prepare
		(
			"CREATE TABLE IF NOT EXISTS economy (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Money DOUBLE, Date DOUBLE, PRIMARY KEY (GuildID, MemberID));"
		)
		.run();
	}
	mDrop()
	{
		return this.SQL.prepare
		(
			"DROP TABLE IF EXISTS economy;"
		).run();
	}
	mGetEconomy(pGuildID, pMemberID)
	{
		return this.SQL.prepare
		(
			"SELECT * FROM economy WHERE GuildID = ? AND MemberID = ? ORDER BY MemberTag ASC"
		).get(pGuildID, pMemberID);
	}
	mSetEconomy(pValue)
	{
		return this.SQL.prepare
		(
			"INSERT OR REPLACE INTO economy (GuildID, GuildName, MemberID, MemberTag, Money, Date) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Money, @Date)"
		).run(pValue);
	}
}

module.exports = EconomyTable;