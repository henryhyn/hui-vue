import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Buffer } from 'buffer';
import CryptoJS from 'crypto-js';
import MDF from 'markdown-formatter';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const Hex = {};

// 浏览器检测
Hex.getExplore = () => {
  const sys = Object.create(null);
  const ua = navigator.userAgent.toLowerCase();
  /* eslint-disable */
  let s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
      (s = ua.match(/edge\/([\d.]+)/)) ? sys.edge = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
          (s = ua.match(/(?:opera|opr).([\d.]+)/)) ? sys.opera = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
              (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
  /* eslint-enable */
  return sys;
};

// 基于 axios 的 Restful 请求
Hex.toQuery = params => Object.keys(params)
  .filter(key => Hex.validAny(params[key]))
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  .join('&');
Hex.get = (url, params, cb) => {
  if (cb === undefined) {
    cb = params;
    params = undefined;
  }
  if (params !== undefined) {
    url = url + '?' + Hex.toQuery(params);
  }
  axios.get(url).then(({ data }) => cb(data));
};
Hex.post = (url, params, cb) => axios.post(url, params).then(({ data }) => cb(data));
Hex.put = (url, params, cb) => axios.put(url, params).then(({ data }) => cb(data));
Hex.delete = (url, cb) => axios.delete(url).then(({ data }) => cb(data));

Hex.px = n => /^\d+$/.test(n) ? `${n}px` : n;

// 参考: https://segmentfault.com/a/1190000011966867
// 判断是否为邮箱地址
// https://github.com/manishsaraan/email-validator/blob/master/index.js
Hex.isEmail = str => /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
// 判断是否为身份证号
Hex.isIdCard = str => /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
// 判断是否为手机号
Hex.isPhoneNum = str => /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
// 判断是否为URL地址
Hex.isUrl = str => /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i.test(str);

Hex.validAny = any => any !== null && any !== undefined;
Hex.validArray = arr => Array.isArray(arr) && arr.length > 0;
Hex.validString = str => Hex.validAny(str) && str && str.toLowerCase() !== 'null' && str.toLowerCase() !== 'undefined' && str.trim().length > 0;
Hex.validNumber = num => Hex.validAny(num);
Hex.validId = num => Hex.validAny(num) && num > 0;

Hex.validateName = (rule, value, cb) => {
  if (!Hex.validString(value)) {
    cb(new Error('请填写用户名'));
  } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    cb(new Error('只允许使用字母、数字和下划线'));
  } else {
    cb();
  }
};

Hex.validatePhone = (rule, value, cb) => {
  if (!Hex.validString(value)) {
    cb(new Error('请填写手机号码'));
  } else if (!Hex.isPhoneNum(value)) {
    cb(new Error('请填写正确的手机号码!'));
  } else {
    cb();
  }
};

Hex.validateFileName = (rule, value, cb) => {
  if (!Hex.validString(value)) {
    cb(new Error('请填写文件名'));
  } else if (!/^[a-z_-][a-z0-9_/-]{3,19}/.test(value)) {
    cb(new Error('文件名由小写英文字母、数字、下划线和中划线组成，不能使用数字开头, 长度4~20个字符.'));
  } else {
    cb();
  }
};

Hex.validateConfirmPass = pass =>
  (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== pass) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  };

Hex.validataZhLength = (min, max) =>
  (rule, value, cb) => {
    value = value || '';
    const doubleCharLength = value.replace(/\p{Unified_Ideograph}/ug, 'aa').length;
    if (doubleCharLength < min * 2 || doubleCharLength > max * 2) {
      cb(new Error(`长度在${min}到${max}之间`));
    } else {
      cb();
    }
  };

Hex.validataLink = (rule, value, cb) => {
  value = value || '';
  if (!value) {
    cb();
    return;
  }

  // 不可以包含汉字（汉字应提前被转码）
  if (/\p{Unified_Ideograph}/ug.test(value)) {
    cb(new Error('不可以包含中文字符！'));
    return;
  } else if (!/^\w+:\/\/\S+$/.test(value)) {
    cb(new Error('不符合链接格式！'));
    return;
  }

  cb();
};

Hex.toString = (idx, lst) => lst[idx];

Hex.refine = text => MDF.refine(text);

Hex.empty = () => {
};

Hex.dateNow = () => dayjs().format('YYYY-MM-DD dddd');
Hex.fromNow = val => dayjs(val).fromNow();
Hex.formatDate = val => dayjs(val).format('YYYY-MM-DD');
Hex.formatWeek = val => dayjs(val).format('YYYY-MM-DD dddd');
Hex.format = val => dayjs(val).format('YYYY-MM-DD HH:mm:ss');
Hex.diff = (val1, val2, unit) => dayjs(val1).diff(val2, unit);
Hex.formatNumber = num => {
  if (num >= 1e7) {
    return `${(num / 1e7).toFixed(0)}kw+`;
  }
  if (num >= 1e4) {
    return `${(num / 1e4).toFixed(0)}w+`;
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(0)}k+`;
  }
  return num;
};

Hex.capitalize = val => {
  if (!val) {
    return '';
  }
  const value = val.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

Hex.ellipsis = (val, maxLen = 10) => {
  if (!Hex.validString(val)) {
    return '';
  }
  if (val.length <= maxLen) {
    return val;
  }
  return val.slice(0, maxLen).concat('...');
};

Hex.uniq = (lst = []) => Array.from(new Set(lst));

// Array.map 的简易版本: 提取一个集合里指定的属性值
Hex.pluck = (lst = [], key = '') => (lst || []).map(obj => obj[key]);

// 字符串拆分的加强版, 仅保留有效的字符串
Hex.split = (text, regex = /[ ,，、；;\t\r\n]/) => (text || '').split(regex).map(i => i.trim()).filter(Hex.validString);

Hex.toMap = (arr, key, val, init = Object.create(null)) => (arr || []).reduce((dict, item) => {
  dict[item[key]] = item[val];
  return dict;
}, init);

// 计算累和
Hex.sum = arr => (arr || []).reduce((total, value) => total + value, 0);
Hex.sumBy = (arr, key) => (arr || []).reduce((total, item) => total + item[key], 0);
Hex.max = arr => (arr || []).reduce((t, v) => t > v ? t : v);
Hex.min = arr => (arr || []).reduce((t, v) => t < v ? t : v);
Hex.map = (arr, key) => (arr || []).map(item => item[key]);
Hex.groupBy = (arr, key) => (arr || []).reduce((dict, item) => {
  const k = item[key];
  dict[k] || (dict[k] = []);
  dict[k].push(item);
  return dict;
}, Object.create(null));
Hex.keyBy = (arr, key) => (arr || []).reduce((dict, item) => {
  const k = item[key];
  dict[k] = item;
  return dict;
}, Object.create(null));
Hex.mergeBy = (path, ...data) => {
  const obj = [].concat(...data).reduce((dict, item) => {
    const key = item[path];
    dict[key] || (dict[key] = []);
    dict[key].push(item);
    return dict;
  }, Object.create(null));
  return Object.values(obj).map(arr => Object.assign({}, ...arr));
};

Hex.gitHashObject = text => {
  const len = Buffer.from(text).length;
  return CryptoJS.SHA1(`blob ${len}\0${text}`).toString(CryptoJS.enc.Hex);
};

Hex.sortedCategory = (categories, comparator, cb) => {
  if (!Hex.validArray(categories)) {
    return;
  }
  categories.sort(comparator);
  categories.forEach(category => {
    cb(category);
    Hex.sortedCategory(category.children, comparator, cb);
  });
};

export default Hex;
