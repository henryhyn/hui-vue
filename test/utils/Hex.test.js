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

test('数组合并', () => {
  const a = [{ x: 1, z: 2, y: 3 }, { x: 2, y: 3, z: 3 }];
  const b = [{ x: 1, y: 2 }, { x: 2, z: 2 }];
  expect(Hex.mergeBy('x', a, b)).toEqual([{ x: 1, z: 2, y: 2 }, { x: 2, y: 3, z: 2 }]);
});

test('reduce', () => {
  const arr = [12, 45, 21, 65, 38, 76, 108, 43];
  expect(Hex.min(arr)).toEqual(12);
  expect(Hex.max(arr)).toEqual(108);
  expect(Hex.sum(arr)).toEqual(408);
});

test('分组', () => {
  const arr = [
    { name: "YZW", age: 27 },
    { area: "GZ", name: "TYJ", age: 25 },
    { name: "AAA", age: 23 },
    { area: "FS", name: "BBB", age: 21 },
    { area: "SZ", name: "CCC", age: 19 }
  ];
  expect(Hex.groupBy(arr, 'area')[undefined]).toEqual([{ name: 'YZW', age: 27 }, { name: 'AAA', age: 23 }]);
});
