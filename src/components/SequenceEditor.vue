<template lang='pug'>
  div
    span(v-for='(term, idx) in terms' :key='idx')
      el-popover(v-if='term.entity' trigger='manual' v-model='term.visible')
        el-radio-group(v-model='term.nature' size='mini' @change='changeHandler(idx)')
          el-radio-button(v-for='option in options' :key='option' :label='option')
          el-radio-button(label='DEL')
        el-badge(:value='term.nature' style='margin-right:25px' slot='reference')
          el-tag(style='margin-left:5px;margin-right:5px;cursor:pointer' size='mini' @click='showHandler(idx)') {{ term.name }}
      span(v-else @mouseup='selectHandler(idx)' style='padding-left:15px;padding-right:15px') {{ term.name }}
</template>

<script>
  export default {
    data() {
      return {
        terms: []
      };
    },

    props: {
      options: Array,
      value: String
    },

    methods: {
      convertToText(terms = []) {
        return terms.map(term => term.entity && term.nature !== 'DEL' ? `[${term.name}]_${term.nature}_` : term.name).join('');
      },

      convertToTerms(text = '') {
        let start = 0;
        const terms = [];
        text.replace(/\[(.+?)\]_([A-Z]{3})_/g, (match, name, nature, offset) => {
          if (offset > start) {
            terms.push({ name: text.slice(start, offset), entity: false, visible: false });
          }
          terms.push({ name, nature, entity: true, visible: false });
          start = offset + match.length;
        });
        if (start < text.length) {
          terms.push({ name: text.slice(start, text.length), entity: false, visible: false });
        }
        return terms;
      },

      showHandler(idx) {
        this.terms.forEach(term => (term.visible = false));
        this.terms[idx].visible = true;
      },

      selectHandler(idx) {
        const selected = window.getSelection().toString();
        let startIdx = window.getSelection().anchorOffset;
        let endIdx = window.getSelection().focusOffset;
        if (endIdx - startIdx !== selected.length || endIdx === startIdx || /^\s+$/gm.test(selected)) {
          return;
        }

        const ltrim = selected.replace(/^\s+/gm, '');
        const rtrim = ltrim.replace(/\s+$/gm, '');
        startIdx += (selected.length - ltrim.length);
        endIdx -= (ltrim.length - rtrim.length);

        const { name } = this.terms[idx];
        const startPart = name.slice(0, startIdx);
        const midPart = `[${name.slice(startIdx, endIdx)}]_NUL_`;
        const endPart = name.slice(endIdx);
        this.terms[idx].name = `${startPart}${midPart}${endPart}`;
        const text = this.convertToText(this.terms);
        this.$emit('input', text);
        this.terms = this.convertToTerms(text);
        if (startIdx > 0) {
          this.showHandler(idx + 1);
        } else {
          this.showHandler(idx);
        }
      },

      changeHandler(idx) {
        const text = this.convertToText(this.terms);
        this.$emit('input', text);
        this.terms[idx] = false;
      }
    },

    mounted() {
      this.$nextTick(() => {
        this.terms = this.convertToTerms(this.value);
      });
    },

    watch: {
      value(newVal) {
        if (newVal !== this.convertToText(this.terms)) {
          this.terms = this.convertToTerms(newVal);
        }
      }
    }
  };
</script>
