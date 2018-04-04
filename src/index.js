import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParse from './parse';

export default (file1, file2) => {
  const parseFile = getParse(path.extname(file1));
  const obj1 = parseFile(fs.readFileSync(file1, 'utf-8'));
  const obj2 = parseFile(fs.readFileSync(file2, 'utf-8'));

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
