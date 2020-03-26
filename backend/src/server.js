const { PORT } = require('../env');
const app = require('./app');

console.log('========\tBE THE HERO\t========');
console.log(`Server listening on...\t${PORT}`);

app.listen(PORT);
