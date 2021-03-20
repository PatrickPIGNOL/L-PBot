const Table = require("./Table.js");
class AutorolesTable extends Table
{
	constructor(pDatabase)
	{
		super(pDatabase);
		this.mCreate();
	}
	mCreate()
	{
		this.SQL
		.prepare(
			"CREATE TABLE IF NOT EXISTS autoroles (GuildID TEXT, GuildName TEXT, Type TEXT, RoleID TEXT, RoleName TEXT, PRIMARY KEY (GuildID, Type, RoleID));"
		)
		.run();
	}
	mDrop() 
	{
		this.SQL
		.prepare(
			"DROP TABLE IF EXISTS autoroles;"
		)
		.run();
		this.Database.mSave();
	}
	mGetAutoroles(pGuild, pType)
	{
		return this.SQL.prepare
		(
			"SELECT * FROM autoroles WHERE GuildID = ? AND Type = ?"
		).all(pGuild, pType);
	}
	mSetAutoroles(pValues)
	{
		return this.SQL.prepare
		(
			"INSERT OR REPLACE INTO autoroles (GuildID, GuildName, Type, RoleID, RoleName) VALUES (@GuildID, @GuildName, @Type, @RoleID, @RoleName)"
		).run(pValues);
		this.Database.mSave();
	}
	mDelAutoroles(pValues)
	{
		return this.SQL.prepare
		(
			"DELETE FROM autoroles WHERE GuildID = @GuildID AND Type = @Type AND RoleID = @RoleID"
		).run(pValues);
		this.Database.mSave();
	}
}

module.exports = AutorolesTable;