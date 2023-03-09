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
	get NoSQL()
	{
		return this.aDatabase.NoSQL;
	}
}

module.exports = NoSQLTable;