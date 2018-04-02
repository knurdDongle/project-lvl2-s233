import commander from 'commander';
import fs from 'fs';
import _ from 'lodash'; // eslint-disable-line

export const genDiff = (file1, file2) => {
  const obj1 = JSON.parse(fs.readFileSync(file1, 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(file2, 'utf-8'));

  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const str = keys.map((key) => {
    if (!(_.has(obj2, key))) {
      return `\n  - ${key}: ${obj1[key]}`;
    } else if (!(_.has(obj1, key))) {
      return `\n  + ${key}: ${obj2[key]}`;
    } else if (obj1[key] !== obj2[key]) {
      return `\n  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`;
    }
    return `\n    ${key}: ${obj1[key]}`;
  });
  return `{${str.join('')}\n}`;
};

commander
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .arguments('<file1> <file2>')
  .action((file1, file2) => console.log(genDiff(file1, file2)));

export default () => commander.parse(process.argv);
