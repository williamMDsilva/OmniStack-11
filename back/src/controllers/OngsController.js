const connect = require("../database/connections");
const { generateId } = require('../utils');

module.exports = {
  async index(req, res) {
    return res.json(await connect("ongs").select("*"));
  },

  async insert(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = generateId();

    await connect("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return res.json({ id });
  },
};
