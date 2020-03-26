const crypto = require('crypto');
const { OK, CREATED, BAD_REQUEST } = require('http-status-codes');
const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const ongs = await connection('ongs').select('*');
    return res.json(ongs).status(OK);
  },

  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    try {
      await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
      });
      return res.status(CREATED).json({ id });
    } catch (err) {
      return res.status(BAD_REQUEST).json(err);
    }
  },
};
