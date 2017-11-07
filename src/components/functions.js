const Command = 'Cmd';

export default {
  toolbar: [
    {name: 'Bold', key: [Command, 'B'], action: 'toggleBold'},
    {name: 'Italic', key: [Command, 'I'], action: 'toggleItalic'},
    {name: 'Heading', key: [Command, 'H'], action: 'toggleHeading'}
  ].map(i => {
    const mac = i.key.join('-');
    const win = mac.replace('Cmd', 'Ctrl');
    return {...i, mac, win};
  }),

  methods: {
    toggleBold () {
      if (this.selection.isEmpty()) {
        const {row, column} = this.selection.getCursor();
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

    toggleItalic () {
      if (this.selection.isEmpty()) {
        const {row, column} = this.selection.getCursor();
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

    toggleHeading () {
      const {row} = this.selection.getCursor();
      const lineText = this.session.getLine(row);
      const length = lineText.length;
      const level = lineText.search(/[^#]/);
      if (level >= 6) {
        return;
      }
      const heading = level <= 0 ? '# ' : '#';
      const range = {
        start: {row, column: 0},
        end: {row, column: length}
      };
      this.session.replace(range, heading + lineText);
      this.editor.focus();
    }
  }
};