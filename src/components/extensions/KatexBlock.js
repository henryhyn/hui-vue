import { Node } from 'tiptap';
import OKatexBlockView from '../views/OKatexBlockView';

export default class KatexBlock extends Node {
  get name() {
    return 'katex_block';
  }

  get schema() {
    return {
      attrs: {
        src: {
          default: null
        }
      },
      group: 'block',
      selectable: false,
      parseDOM: [{
        tag: 'kb',
        getAttrs: dom => ({
          src: dom.getAttribute('src')
        })
      }],
      toDOM: node => ['kb', {
        src: node.attrs.src
      }]
    };
  }

  commands({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state;
      const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
      const node = type.create(attrs);
      const transaction = state.tr.insert(position, node);
      dispatch(transaction);
    };
  }

  get view() {
    return OKatexBlockView;
  }
}
