<script>
  import { Hex } from '../index';

  const formatInline = ({ self, metas }) => {
    self.name.replace(/([~*`]+)(.*?)\1/g, (match, brace, name, offset) => {
      let tag = 'span';
      let style = {};
      if (brace === '**') {
        tag = 'strong';
      }
      if (brace === '*') {
        tag = 'em';
      }
      if (brace === '`') {
        tag = 'code';
      }
      if (brace === '~~') {
        style = {
          textDecoration: 'underline'
        };
      }
      if (brace === '~') {
        style = {
          textDecoration: 'line-through'
        };
      }
      metas.push({ tag, style, name, offset, length: match.length });
    });
    self.name.replace(/!\[\]\((.*?)\)/g, (match, src, offset) => {
      metas.push({ tag: 'img', attrs: { src }, offset, length: match.length });
    });
  };

  const formatBlock = ({ text, self }) => {
    text.replace(/^(#+)\s*(.*)$/g, (match, brace, name) => {
      self.tag = 'h' + brace.length;
      self.name = name;
    });
    text.replace(/^-{3,}$/g, () => {
      self.tag = 'hr';
      self.name = '';
    });
  };

  const renderInline = (h, { self, metas }) => {
    const children = [];
    let lastIndex = 0;
    metas.forEach(meta => {
      children.push(self.name.substring(lastIndex, meta.offset));
      const { tag, style, attrs, name } = meta;
      children.push(h(tag, { style, attrs }, name));
      lastIndex = meta.offset + meta.length;
    });
    children.push(self.name.substring(lastIndex));
    return children;
  };

  export default {
    props: ['content'],

    functional: true,

    render(h, { props }) {
      const blocks = props.content.split(/[\r\n]/).filter(Hex.validString).map(text => ({
        text,
        self: { tag: 'p', name: text },
        metas: []
      }));
      blocks.forEach(formatBlock);
      blocks.forEach(formatInline);
      return blocks.map(block => h(block.self.tag, renderInline(h, block)));
    }
  };
</script>
