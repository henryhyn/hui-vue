<template lang='pug'>
  el-container#editor
    el-aside#aside(width='64px')
      el-menu(:collapse='true' background-color='#545c64' text-color='#fff' active-text-color='#ffd04b')
        el-menu-item
          i.el-icon-search
          span(slot='title') 搜索
        el-menu-item
          i.el-icon-folder
          span(slot='title') 文件夹
        el-menu-item
          i.el-icon-time
          span(slot='title') 最近
        el-menu-item
          i.el-icon-chat-dot-round
          span(slot='title') 聊天
        el-menu-item
          i.el-icon-star-on
          span(slot='title') 收藏夹
    el-container(style='position: relative')
      el-header#header(height='36px')
        editor-menu-bar(:editor='editor' v-slot='{ commands, isActive, getMarkAttrs }')
          #menu-bar
            el-tooltip(placement='top' content='保存')
              el-button(@click="$emit('save')" type='text')
                i.fa.fa-save
            el-tooltip(placement='top' content='撤销')
              el-button(@click='commands.undo' type='text')
                i.fa.fa-undo
            el-tooltip(placement='top' content='重做')
              el-button(@click='commands.redo' type='text')
                i.fa.fa-redo
            el-tooltip(placement='top' content='水平线')
              el-button(@click='commands.horizontal_rule' type='text')
                i.fa.fa-minus
            el-tooltip(placement='top' content='插图')
              el-button(@click='showImagePrompt(commands.image)' type='text')
                i.fa.fa-image
            el-tooltip(placement='top' content='表格')
              el-button(@click='commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })' type='text')
                i.fa.fa-table
            el-tooltip(placement='top' content='查找替换')
              el-button(:class="{ 'is-active': findVisible }" @click='showFindMenu' type='text')
                i.fa.fa-search
            el-tooltip(placement='top' content='无序列表')
              el-button(:class="{ 'is-active': isActive.bullet_list() }" @click='commands.bullet_list' type='text')
                i.fa.fa-list-ul
            el-tooltip(placement='top' content='有序列表')
              el-button(:class="{ 'is-active': isActive.ordered_list() }" @click='commands.ordered_list' type='text')
                i.fa.fa-list-ol
            el-tooltip(placement='top' content='待办列表')
              el-button(:class="{ 'is-active': isActive.todo_list() }" @click='commands.todo_list' type='text')
                i.fa.fa-tasks
            el-tooltip(placement='top' content='引用')
              el-button(:class="{ 'is-active': isActive.blockquote() }" @click='commands.blockquote' type='text')
                i.fa.fa-quote-right
            el-tooltip(placement='top' content='代码块')
              el-button(:class="{ 'is-active': isActive.code_block() }" @click='commands.code_block' type='text')
                i.far.fa-file-code
            el-tooltip(placement='top' content='加粗')
              el-button(:class="{ 'is-active': isActive.bold() }" @click='commands.bold' type='text')
                i.fa.fa-bold
            el-tooltip(placement='top' content='斜体')
              el-button(:class="{ 'is-active': isActive.italic() }" @click='commands.italic' type='text')
                i.fa.fa-italic
            el-tooltip(placement='top' content='删除线')
              el-button(:class="{ 'is-active': isActive.strike() }" @click='commands.strike' type='text')
                i.fa.fa-strikethrough
            el-tooltip(placement='top' content='下划线')
              el-button(:class="{ 'is-active': isActive.underline() }" @click='commands.underline' type='text')
                i.fa.fa-underline
            el-tooltip(placement='top' content='代码')
              el-button(:class="{ 'is-active': isActive.code() }" @click='commands.code' type='text')
                i.fa.fa-code
            el-tooltip(placement='top' content='行内公式')
              el-button(:class="{ 'is-active': isActive.katex_inline() }" @click='commands.katex_inline' type='text')
                i.fa.fa-subscript
            el-tooltip(placement='top' content='行间公式')
              el-button(:class="{ 'is-active': isActive.katex_block() }" @click='commands.katex_block' type='text')
                i.fa.fa-square-root-alt
            el-tooltip(placement='top' content='正文')
              el-button(:class="{ 'is-active': isActive.paragraph() }" @click='commands.paragraph' type='text')
                i.fa.fa-paragraph
            el-tooltip(placement='top' content='链接')
              el-button(:class="{ 'is-active': isActive.link() }" @click="showLinkMenu(getMarkAttrs('link'))" type='text')
                i.fa.fa-link
            el-tooltip(placement='top' content='一级标题')
              el-button(:class="{ 'is-active': isActive.heading({level: 1}) }" @click='commands.heading({level: 1})' type='text') H1
            el-tooltip(placement='top' content='二级标题')
              el-button(:class="{ 'is-active': isActive.heading({level: 2}) }" @click='commands.heading({level: 2})' type='text') H2
            el-tooltip(placement='top' content='三级标题')
              el-button(:class="{ 'is-active': isActive.heading({level: 3}) }" @click='commands.heading({level: 3})' type='text') H3
            el-dropdown(v-if='isActive.table()')
              i.fa.fa-border-all
              el-dropdown-menu(slot='dropdown')
                el-dropdown-item: el-button(@click='commands.addRowBefore' type='text') 前面增加行
                el-dropdown-item: el-button(@click='commands.addRowAfter' type='text') 后面增加行
                el-dropdown-item: el-button(@click='commands.addColumnBefore' type='text') 前面增加列
                el-dropdown-item: el-button(@click='commands.addColumnAfter' type='text') 后面增加列
                el-dropdown-item: el-button(@click='commands.toggleCellMerge' type='text') 合并单元格
                el-dropdown-item: el-button(@click='commands.deleteRow' type='text') 删除行
                el-dropdown-item: el-button(@click='commands.deleteColumn' type='text') 删除列
                el-dropdown-item: el-button(@click='commands.deleteTable' type='text') 删除表格
      el-container#main-wrapper
        el-main
          el-form(v-if='linkVisible' inline @submit.native.prevent)
            el-form-item
              el-input(ref='linkInput' v-model='linkUrl' placeholder='请输入链接 (回车)' style='width: 300px' @keyup.enter.native='setLinkUrl(editor.commands.link, linkUrl)' @keyup.esc.native='hideLinkMenu' clearable)
                el-button(slot='append' icon='el-icon-delete' @click='setLinkUrl(editor.commands.link, null)')
          el-form(v-if='findVisible' inline @submit.native.prevent)
            el-form-item
              el-input(ref='search' placeholder='查找...' v-model='searchTerm' @keyup.enter.native='editor.commands.find(searchTerm)' @keyup.esc.native='hideFindMenu' clearable)
            el-form-item
              el-input(placeholder='替换...' v-model='replaceWith' @keyup.enter.native='editor.commands.replace(replaceWith)' @keyup.esc.native='hideFindMenu' clearable)
            el-form-item
              el-button(@click='editor.commands.find(searchTerm)' type='primary') 查找
            el-form-item
              el-button(@click='editor.commands.clearSearch()') 取消选中
            el-form-item
              el-button(@click='editor.commands.replace(replaceWith)' type='warning') 替换
            el-form-item
              el-button(@click='editor.commands.replaceAll(replaceWith)' type='danger') 全部替换
          editor-content.post-body(:editor='editor' @keyup.esc.native='hideMenu' @keydown.meta.83.native.prevent="$emit('save')")
        el-aside#comment(width='301px')
          p 评论
    image-upload(v-model='imageUploadVisible' :url='image.upload.url' :field='image.upload.fieldName' :params='image.upload.params' @crop-upload-success='uploadSuccess')
