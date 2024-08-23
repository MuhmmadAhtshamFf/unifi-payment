import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js', 
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs', 
      sourcemap: true,
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm', 
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    terser(), 
  ],
};
