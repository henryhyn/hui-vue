import Hex from '@/utils/Hex';

test('henryhyn@163.com is a email address', () => {
  expect(Hex.isEmail('henryhyn@163.com')).toBeTruthy();
});

test('12345678901 is not a phone number', () => {
  expect(Hex.isPhoneNum('12345678901')).toBeFalsy();
});