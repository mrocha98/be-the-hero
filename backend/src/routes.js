const routes = require('express').Router();
const { celebrate } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const OngValidator = require('./validators/OngValidator');
const IncidentValidator = require('./validators/IncidentValidator');
const ProfileValidator = require('./validators/ProfileValidator');

// console.log(OngValidator);

routes.post('/sessions', SessionController.store);

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate(OngValidator.store), OngController.store);

routes.get(
  '/profile',
  celebrate(ProfileValidator.index),
  ProfileController.index
);

routes.get(
  '/incidents',
  celebrate(IncidentValidator.index),
  IncidentController.index
);
routes.post('/incidents', IncidentController.store);
routes.delete(
  '/incidents/:id',
  celebrate(IncidentValidator.destroy),
  IncidentController.destroy
);

module.exports = routes;