</template>

<script>
  import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
  import {
    Blockquote,
    CodeBlockHighlight,
    HardBreak,
    Heading,
    Image,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    Strike,
    Underline,
    History,
    Search,
    Placeholder,
    TrailingNode
  } from 'tiptap-extensions';
  import Doc from './extensions/Doc';
  import Title from './extensions/Title';
  import KatexInline from './extensions/KatexInline';
  import KatexBlock from './extensions/KatexBlock';
  import ImageUpload from './ImageUpload';
  import python from 'highlight.js/lib/languages/python';
  import java from 'highlight.js/lib/languages/java';
  import javascript from 'highlight.js/lib/languages/javascript';

  export default {
    components: { EditorContent, EditorMenuBar, ImageUpload },

    data() {
      return {
        imageUploadVisible: false,
        imageCommand: null,
        linkVisible: false,
        linkUrl: null,
        findVisible: false,
        searchTerm: null,
        replaceWith: null,
        keepInBounds: true,
        content: null,
        editor: null
      };
    },

    props: {
      value: {
        type: String,
        default: null
      },
      image: {
        type: Object,
        default() {
          return {
            upload: {
              url: '',
              fieldName: 'file',
              params: {}
            },
            uploadHandler(res) {
              return res.data;
            }
          };
        }
      }
    },

    methods: {
      showImagePrompt(command) {
        this.imageUploadVisible = true;
        this.imageCommand = command;
      },

      uploadSuccess(res) {
        const src = this.image.uploadHandler(res);
        if (src !== null) {
          this.imageCommand({ src });
        }
      },

      showFindMenu() {
        if (this.findVisible) {
          this.hideFindMenu();
        } else {
          this.findVisible = true;
          this.$nextTick(() => {
            this.$refs.search.focus();
          });
        }
      },

      hideFindMenu() {
        this.searchTerm = null;
        this.replaceWith = null;
        this.findVisible = false;
      },

      showLinkMenu({ href }) {
        if (this.linkVisible) {
          this.hideLinkMenu();
        } else {
          this.linkUrl = href;
          this.linkVisible = true;
          this.$nextTick(() => {
            this.$refs.linkInput.focus();
          });
        }
      },

      hideLinkMenu() {
        this.linkUrl = null;
        this.linkVisible = false;
      },

      setLinkUrl(command, url) {
        command({ href: url });
        this.hideLinkMenu();
      },

      hideMenu() {
        this.hideFindMenu();
        this.hideLinkMenu();
      },

      initialize() {
        if (this.editor) {
          return;
        }
        this.editor = new Editor({
          autoFocus: true,
          content: this.value || '',
          onUpdate: ({ getHTML }) => {
            this.content = getHTML();
            this.$emit('input', this.content);
          },
          extensions: [
            new Doc(),
            new Title(),
            new KatexInline(),
            new KatexBlock(),
            new Placeholder({
              showOnlyCurrent: false,
              emptyNodeText: node => {
                if (node.type.name === 'title') {
                  return '标题';
                }
                return '¶';
              }
            }),
            new Blockquote(),
            new BulletList(),
            new CodeBlockHighlight({
              languages: { python, java, javascript }
            }),
            new HardBreak(),
            new Heading({ levels: [1, 2, 3, 4, 5, 6] }),
            new Image(),
            new HorizontalRule(),
            new ListItem(),
            new OrderedList(),
            new TodoItem({
              nested: true
            }),
            new TodoList(),
            new Link(),
            new Bold(),
            new Code(),
            new Italic(),
            new Strike(),
            new Underline(),
            new History(),
            new Search({
              disableRegex: false
            }),
            new Table({
              resizable: true
            }),
            new TableHeader(),
            new TableCell(),
            new TableRow(),
            new TrailingNode()
          ]
        });
      }
    },

    watch: {
      value(newVal) {
        if (this.editor && newVal !== this.content) {
          this.editor.setContent(newVal || '');
        }
      }
    },

    mounted() {
      this.$nextTick(this.initialize);
    },

    beforeDestroy() {
      if (this.editor) {
        this.editor.destroy();
      }
    }
  };
