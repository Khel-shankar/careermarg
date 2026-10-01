const dbHandler = require("./db");

module.exports = async function handler(req, res) {
  return dbHandler(req, res);
};
