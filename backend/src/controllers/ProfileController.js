const { OK, BAD_REQUEST } = require('http-status-codes');
const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    try {
      const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*');

      return res.status(OK).json(incidents);
    } catch (err) {
      return res.status(BAD_REQUEST).json(err);
    }
  },
};
