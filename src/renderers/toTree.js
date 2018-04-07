import _ from 'lodash';

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

const renderToTree = (ast, level = 0) => {
  const astAsArray = ast.map((node) => {
    const rendererNode = renderers[node.type];
    return rendererNode(node, level, renderToTree);
  });
  const flat = _.flatten(astAsArray);
  return ['{', ...flat, `${' '.repeat(level * 4)}}`].join('\n');
};

export default renderToTree;
