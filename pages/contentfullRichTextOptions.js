import {INLINES, BLOCKS} from '@contentful/rich-text-types';
const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="py-1 text-gray-800 max-w-screen-xl">{children}</p>
    ),
    [INLINES.HYPERLINK]: node => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopner"
        className="underline text-blue-500">
        {node.content[0].value}
      </a>
    ),
  },
};

export default options;
