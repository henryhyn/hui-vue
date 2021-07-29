import snippetText from './markdown.snippets';

/* eslint-disable no-undef */
ace.define('ace/snippets/markdown', ['require', 'exports', 'module'], (require, exports) => {
  exports.snippetText = snippetText;
  exports.scope = 'markdown';
});

(function () {
  ace.require(['ace/snippets/markdown'], m => {
    if (typeof module === 'object' && typeof exports === 'object' && module) {
      module.exports = m;
    }
  });
})();
/* eslint-enable no-undef */
