const AutorolesTable = require("./AutorolesTable.js");
const MembersTable = require("./MembersTable.js");
const RaidsTable = require("./RaidsTable.js");
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
}

module.exports = Database;