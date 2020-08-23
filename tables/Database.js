const AutorolesTable = require("./AutorolesTable.js");
const MembersTable = require("./MembersTable.js");
const RaidsTable = require("./RaidsTable.js");
const ParticipationsTable = require("./ParticipationsTable.js");
const EconomyTable = require("./EconomyTable.js");
const ReconnaissancesTable = require("./ReconnaissancesTable.js");
const WarnsTable = require("./WarnsTable.js");

class Database
{
	constructor(pSQL)
	{
		this.aAutoroles = new AutorolesTable(pSQL);
		this.aMembers = new MembersTable(pSQL);
		this.aRaids = new RaidsTable(pSQL);
		this.aParticipations = new ParticipationsTable(pSQL);
		this.aEconomy = new EconomyTable(pSQL);
		this.aReconnaissances = new ReconnaissancesTable(pSQL);
		this.aWarns = new WarnsTable(pSQL);
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