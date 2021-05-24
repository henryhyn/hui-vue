import { Node } from 'tiptap';
import OKatexInlineView from '../views/OKatexInlineView';

export default class KatexInline extends Node {
  get name() {
    return 'katex_inline';
  }

  get schema() {
    return {
      attrs: {
        src: {
          default: null
        }
      },
      inline: true,
      group: 'inline',
      selectable: true,
      parseDOM: [{
        tag: 'ki',
        getAttrs: dom => ({
          src: dom.getAttribute('src')
        })
      }],
      toDOM: node => ['ki', {
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
    return OKatexInlineView;
  }
}
