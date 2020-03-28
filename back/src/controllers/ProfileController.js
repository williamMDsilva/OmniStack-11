const connect = require("../database/connections");

module.exports = {
  async index(req, res) {
    const ong_id = req.headers.auth;
    return res.json(
      await connect("incidents").where("ong_id", ong_id).select("*")
    );
  },
};
