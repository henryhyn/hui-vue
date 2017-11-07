const Command = 'Cmd';

export default {
  toolbar: [
    {name: 'bold', key: [Command, 'B'], action: 'toggleBold'},
    {name: 'italic', key: [Command, 'I'], action: 'toggleItalic'}
  ].map(i => {
    const mac = i.key.join('-');
    const win = mac.replace('Cmd', 'Ctrl');
    return {...i, mac, win};
  }),

  methods: {
    toggleBold () {
      if (!this.selection.isEmpty()) {
        const range = this.selection.getRange();
        const text = this.session.getTextRange(range);
        this.session.replace(range, `**${text}**`);
        this.selection.clearSelection();
      }
    },

    toggleItalic () {
      if (!this.selection.isEmpty()) {
        const range = this.selection.getRange();
        const text = this.session.getTextRange(range);
        this.session.replace(range, `*${text}*`);
        this.selection.clearSelection();
      }
    }
  }
};