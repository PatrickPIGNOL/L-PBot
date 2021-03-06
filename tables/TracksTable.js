const Table = require("./Table.js");
class TracksTable extends Table 
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
			"CREATE TABLE IF NOT EXISTS Tracks (Title TEXT, Artist TEXT, LicenceImageURL TEXT, LicenceURL TEXT, Links TEXT, PRIMARY KEY (Title, Artist));"
		).run();
	}
	mDrop() 
	{
		this.SQL.prepare("DROP TABLE IF EXISTS Tracks;").run();
		this.Database.mSave();
	}
    mSelectAll()
    {
        return this.SQL.prepare
        (
            "SELECT rowid, * FROM Tracks ORDER BY Title ASC,Artist ASC"
        ).all();
    }
	mSelectID(pID)
    {
        return this.SQL.prepare
        (
            "SELECT rowid, * FROM Tracks WHERE rowid = ?"
        ).get(pID);
    }
    mInsert(pValues)
    {
        this.SQL.prepare
        (
            `INSERT OR REPLACE INTO Tracks 
            (
                Title           , 
                Artist          , 
                LicenceImageURL , 
                LicenceURL      ,
                Links           
            )
            VALUES
            (
                @Title           ,
                @Artist          ,
                @LicenceImageURL ,
                @LicenceURL      ,
                @Links           
            )`
        ).run(pValues);
		this.Database.mSave();
    }
	mUpdate(pValues)
    {
        this.SQL.prepare
        (
            `UPDATE Tracks SET
            (
                Title           , 
                Artist          , 
                LicenceImageURL , 
                LicenceURL      ,
                Links           
            )
            =
            (
                @Title           ,
                @Artist          ,
                @LicenceImageURL ,
                @LicenceURL      ,
                @Links           
            ) WHERE rowid = @rowid`
        ).run(pValues);
		this.Database.mSave();
    }
    mRemove(pRowID)
    {
        this.SQL.prepare
        (
            "DELETE FROM Tracks WHERE rowid = ?"
        ).run(pRowID)
		this.Database.mSave();
    }
}

module.exports = TracksTable;