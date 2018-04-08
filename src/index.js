import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParse from './parsers';
import render from './renderers';

const propertyTypes = [
  {
    type: 'nested',
    check: (obj1, obj2) => _.isObject(obj1) && _.isObject(obj2),
    process: (key, type, obj1, obj2, func) =>
      ({ key, type: 'nested', children: func(obj1, obj2) }),
  },
  {
    type: 'added',
    check: (obj1, obj2) => !obj1 && obj2,
    process: (key, type, obj1, obj2) =>
      ({ key, type: 'added', value: obj2 }),
  },
  {
    type: 'deleted',
    check: (obj1, obj2) => obj1 && !obj2,
    process: (key, type, obj1) =>
      ({ key, type: 'deleted', value: obj1 }),
  },
  {
    type: 'changed',
    check: (obj1, obj2) => obj1 !== obj2,
    process: (key, type, obj1, obj2) =>
      ({
        key,
        type: 'changed',
        valueBefore: obj1,
        valueAfter: obj2,
      }),
  },
  {
    type: 'unchanged',
    check: (obj1, obj2) => obj1 === obj2,
    process: (key, type, obj1) =>
      ({ key, type: 'unchanged', value: obj1 }),
  },
];

const getAst = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  return keys.map((key) => {
    const nodeBefore = obj1[key];
    const nodeAfter = obj2[key];
    const { type, process } = _.find(propertyTypes, ({ check }) =>
      check(nodeBefore, nodeAfter));
    return process(key, type, nodeBefore, nodeAfter, getAst);
  });
};

const renderAst = (ast, format = 'tree') => {
  const renderer = render(format);
  return renderer(ast);
};

export default (file1, file2, format) => {
  const parseFile = getParse(path.extname(file1));
  const obj1 = parseFile(fs.readFileSync(file1, 'utf-8'));
  const obj2 = parseFile(fs.readFileSync(file2, 'utf-8'));
  const ast = getAst(obj1, obj2);
  return `${renderAst(ast, format)}`;
};
