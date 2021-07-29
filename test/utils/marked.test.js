import fs from 'fs';
import Marked from '@/utils/marked_v2';

test('MarkDown => HTML', () => {
  const md = fs.readFileSync('test/utils/test.md', 'utf8');
  const html = fs.readFileSync('test/utils/test.html', 'utf8');
  const marked = new Marked();
  // fs.writeFileSync('test/utils/test.html', marked.convert(md));
  expect(marked.convert(md)).toEqual(html);
});
