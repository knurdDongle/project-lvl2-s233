import { safeLoad } from 'js-yaml';
import ini from 'ini';

const propertyActions = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
  '.ini': ini.parse,
};

export default arg => propertyActions[arg];
