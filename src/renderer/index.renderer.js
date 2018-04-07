import renderToTree from '../renderer/toTree';
import getPlainRender from '../renderer/toPlain';

const rendererFormats = {
  plain: getPlainRender,
  tree: renderToTree,
};

export default format => rendererFormats[format];
