import fs from 'fs';
import Marked from '@/utils/marked';

test('MarkDown => HTML', () => {
  const md = fs.readFileSync('test/utils/test.md', 'utf8');
  const marked = new Marked({ highlight: false });
  console.log(marked.convert(md));
});
