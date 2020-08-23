const Table = require("./Table.js");
class MembersTable extends Table
{
	constructor(pSQL)
	{
		super(pSQL);
		this.mCreate();
	}
	mCreate()
	{
		this.SQL
		.prepare(
			"CREATE TABLE IF NOT EXISTS members (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, JoinDate TEXT, LeftDate TEXT, PRIMARY KEY (GuildID, MemberID));"
		)
		.run();
	}
	mDrop()
	{
		return this.SQL
		.prepare(
			"DROP TABLE IF EXISTS members;"
		)
		.run();
	}
	mGetMembers(pGuildID, pMemberID)
	{
		return this.SQL
		.prepare(
			"SELECT * FROM members WHERE GuildID = ? AND MemberID = ? ORDER BY JoinDate ASC"
		).get(pGuildID, pMemberID);
	}
	mSetMembers(pValues)
	{
		return this.SQL
		.prepare(
			"INSERT OR REPLACE INTO members (GuildID, GuildName, MemberID, MemberTag, JoinDate, LeftDate) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @JoinDate, @LeftDate)"
		).run(pValues);
	}
}


module.exports = MembersTable;