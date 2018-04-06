import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParse from './parsers';

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

const renderObj = (obj, level) => {
  const result = _.keys(obj).map((key) => {
    const string = _.isObject(key) ?
      renderObj(key) : `${' '.repeat((level * 4) + 4)}${key}: ${obj[key]}`;
    return string;
  });
  return ['{', ...result, `${' '.repeat(level * 4)}}`].join('\n');
};

const getValueToStr = (value, level) =>
  ((_.isObject(value)) ? renderObj(value, level + 1) : value);

const getOut = (prefix, key, value) => `${prefix}${key}: ${value}`;

const renderers = {
  nested: (node, level, renderAst) => {
    const prefix = ' '.repeat((level * 4) + 4);
    const value = renderAst(node.children, level + 1);
    return getOut(prefix, node.key, value);
  },
  unchanged: (node, level) => {
    const prefix = ' '.repeat((level * 4) + 4);
    const value = getValueToStr(node.value, level);
    return getOut(prefix, node.key, value);
  },
  added: (node, level) => {
    const prefix = `${' '.repeat((level * 4) + 2)}+ `;
    const value = getValueToStr(node.value, level);
    return getOut(prefix, node.key, value);
  },
  deleted: (node, level) => {
    const prefix = `${' '.repeat((level * 4) + 2)}- `;
    const value = getValueToStr(node.value, level);
    return getOut(prefix, node.key, value);
  },
  changed: (node, level) => {
    const valueBeforeAsStr = getValueToStr(node.valueBefore, level);
    const valueAfterAsStr = getValueToStr(node.valueAfter, level);
    return [getOut(`${' '.repeat((level * 4) + 2)}- `, node.key, valueBeforeAsStr), getOut(`${' '.repeat((level * 4) + 2)}+ `, node.key, valueAfterAsStr)];
  },
};

const render = (ast, level = 0) => {
  const astAsArray = ast.map((node) => {
    const rendererNode = renderers[node.type];
    return rendererNode(node, level, render);
  });
  const flat = _.flatten(astAsArray);
  return ['{', ...flat, `${' '.repeat(level * 4)}}`].join('\n');
};

export default (file1, file2) => {
  const parseFile = getParse(path.extname(file1));
  const obj1 = parseFile(fs.readFileSync(file1, 'utf-8'));
  const obj2 = parseFile(fs.readFileSync(file2, 'utf-8'));
  const ast = getAst(obj1, obj2);
  return render(ast, 0);
};
