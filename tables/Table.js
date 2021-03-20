class Table
{
	constructor(pDatabase)
	{
		this.aDatabase = pDatabase;
	}
	get Database()
	{
		return this.aDatabase;
	}
	get SQL()
	{
		return this.aDatabase.SQL;
	}
}

module.exports = Table;