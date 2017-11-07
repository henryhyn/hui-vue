export default {
  toolbar: [
    {name: 'bold', win: 'Ctrl-B', mac: 'Command-B', method: 'toggleBold'}
  ],

  methods: {
    toggleBold () {
      if (!this.selection.isEmpty()) {
        const range = this.selection.getRange();
        const text = this.session.getTextRange(range);
        this.session.replace(range, `**${text}**`);
        this.selection.clearSelection();
      }
    }
  }
};