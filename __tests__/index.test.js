import fs from 'fs';
import genDiff from '../src/';

describe('difference', () => {
  const pathToResult1 = '__tests__/__fixtures__/flat/result';
  const pathToResult2 = '__tests__/__fixtures__/nested/result';
  const pathToResult3 = '__tests__/__fixtures__/result.plan';
  const pathToResult4 = '__tests__/__fixtures__/result.json';
  const expected1 = fs.readFileSync(pathToResult1, 'utf-8');
  const expected2 = fs.readFileSync(pathToResult2, 'utf-8');
  const expected3 = fs.readFileSync(pathToResult3, 'utf-8');
  const expected4 = fs.readFileSync(pathToResult4, 'utf-8');

  it('toJson json', () => {
    const path1 = '__tests__/__fixtures__/nested/before.json';
    const path2 = '__tests__/__fixtures__/nested/after.json';
    expect(genDiff(path1, path2, 'json')).toBe(expected4);
  });
  it('toJson yaml', () => {
    const path1 = '__tests__/__fixtures__/nested/before.yaml';
    const path2 = '__tests__/__fixtures__/nested/after.yaml';
    expect(genDiff(path1, path2, 'json')).toBe(expected4);
  });
  it('toJson ini', () => {
    const path1 = '__tests__/__fixtures__/nested/before.ini';
    const path2 = '__tests__/__fixtures__/nested/after.ini';
    expect(genDiff(path1, path2, 'json')).toBe(expected4);
  });
  it('plan json', () => {
    const path1 = '__tests__/__fixtures__/nested/before.json';
    const path2 = '__tests__/__fixtures__/nested/after.json';
    expect(genDiff(path1, path2, 'plain')).toBe(expected3);
  });
  it('plan yaml', () => {
    const path1 = '__tests__/__fixtures__/nested/before.yaml';
    const path2 = '__tests__/__fixtures__/nested/after.yaml';
    expect(genDiff(path1, path2, 'plain')).toBe(expected3);
  });
  it('plan ini', () => {
    const path1 = '__tests__/__fixtures__/nested/before.ini';
    const path2 = '__tests__/__fixtures__/nested/after.ini';
    expect(genDiff(path1, path2, 'plain')).toBe(expected3);
  });
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

  it('json tree', () => {
    const path1 = '__tests__/__fixtures__/nested/before.json';
    const path2 = '__tests__/__fixtures__/nested/after.json';
    expect(genDiff(path1, path2)).toBe(expected2);
  });
  it('yaml tree', () => {
    const path1 = '__tests__/__fixtures__/nested/before.yaml';
    const path2 = '__tests__/__fixtures__/nested/after.yaml';
    expect(genDiff(path1, path2)).toBe(expected2);
  });
  it('ini1 tree', () => {
    const path1 = '__tests__/__fixtures__/nested/before.ini';
    const path2 = '__tests__/__fixtures__/nested/after.ini';
    expect(genDiff(path1, path2)).toBe(expected2);
  });
});
