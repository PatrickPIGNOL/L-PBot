class NoSQLTable
{
	constructor(pDatabase)
	{
		this.aDatabase = pDatabase;
	}
	get Database()
	{
		return this.aDatabase;
	}
	get DB()
	{
		return this.aDatabase.DB;
	}
}

module.exports = NoSQLTable;