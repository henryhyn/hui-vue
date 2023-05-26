const CRLF_LF = /[ ]*\r?\n/g;
const CJK_ANS = /(\p{Unified_Ideograph})(\w)/gui;
const ANS_CJK = /(\w%?)(\p{Unified_Ideograph})/gui;

class Refiner {
  constructor() {
    this.version = '0.0.1';
  }

  refine(text) {
    return this.spacing(text);
  }

  spacing(text) {
    let newText = (text || '').trim();
    newText = newText.replace(CRLF_LF, '\n');
    newText = newText.replace(CJK_ANS, '$1 $2');
    newText = newText.replace(ANS_CJK, '$1 $2');
    return newText + '\n';
  }
}

const refiner = new Refiner();
export default refiner;
