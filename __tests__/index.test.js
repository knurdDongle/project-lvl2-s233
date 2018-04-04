import genDiff from '../src/';

const path1 = '__tests__/__fixtures__/before.json';
const path2 = '__tests__/__fixtures__/after.json';

const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

test('genDiff', () => {
  expect(genDiff(path1, path2)).toBe(expected);
});
