import screenfull from 'screenfull';
import { Hex } from '../index';

const Command = 'Command';
const Shift = 'Shift';

export default {
  toolbar: [
    { name: '保存', key: [Command, 'S'], action: 'toggleSave', icon: 'save' },
    { name: '加粗', key: [Command, 'B'], action: 'toggleBold', icon: 'bold' },
    { name: '斜体', key: [Command, 'I'], action: 'toggleItalic', icon: 'italic' },
    { name: '中划线', key: [Command, 'M'], action: 'toggleStrikeThrough', icon: 'strikethrough' },
    { name: '无序列表', key: [Command, 'U'], action: 'toggleUnorderedList', icon: 'list-ul' },
    { name: '有序列表', key: [Shift, Command, 'O'], action: 'toggleOrderedList', icon: 'list-ol' },
    { name: '标题', key: [Command, 'H'], action: 'toggleHeading', icon: 'heading' },
    { name: '自动格式化', key: [Shift, Command, 'L'], action: 'toggleFormat', icon: 'remove-format' },
    { name: '插入日期', key: ['F5'], action: 'toggleDate', icon: 'calendar' },
    { name: '插入图片', key: ['F6'], action: 'insertImage', icon: 'image' },
    { name: '全屏', key: [Shift, Command, 'H'], action: 'toggleFullScreen', icon: 'expand' }
  ].map(i => {
    const mac = i.key.join('-');
    const win = mac.replace('Command', 'Ctrl');
    return { ...i, mac, win };
  }),

  methods: {
    toggleSave() {
      this.$emit('save');
    },

    toggleBold() {
      if (this.selection.isEmpty()) {
        const { row, column } = this.selection.getCursor();
        this.editor.insert('****');
        this.editor.moveCursorTo(row, column + 2);
        this.editor.focus();
      } else {
        const range = this.selection.getRange();
        const text = this.session.getTextRange(range);
        this.session.replace(range, `**${text}**`);
        this.selection.clearSelection();
      }
    },

    toggleItalic() {
      if (this.selection.isEmpty()) {
        const { row, column } = this.selection.getCursor();
        this.editor.insert('**');
        this.editor.moveCursorTo(row, column + 1);
        this.editor.focus();
      } else {
        const range = this.selection.getRange();
        const text = this.session.getTextRange(range);
        this.session.replace(range, `*${text}*`);
        this.selection.clearSelection();
      }
    },

    toggleStrikeThrough() {
      if (this.selection.isEmpty()) {
        const { row, column } = this.selection.getCursor();
        this.editor.insert('~~~~');
        this.editor.moveCursorTo(row, column + 2);
        this.editor.focus();
      } else {
        const range = this.selection.getRange();
        const text = this.session.getTextRange(range);
        this.session.replace(range, `~~${text}~~`);
        this.selection.clearSelection();
      }
    },

    toggleUnorderedList() {
      const { row } = this.selection.getCursor();
      const lineText = this.session.getLine(row);
      const length = lineText.length;
      const index = lineText.search(/[^-]/);
      const range = {
        start: { row, column: 0 },
        end: { row, column: length }
      };
      if (index <= 0) {
        this.session.replace(range, '- ' + lineText);
      } else {
        this.session.replace(range, lineText.replace(/^\s*-\s+/, ''));
      }
      this.editor.focus();
    },

    toggleOrderedList() {
      const { row } = this.selection.getCursor();
      const lineText = this.session.getLine(row);
      const length = lineText.length;
      const index = lineText.search(/[^\d]/);
      const range = {
        start: { row, column: 0 },
        end: { row, column: length }
      };
      if (index <= 0) {
        this.session.replace(range, '1. ' + lineText);
      } else {
        this.session.replace(range, lineText.replace(/^\s*\d+\.\s+/, ''));
      }
      this.editor.focus();
    },

    toggleHeading() {
      const { row } = this.selection.getCursor();
      const lineText = this.session.getLine(row);
      const length = lineText.length;
      const level = lineText.search(/[^#]/);
      if (level >= 6) {
        return;
      }
      const heading = level <= 0 ? '# ' : '#';
      const range = {
        start: { row, column: 0 },
        end: { row, column: length }
      };
      this.session.replace(range, heading + lineText);
      this.editor.focus();
    },

    toggleFormat() {
      const text = this.session.getValue();
      this.session.setValue(Hex.refine(text));
      this.editor.focus();
    },

    toggleDate() {
      this.editor.insert(`#### ${Hex.dateNow()}\n`);
      this.editor.focus();
    },

    insertImage() {
      this.imageUploadVisible = true;
    },

    toggleFullScreen() {
      if (screenfull.isEnabled) {
        screenfull.request(this.$refs.editor);
      }
    }
  }
};
