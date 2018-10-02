<script>
  import { Hex } from '../index';

  const formatStrong = ({ text, metas }) => {
    text.replace(/([~*]+)(.*?)\1/g, (match, brace, name, offset) => {
      let tag = 'span';
      let style = {};
      if (brace === '**') {
        tag = 'strong';
      }
      if (brace === '*') {
        tag = 'em';
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
  };

  const renderBlock = (h, { text, metas }) => {
    const children = [];
    let lastIndex = 0;
    metas.forEach(meta => {
      children.push(text.substring(lastIndex, meta.offset));
      const { tag, style, name } = meta;
      children.push(h(tag, { style }, name));
      lastIndex = meta.offset + meta.length;
    });
    children.push(text.substring(lastIndex));
    return children;
  };

  export default {
    props: ['content'],

    functional: true,

    render(h, { props }) {
      const blocks = props.content.split('\n').filter(Hex.validString).map(text => ({ text, metas: [] }));
      blocks.forEach(formatStrong);
      return blocks.map(block => h('p', renderBlock(h, block)));
    }
  };
</script>
