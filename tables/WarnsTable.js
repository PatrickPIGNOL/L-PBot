const Table = require("./Table.js");
class WarnsTable extends Table 
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
			"CREATE TABLE IF NOT EXISTS Warns (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Date TEXT, Reason TEXT);"
		).run();
	}

	mDrop() 
	{
		this.SQL.prepare
		(
			"DROP TABLE IF EXISTS Warns;"
		).run();
		this.Database.mSave();
	}
    
    mGetWarns(pGuildMember, pMemberID)
	{
		return this.SQL.prepare
		(
        	"SELECT * FROM warns WHERE GuildID = ? AND MemberID = ? ORDER BY Date ASC"
      	).get(pGuildMember, pMemberID);
	}

    mSetWarns(pValues)
	{
    	this.SQL.prepare
		(
        	"INSERT OR REPLACE INTO warns (GuildID, GuildName, MemberID, MemberTag, Date, Reason) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Date, @Reason)"
		).run(pValues);
		this.Database.mSave();
	}
}

module.exports = WarnsTable;