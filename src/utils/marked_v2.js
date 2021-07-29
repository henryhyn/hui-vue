import hljs from 'highlight.js';
import katex from 'katex';
import macros from './macros';
import marked from 'marked';

const block = {
  math: /^(\${2,})([\s\S]+?)\1\n?/,
  aligntext: /^\[([^\]]+?)(\]?)\]\n/
};

const inline = {
  math: /^(\$+)([^$]|[^$][\s\S]*?[^$])\1(?!\$)/
};

/* eslint-disable consistent-return */

const aligntext = {
  name: 'aligntext',
  level: 'block',
  start(src) {
    return src.match(block.aligntext)?.index;
  },
  tokenizer(src) {
    const match = block.aligntext.exec(src);
    if (match) {
      return {
        type: 'aligntext',
        raw: match[0],
        tokens: this.inlineTokens((match[1] || '').trim()),
        right: match[2].length > 0
      };
    }
  },
  renderer(token) {
    const direction = token.right ? 'right' : 'center';
    const content = this.parseInline(token.tokens).replace(/\s*\r?\n/g, '<br/>');
    return `<p style='text-align: ${direction}'>${content}</p>\n`;
  }
};

const math = {
  name: 'math',
  level: 'block',
  start(src) {
    return src.match(block.math)?.index;
  },
  tokenizer(src) {
    const match = block.math.exec(src);
    if (match) {
      return {
        type: 'math',
        raw: match[0],
        math: (match[2] || '').trim()
      };
    }
  },
  renderer(token) {
    return '<p style="text-align: center; font-size: 15px">' +
      katex.renderToString(token.math, { macros, output: 'html', throwOnError: false, displayMode: true }) +
      '</p>\n';
  }
};

const mathspan = {
  name: 'mathspan',
  level: 'inline',
  start(src) {
    return src.match(/\$/)?.index;
  },
  tokenizer(src) {
    const match = inline.math.exec(src);
    if (match) {
      return {
        type: 'mathspan',
        raw: match[0],
        math: (match[2] || '').trim()
      };
    }
  },
  renderer(token) {
    return katex.renderToString(token.math, { macros, output: 'html', throwOnError: false });
  }
};

/* eslint-enable consistent-return */

class Marked {
  constructor(options) {
    this.options = {
      baseUrl: null,
      breaks: false,
      gfm: true,
      headerIds: true,
      headerPrefix: '',
      highlight: (code, language) => hljs.getLanguage(language) ? hljs.highlight(code, { language }).value : hljs.highlightAuto(code).value,
      langPrefix: 'language-',
      mangle: false,
      pedantic: false,
      sanitize: false,
      sanitizer: null,
      silent: true,
      smartLists: false,
      smartypants: true,
      xhtml: false,
      ...options
    };
  }

  convert(src) {
    try {
      marked.use({ extensions: [aligntext, math, mathspan] });
      return marked(src, this.options);
    } catch (e) {
      return `<p>An error occurred:</p><pre>${escape(e.message + '', true)}</pre><small>${new Date()}</small>`;
    }
  }
}

export default Marked;
