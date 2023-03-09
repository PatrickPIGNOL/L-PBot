const Database = require("@replit/database")
class NoSQLReplitDB
{
	constructor()
	{
        this.aNoSQL = new Database();
    }
    get NoSQL()
	{
		return this.aNoSQL;
	}
}

module.exports = NoSQLReplitDB;