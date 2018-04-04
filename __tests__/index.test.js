import genDiff from '../src/';

const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

describe('difference', () => {
  it('json', () => {
    const path1 = '__tests__/__fixtures__/before.json';
    const path2 = '__tests__/__fixtures__/after.json';
    expect(genDiff(path1, path2)).toBe(expected);
  });
  it('yaml', () => {
    const path1 = '__tests__/__fixtures__/before.yaml';
    const path2 = '__tests__/__fixtures__/after.yaml';
    expect(genDiff(path1, path2)).toBe(expected);
  });
  it('ini', () => {
    const path1 = '__tests__/__fixtures__/before.ini';
    const path2 = '__tests__/__fixtures__/after.ini';
    expect(genDiff(path1, path2)).toBe(expected);
  });
});
