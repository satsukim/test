import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  // ファイルシステムの絶対パスかプロジェクトルートからの相対パスを指定
  //機能無効
  publicDir: false,
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
      '@': resolve(__dirname, './playground'),
    },
  },
  build: {
    lib: {
      // ビルドのエントリーポイント
      entry: resolve(__dirname, 'src/index.ts'),
      // どのようなモジュールフォーマットを出力するかを指定
      // ライブラリーではエントリーとして HTML を使用できない
      // 同じコードベースをブラウザ(es)とNode.js(cjs)の両方で使用できる
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') return `elements.mjs`;
        if (format === 'cjs') return `elements.cjs`;
        return `elements.${format}.js`;
      },
    },
  },
  test: {
    // Vitestが提供するAPIをJestのようにグローバルで利用する
    globals: true,
    // DOM（Document Object Model）をシミュレートしたものです。
    // これにより、ブラウザ上で実行されるようなテストをNode.js上で実行することが可能
    environment: 'happy-dom',
  },
});
