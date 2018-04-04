import { safeLoad } from 'js-yaml';

const propertyActions = {
  '.json': type => JSON.parse(type),
  '.yaml': type => safeLoad(type),
};

export default arg => propertyActions[arg];
