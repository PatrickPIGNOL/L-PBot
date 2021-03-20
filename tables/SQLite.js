const BetterSQLite3 = require("better-sqlite3");
class SQLite
{
	constructor()
	{
		console.log("Opening Tables ...")
		this.aSQL = new BetterSQLite3("./discordbot.sqlite");
		this.aSQL.pragma("synchronous = FULL");
		this.aSQL.pragma("journal_mode = PERSIST");
		this.aSQL.pragma("auto_vacuum = FULL");		
        this.aSQL.pragma("foreign_keys = ON");
		process.on
		(
			'exit', () =>
			{ 
				this.mClose()
			}
		);
		process.on('SIGHUP', () => process.exit(128 + 1));
		process.on('SIGINT', () => process.exit(128 + 2));
		process.on('SIGTERM', () => process.exit(128 + 15));
		console.log("Tables Opened !")
	}
	mClose()
	{
		console.log("Closing Tables ...")
		this.aSQL.close();
		process.removeListener
		(
			"exit",
			() =>
			{ 
				this.mClose()
			}
		);
		process.removeListener
		(
			'SIGHUP',
			() => process.exit(128 + 1)
		);
		process.removeListener
		(
			'SIGINT', 
			() => process.exit(128 + 2)
		);
		process.removeListener
		(
			'SIGTERM', () => process.exit(128 + 15)
		);
		console.log("Tables Closed !")
	}
	get SQL()
	{
		return this.aSQL;
	}
}

module.exports = SQLite;