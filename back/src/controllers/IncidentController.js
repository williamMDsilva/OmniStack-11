const connect = require("../database/connections");

module.exports = {
  async index(req, res) {
    const { page = 0 } = req.query;

    const [count] = await connect("incidents").count();

    const incidents = await connect("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset(page * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf",
      ]);

    res.header("x-total", count["count(*)"]);
    return res.json(incidents);
  },

  async insert(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.auth;

    const [id] = await connect("incidents").insert({
      title,
      description,
      value,
      ong_id,
    });

    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.auth;

    const incident = await connect("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident.ong_id != ong_id)
      return res.status(401).json({ error: "Not Permited" });

    await connect("incidents").where("id", id).delete();

    return res.status(204).send();
  },
};
