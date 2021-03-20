const Table = require("./Table.js");
class ReactRolesTable extends Table
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
            `CREATE TABLE IF NOT EXISTS reactroles 
            (
                GuildID TEXT,
                GuildName TEXT,
                ChannelID TEXT,
                ChannelName TEXT,
                MessageID TEXT,
                Emoji TEXT,
                RoleID TEXT,
                RoleName TEXT,
                PRIMARY KEY (GuildID, ChannelID, MessageID, Emoji, RoleID)
            );`
        ).run();
	}
	
    mDrop() 
	{
		this.SQL.prepare("DROP TABLE IF EXISTS reactroles;").run();
		this.Database.mSave();
	}

    mSelectAll()
    {
        return this.SQL.prepare("SELECT * FROM reactroles WHERE GuildID = ? ORDER BY GuildName ASC, MessageID ASC, RoleName ASC").all();
    }

    mSelectAllIDGuild(pGuildID)
    {
        return this.SQL.prepare("SELECT * FROM reactroles WHERE GuildID = ? ORDER BY MessageID ASC, RoleName ASC").all(pGuildID);
    }

    mSelectAllIDMessageEmoji(pMessageID, pEmoji)
    {
        return this.SQL.prepare("SELECT * FROM reactroles WHERE MessageID = ? AND Emoji = ?").all(pMessageID, pEmoji);
    }

    mInsert(pValues)
    {
        return this.SQL.prepare
        (
            `INSERT OR REPLACE INTO reactroles 
            (
                GuildID,
                GuildName,
                ChannelID,
                ChannelName,
                MessageID,
                Emoji,
                RoleID,
                RoleName
            )
            VALUES
            (
                @GuildID,
                @GuildName,
                @ChannelID,
                @ChannelName,
                @MessageID,
                @Emoji,
                @RoleID,
                @RoleName
            )`
        ).run(pValues)
		this.Database.mSave();
    }

    mDeleteReaction(pValues)
    {
        this.SQL.prepare
        (
            `DELETE FROM reactroles WHERE GuildID = @GuildID AND MessageID = @MessageID AND Emoji = @Emoji`
        ).run(pValues)
		this.Database.mSave();
    }

    mDeleteMessage(pGuildID, pMessageID)
    {
        this.SQL.prepare
        (
            `DELETE FROM reactroles WHERE GuildID = ? AND MessageID = ?`
        ).run(pGuildID, pMessageID)
		this.Database.mSave();
    }
}

module.exports = ReactRolesTable;