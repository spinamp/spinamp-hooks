import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import {terser} from 'rollup-plugin-terser';

import packageJson from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: 'react-lib',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      json(),
      typescript({module: 'ESNext', tsconfig: './tsconfig.json'}),
      terser(),
    ],
  },
  {
    input: 'lib/esm/index.d.ts',
    output: [{file: packageJson.types, format: 'esm'}],
    plugins: [dts()],
  },
];
