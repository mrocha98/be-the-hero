const {
  OK,
  CREATED,
  BAD_REQUEST,
  NO_CONTENT,
  UNAUTHORIZED,
} = require('http-status-codes');
const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count('* as total');

    const ongs = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    res.header('X-Total-Count', count.total);
    return res.json(ongs).status(OK);
  },

  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    try {
      const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id,
      });
      return res.status(CREATED).json({ id });
    } catch (err) {
      return res.status(BAD_REQUEST).json(err);
    }
  },

  async destroy(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    try {
      const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

      if (incident.ong_id !== ong_id)
        return res
          .status(UNAUTHORIZED)
          .json({ error: 'Operation not permitted' });

      await connection('incidents')
        .where('id', id)
        .delete();

      return res.sendStatus(NO_CONTENT);
    } catch (err) {
      return res.status(BAD_REQUEST).json(err);
    }
  },
};
