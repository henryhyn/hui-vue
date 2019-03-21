import screenfull from 'screenfull';
import { Hex } from '../index';

const Command = 'Cmd';
const Shift = 'Shift';
const Alt = 'Alt';

export default {
  toolbar: [
    { name: 'Save', key: [Command, 'S'], action: 'toggleSave' },
    { name: 'Bold', key: [Command, 'B'], action: 'toggleBold' },
    { name: 'Italic', key: [Command, 'I'], action: 'toggleItalic' },
    { name: 'StrikeThrough', key: [Command, 'M'], action: 'toggleStrikeThrough' },
    { name: 'UnorderedList', key: [Command, 'L'], action: 'toggleUnorderedList' },
    { name: 'OrderedList', key: [Alt, Command, 'L'], action: 'toggleOrderedList' },
    { name: 'Heading', key: [Command, 'H'], action: 'toggleHeading' },
    { name: 'Date', key: ['F5'], action: 'toggleDate' },
    { name: 'FullScreen', key: [Shift, Command, 'H'], action: 'toggleFullScreen' }
  ].map(i => {
    const mac = i.key.join('-');
    const win = mac.replace('Cmd', 'Ctrl');
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
        this.session.replace(range, '-\t' + lineText);
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
        this.session.replace(range, '1.\t' + lineText);
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

    toggleDate() {
      this.editor.insert(`#### ${Hex.dateNow()}\n`);
      this.editor.focus();
    },

    toggleFullScreen() {
      if (screenfull.enabled) {
        screenfull.toggle(this.$refs.editor);
      }
    }
  }
};
