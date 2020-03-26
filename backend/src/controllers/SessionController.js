const { OK, BAD_REQUEST } = require('http-status-codes');
const connection = require('../database/connection');

module.exports = {
  async store(req, res) {
    const { id } = req.body;

    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first();

    if (!ong)
      return res
        .status(BAD_REQUEST)
        .json({ error: 'No ONG found with this ID' });

    return res.status(OK).json(ong);
  },
};
