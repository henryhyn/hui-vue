import '@/style/main.less';
import Marked from './utils/marked_v2';

const mdRender = new Marked();

export { default as Hex } from './utils/Hex';
export { default as filters } from './filters';
export { default as page } from './mixins/page';
export { Marked, mdRender };
