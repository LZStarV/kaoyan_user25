import js from '@eslint/js';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import { defineConfig } from 'eslint/config';

// 微信小程序全局变量
const weappGlobals = {
  // 小程序核心全局对象
  wx: 'readonly',
  App: 'readonly',
  Page: 'readonly',
  Component: 'readonly',
  Behavior: 'readonly',

  // 全局方法与API
  getApp: 'readonly',
  getCurrentPages: 'readonly',
  requirePlugin: 'readonly',
  requireMiniProgram: 'readonly',

  // ES6 全局对象
  Promise: 'readonly',
  Set: 'readonly',
  Map: 'readonly',
  Symbol: 'readonly',
  ArrayBuffer: 'readonly',
};

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        requireConfigFile: false,
      },
      globals: {
        ...globals.browser,
        ...weappGlobals, // 小程序特有全局变量
      },
    },
    rules: {
      'no-var': 'error',
      semi: 'error',
      quotes: ['error', 'single', { avoidEscape: true }],
      'prefer-const': 'error',
      'arrow-body-style': 'warn',
      'no-undef': 'error',
      'no-restricted-globals': [
        'error',
        { name: 'window', message: '小程序环境无 window 对象' },
        { name: 'document', message: '小程序环境无 document 对象' },
        { name: 'localStorage', message: '请使用 wx.setStorageSync 替代' },
      ],
      eqeqeq: 'error',
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  // WXS 文件单独配置（WXS 不支持 ES6 语法，需单独处理）
  {
    files: ['**/*.wxs'],
    languageOptions: {
      ecmaVersion: 5, // WXS 仅支持 ES5 语法
      globals: {
        ...weappGlobals,
        getRegExp: 'readonly', // WXS 特有方法
        Math: 'readonly',
      },
    },
    rules: {
      'no-var': 'off', // WXS 只能用 var
      'prefer-const': 'off', // WXS 不支持 const
      strict: 'off', // WXS 不支持严格模式
    },
  },
  {
    ignores: [
      '**/node_modules/**',
      '**/miniprogram_npm/**',
      '**/static/**',
      '**/assets/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/out/**',
      '**/public/**',
      '**/temp/**',
      '**/logs/**',
      '**/debug.log',
      '**/*.min.js',
      '**/*.wxml',
      '**/*.wxss',
    ],
  },
]);
