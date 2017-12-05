import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const Hex = {};

Hex.toQuery = (object) => Object.keys(object)
  .filter(key => Hex.validAny(object[key]))
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
  .join('&');

Hex.get = (url, params, cb) => {
  if (cb === undefined) {
    cb = params;
    params = undefined;
  }

  if (params !== undefined) {
    url = url + '?' + Hex.toQuery(params);
  }

  fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      res.json().then(cb);
    }
  });
};

Hex.post = (url, params, cb) => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      res.json().then(cb);
    }
  });
};

Hex.put = (url, params, cb) => {
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      res.json().then(cb);
    }
  });
};

Hex.delete = (url, cb) => {
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      res.json().then(cb);
    }
  });
};

Hex.px = n => /^\d+$/.test(n) ? `${n}px` : n;

// 参考: https://segmentfault.com/a/1190000011966867
// 判断是否为邮箱地址
Hex.isEmail = str => /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
// 判断是否为身份证号
Hex.isIdCard = str => /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
// 判断是否为手机号
Hex.isPhoneNum = str => /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
// 判断是否为URL地址
Hex.isUrl = str => /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);

Hex.validAny = any => any !== null && any !== undefined;
Hex.validString = str => Hex.validAny(str) && str && str.toLowerCase() !== 'null' && str.toLowerCase() !== 'undefined' && str.trim().length > 0;
Hex.validNumber = num => Hex.validAny(num);
Hex.validId = num => Hex.validAny(num) && num > 0;

Hex.toString = (idx, lst) => lst[idx];

Hex.empty = () => {
};

Hex.fromNow = val => moment(val, moment.x).fromNow();
Hex.formatDate = val => moment(val, moment.x).format('YYYY-MM-DD');
Hex.format = val => moment(val, moment.x).format('YYYY-MM-DD HH:mm:ss');

Hex.capitalize = val => {
  if (!val) {
    return '';
  }
  const value = val.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default Hex;
