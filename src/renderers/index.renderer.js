import renderToTree from '../renderers/toTree';
import getPlainRender from '../renderers/toPlain';
import renderToJson from '../renderers/toJson';

const rendererFormats = {
  plain: getPlainRender,
  tree: renderToTree,
  json: renderToJson,
};

export default format => rendererFormats[format];
