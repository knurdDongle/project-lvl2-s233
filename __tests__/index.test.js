import fs from 'fs';
import genDiff from '../src/';

const pathToResult1 = '__tests__/__fixtures__/flat/result';
const pathToResult2 = '__tests__/__fixtures__/nested/result';
const expected1 = fs.readFileSync(pathToResult1, 'utf-8');
const expected2 = fs.readFileSync(pathToResult2, 'utf-8');

describe('difference', () => {
  it('json', () => {
    const path1 = '__tests__/__fixtures__/flat/before.json';
    const path2 = '__tests__/__fixtures__/flat/after.json';
    expect(genDiff(path1, path2)).toBe(expected1);
  });
  it('yaml', () => {
    const path1 = '__tests__/__fixtures__/flat/before.yaml';
    const path2 = '__tests__/__fixtures__/flat/after.yaml';
    expect(genDiff(path1, path2)).toBe(expected1);
  });
  it('ini', () => {
    const path1 = '__tests__/__fixtures__/flat/before.ini';
    const path2 = '__tests__/__fixtures__/flat/after.ini';
    expect(genDiff(path1, path2)).toBe(expected1);
  });
});

describe('difference1', () => {
  it('json1', () => {
    const path1 = '__tests__/__fixtures__/nested/before.json';
    const path2 = '__tests__/__fixtures__/nested/after.json';
    expect(genDiff(path1, path2)).toBe(expected2);
  });
  it('yaml1', () => {
    const path1 = '__tests__/__fixtures__/nested/before.yaml';
    const path2 = '__tests__/__fixtures__/nested/after.yaml';
    expect(genDiff(path1, path2)).toBe(expected2);
  });
  it('ini1', () => {
    const path1 = '__tests__/__fixtures__/nested/before.ini';
    const path2 = '__tests__/__fixtures__/nested/after.ini';
    expect(genDiff(path1, path2)).toBe(expected2);
  });
});
