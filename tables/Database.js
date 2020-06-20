const AutorolesTable = require("./AutorolesTable.js");
const MembersTable = require("./MembersTable.js");
const RaidsTable = require("./RaidsTable.js");
const ParticipationsTable = require("./ParticipationsTable.js");
const EconomyTable = require("./EconomyTable.js");
class Database
{
  constructor(pSQL)
  {
    this.aAutoroles = new AutorolesTable(pSQL);
    this.aAutoroles.mCreate();
    this.aMembers = new MembersTable(pSQL);
    this.aMembers.mCreate();
    this.aRaids = new RaidsTable(pSQL);
    this.aRaids.mCreate();
    this.aParticipations = new ParticipationsTable(pSQL);
    this.aParticipations.mCreate();
    this.aEconomy = new EconomyTable(pSQL);
    this.aEconomy.mCreate();
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
}

module.exports = Database;