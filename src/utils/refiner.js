const CRLF_LF = /[ ]*\r?\n/g;
const CJK_ANS = /(\p{Unified_Ideograph})(\w)/gu;
const ANS_CJK = /(\w%?)(\p{Unified_Ideograph})/gu;
const BRACKET = /（(.+?)）/gu;
const CJK_BRACKET = /(\p{Unified_Ideograph}\*{0,2})([$(])/gu;
const BRACKET_CJK = /([$)])(\p{Unified_Ideograph})/gu;

const PUNCT = /(\p{Unified_Ideograph})([,.?:])[ ]*/gu;
const PUNCT_MAP = {
  ',': '，',
  '.': '。',
  '?': '？',
  '!': '！',
  ';': '；',
  ':': '：'
};

class Refiner {
  constructor() {
    this.version = '0.0.1';
  }

  refine(text) {
    return this.convert(this.spacing(text));
  }

  spacing(text) {
    let newText = (text || '').trim();
    newText = newText.replace(CRLF_LF, '\n');
    newText = newText.replace(CJK_ANS, '$1 $2');
    newText = newText.replace(ANS_CJK, '$1 $2');
    newText = newText.replace(BRACKET, '($1)');
    newText = newText.replace(CJK_BRACKET, '$1 $2');
    newText = newText.replace(BRACKET_CJK, '$1 $2');
    return newText + '\n';
  }

  convert(text) {
    return text.replace(PUNCT, (match, p1, p2) => `${p1}${PUNCT_MAP[p2]}`);
  }
}

const refiner = new Refiner();
export default refiner;
