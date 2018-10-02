<script>
  import { Hex } from '../index';

  const formatStrong = ({ text, metas }) => {
    text.replace(/\*\*(.*?)\*\*/g, (match, name, offset) => {
      metas.push({
        type: 'strong',
        name,
        offset,
        length: match.length
      });
    });
  };

  const renderBlock = (h, { text, metas }) => {
    const children = [];
    let lastIndex = 0;
    metas.forEach(meta => {
      children.push(text.substring(lastIndex, meta.offset));
      children.push(h(meta.type, meta.name));
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
