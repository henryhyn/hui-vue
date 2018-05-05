import Hex from '@/utils/Hex';

test('henryhyn@163.com is a email address', () => {
  expect(Hex.isEmail('henryhyn@163.com')).toBeTruthy();
});

test('12345678901 is not a phone number', () => {
  expect(Hex.isPhoneNum('12345678901')).toBeFalsy();
});

test('数组去重', () => {
  expect(Hex.uniq([1, 2, 3, 3, 4, 5, 5])).toEqual([1, 2, 3, 4, 5]);
});

test('pluck', () => {
  const stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
  expect(Hex.pluck(stooges, 'name')).toEqual(['moe', 'larry', 'curly']);
});

test('字符串拆分', () => {
  const text = '苹果,香蕉 ,null, undefined; 西红柿';
  expect(Hex.split(text)).toEqual(['苹果', '香蕉', '西红柿']);
  expect(Hex.split(null)).toEqual([]);
  expect(Hex.split('')).toEqual([]);
});
