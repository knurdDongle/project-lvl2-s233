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
    const result = genDiff(path1, path2);
    expect(result).toBe(expected);
  });
  it('yaml', () => {
    const path1 = '__tests__/__fixtures__/before.yml';
    const path2 = '__tests__/__fixtures__/after.yml';
    const result = genDiff(path1, path2);
    expect(result).toBe(expected);
  });
});
