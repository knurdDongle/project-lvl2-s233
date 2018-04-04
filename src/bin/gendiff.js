#!/usr/bin/env node

/**
 * Module dependencies.
 */

import commander from 'commander';
import genDiff from '..';

commander
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .arguments('<file1> <file2>')
  .action((file1, file2) => console.log(genDiff(file1, file2)))
  .parse(process.argv);
