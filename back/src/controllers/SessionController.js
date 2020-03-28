const connect = require("../database/connections");

module.exports = {
  async auth(req, res) {
    const { id } = req.body;

    const ong = await connect("ongs").where("id", id).select("name").first();

    if (!ong) return res.status(400).json({ error: "Not Found!" });

    return res.json(ong);
  },
};
