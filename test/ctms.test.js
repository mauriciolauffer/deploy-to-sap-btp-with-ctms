/* import 'dotenv/config';
import ctmsDeploy from '../dist/ctms.js'; */


try {
  require('dotenv').config();
const ctmsDeploy = require('../dist/index.js');
//const ctmsDeploy = require('../dist/ctms.js').default;

  //ctmsDeploy();
} catch (err) {
  console.error(err);
}
