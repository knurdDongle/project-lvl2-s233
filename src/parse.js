import { safeLoad } from 'js-yaml';
import ini from 'ini';

const propertyActions = {
  '.json': type => JSON.parse(type),
  '.yaml': type => safeLoad(type),
  '.ini': type => ini.parse(type),
};

export default arg => propertyActions[arg];
