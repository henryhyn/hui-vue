import fs from 'fs';
import Marked from '@/utils/marked';

test('MarkDown => HTML', () => {
  const md = fs.readFileSync('test/utils/test.md', 'utf8');
  const html = fs.readFileSync('test/utils/test.html', 'utf8');
  const marked = new Marked({ highlight: false });
  // fs.writeFile('test/utils/test.html', marked.convert(md));
  expect(marked.convert(md)).toEqual(html);
});
