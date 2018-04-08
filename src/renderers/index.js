import renderToTree from './toTree';
import getPlainRender from './toPlain';
import renderToJson from './toJson';

const rendererFormats = {
  plain: getPlainRender,
  tree: renderToTree,
  json: renderToJson,
};

export default format => rendererFormats[format];
