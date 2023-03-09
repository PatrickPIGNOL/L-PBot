const Database = require("@replit/database")
class ReplitDB
{
	constructor()
	{
        this.aDB = new Database();
    }
    get DB()
	{
		return this.aDB;
	}
}

module.exports = SQLite;