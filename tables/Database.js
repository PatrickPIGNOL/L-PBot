const AutorolesTable = require("./AutorolesTable.js");
const MembersTable = require("./MembersTable.js");
const RaidsTable = require("./RaidsTable.js");
const ParticipationsTable = require("./ParticipationsTable.js");
const EconomyTable = require("./EconomyTable.js");
const ReconnaissancesTable = require("./ReconnaissancesTable.js");
const WarnsTable = require("./WarnsTable.js");
const ReactRolesTable = require("./ReactRolesTable.js");
const TracksTable = require("./TracksTable.js");
const SQLite = require("./SQLite.js");

class Database
{
	constructor()
	{
		this.aSQL = new SQLite();
		this.aAutoroles = new AutorolesTable(this);
		this.aMembers = new MembersTable(this);
		this.aRaids = new RaidsTable(this);
		this.aParticipations = new ParticipationsTable(this);
		this.aEconomy = new EconomyTable(this);
		this.aReconnaissances = new ReconnaissancesTable(this);
		this.aWarns = new WarnsTable(this);
        this.aReactRoles = new ReactRolesTable(this);
        this.aTracks = new TracksTable(this);
	}
	get SQL()
	{
		return this.aSQL.SQL;
	}
	mSave()
	{
		console.log("Saving Tables ...")
		this.aSQL.mClose();
		this.aSQL = new SQLite();
		console.log("Tables Saved !")
	}
	mClose()
	{
		this.aSQL.mClose();
	}
    get Tracks()
    {
        return this.aTracks;
    }
	get Autoroles()
	{
		return this.aAutoroles;
	}
	get Members()
	{
		return this.aMembers;
	}
	get Raids()
	{
		return this.aRaids;
	}
	get Participations()
	{
		return this.aParticipations;
	}
	get Economy()
	{
		return this.aEconomy;
	}
    get ReactRoles()
    {
        return this.aReactRoles;
    }
	get Reconnaissances()
	{
		return this.aReconnaissances;
	}
	get Warns()
	{
		return this.aWarns;
	}
}

module.exports = Database;