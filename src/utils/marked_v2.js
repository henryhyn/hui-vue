import hljs from 'highlight.js';
import katex from 'katex';
import macros from './macros';
import marked from 'marked';

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
  }
};

/* eslint-disable consistent-return */

const genreMap = { tip: '提示', warning: '警告', danger: '危险' };

const container = {
  name: 'container',
  level: 'block',
  start(src) {
    return src.match(block.container)?.index;
  },
  tokenizer(src) {
    const match = block.container.exec(src);
    if (match) {
      const text = (match[4] || '').trim();
      const blocks = this.blockTokens(text);
      blocks.forEach(block => {
        if (!block.tokens) {
          block.tokens = this.inlineTokens(block.text);
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
    const content = `<div class="custom-block-body">\n${this.parse(token.tokens)}</div>\n`;
    const info = token.info ? `\n<p class="custom-block-title">${token.info}</p>` : '';
    return `<div class="custom-block ${token.genre}">${info}\n${content}</div>\n`;
  }
};

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
        right: match[2].length > 1
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