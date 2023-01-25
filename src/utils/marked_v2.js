import hljs from 'highlight.js';
import katex from 'katex';
import macros from './macros';
import { marked } from 'marked';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false });

const block = {
  container: /^(:{3,})\s*(\w+)([^\n]*)\n([\s\S]+?)\n\1(?:\n|$)/,
  math: /^(\${2,})([\s\S]+?)\1(?:\n|$)/,
  aligntext: /^\[([^\n]+?|[^\]]+?)(\]+)(?:\n|$)/
};

const inline = {
  math: /^(\$+)([^$]|[^$][\s\S]*?[^$])\1(?!\$)/
};

const renderer = {
  heading(text, level, raw, slugger) {
    const content = this.options.wxFmt ? `<span>${text}</span>` : text;
    const id = this.options.headerIds ? ` id="${this.options.headerPrefix}${slugger.slug(raw)}"` : '';
    return `<h${level}${id}>${content}</h${level}>\n`;
  },

  code(code, infostring, escaped) {
    const origin = code;
    const lang = (infostring || '').match(/\S*/)[0];
    if (lang === 'mermaid') {
      const id = `mermaid-${Date.now()}`;
      return `<div class="mermaid" data-processed="true">${mermaid.render(id, code)}</div>`;
    }

    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out !== null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    code = code.replace(/\n$/, '') + '\n';

    if (!lang) {
      return `<pre><button class='copy-code-btn' data-clipboard-text='${origin}'>copy</button><code>${code}</code></pre>\n`;
    }

    return `<pre><button class='copy-code-btn' data-clipboard-text='${origin}'>copy</button><code class="${this.options.langPrefix}${escape(lang)}">${code}</code></pre>\n`;
  }
};

/* eslint-disable consistent-return */

const genreMap = {
  quote: '引用',
  abstract: '摘要',
  note: '笔记',
  question: '问题',
  example: '例',
  failure: '失败',
  success: '成功',
  tip: '建议',
  hint: '提示',
  info: '信息',
  attention: '注意',
  warning: '警告',
  caution: '警告',
  danger: '危险',
  bug: '故障',
  error: '错误'
};

const container = {
  name: 'container',
  level: 'block',
  start(src) {
    const m = src.match(block.container);
    return m === null ? undefined : m.index;
  },
  tokenizer(src) {
    const match = block.container.exec(src);
    if (match) {
      const text = (match[4] || '').trim();
      const blocks = this.lexer.blockTokens(text);
      blocks.forEach(block => {
        if (!block.tokens) {
          block.tokens = this.lexer.inlineTokens(block.text);
        }
      });
      const tok = {
        type: 'container',
        raw: match[0],
        text,
        genre: (match[2] || '').trim(),
        info: (match[3] || '').trim(),
        tokens: blocks
      };
      tok.info = tok.info ? tok.info : (genreMap[tok.genre] || tok.genre);
      return tok;
    }
  },
  renderer(token) {
    const content = `<div class="admonition-body">\n${this.parser.parse(token.tokens)}</div>\n`;
    const info = token.info ? `\n<div class="admonition-title">${token.info}</div>` : '';
    return `<div class="admonition admonition-${token.genre}">${info}\n${content}</div>\n`;
  }
};

const aligntext = {
  name: 'aligntext',
  level: 'block',
  start(src) {
    const m = src.match(block.aligntext);
    return m === null ? undefined : m.index;
  },
  tokenizer(src) {
    const match = block.aligntext.exec(src);
    if (match) {
      return {
        type: 'aligntext',
        raw: match[0],
        tokens: this.lexer.inlineTokens((match[1] || '').trim()),
        right: match[2].length > 1
      };
    }
  },
  renderer(token) {
    const direction = token.right ? 'right' : 'center';
    const content = this.parser.parseInline(token.tokens).replace(/\s*\r?\n/g, '<br/>');
    return `<p style='text-align: ${direction}'>${content}</p>\n`;
  }
};

const math = {
  name: 'math',
  level: 'block',
  start(src) {
    const m = src.match(block.math);
    return m === null ? undefined : m.index;
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
    const m = src.match(/\$/);
    return m === null ? undefined : m.index;
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
      wxFmt: false,
      ...options
    };
  }

  convert(src) {
    try {
      marked.use({ renderer, extensions: [container, aligntext, math, mathspan] });
      return marked(src, this.options);
    } catch (e) {
      return `<p>An error occurred:</p><pre>${escape(e.message + '', true)}</pre><small>${new Date()}</small>`;
    }
  }
}

export default Marked;
