import fs from 'fs';
import _ from 'lodash';

export default (file1, file2) => {
  const obj1 = JSON.parse(fs.readFileSync(file1, 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(file2, 'utf-8'));

  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const buildStr = keys.map((key) => {
    if (!(_.has(obj2, key))) {
      return `  - ${key}: ${obj1[key]}`;
    } else if (!(_.has(obj1, key))) {
      return `  + ${key}: ${obj2[key]}`;
    } else if (obj1[key] !== obj2[key]) {
      return `  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`;
    }
    return `    ${key}: ${obj1[key]}`;
  });
  return `{\n${buildStr.join('\n')}\n}`;
};
