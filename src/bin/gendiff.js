#!/usr/bin/env node

/**
 * Module dependencies.
 */

import commander from 'commander';

commander
  .description(' Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

if (!commander.args.length) commander.help();