</script>

<style lang='less'>
  #editor {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  #aside {
    background-color: #545c64;
  }

  #header {
    border-bottom: 1px solid lightgray;
  }

  #comment {
    border-left: 1px solid lightgray;
    background-color: #F2F6FC;

    p {
      margin-left: 16px;
      margin-right: 16px;
    }
  }

  #main-wrapper {
    position: absolute;
    top: 36px;
    bottom: 0;
    left: 0;
    right: 0;
  }

  #menu-bar {
    padding-top: 5px;

    .el-dropdown > i.fa {
      padding-top: 6px;
      padding-bottom: 6px;
      padding-left: 8px;
      padding-right: 8px;
      margin-left: 10px;
      border-radius: 4px;

      &:hover {
        background-color: rgba(black, 0.05);
      }
    }

    .el-button {
      border: none;
      padding-top: 6px;
      padding-bottom: 6px;
      padding-left: 8px;
      padding-right: 8px;

      &.el-button--text {
        color: black;
      }

      &:hover {
        background-color: rgba(black, 0.05);
      }

      &.is-active {
        color: #409EFF;
        background-color: rgba(black, 0.1);
      }
    }
  }

  .ProseMirror {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    outline: none;

    .find {
      background: rgba(255, 213, 0, 0.5);
    }

    .katex {
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }

    *.is-empty:not(hr)::before {
      content: attr(data-empty-text);
      float: left;
      color: #aaa;
      pointer-events: none;
      height: 0;
    }
  }
</style>
