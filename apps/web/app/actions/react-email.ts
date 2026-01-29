'use server';

import commonjsPlugin from '@babel/plugin-transform-modules-commonjs';
import type { ClientId, RenderResponse } from '@email-renderer/types';
import { BASE_TAILWIND_CONFIG, ALL_CLIENTS } from '@/lib/constants';
import * as EmailComponents from '@react-email/components';
import typescriptPreset from '@babel/preset-typescript';
import { pretty, render } from '@react-email/render';
import reactPreset from '@babel/preset-react';
import { transformSync } from '@babel/core';
import React from 'react';

const RENDERER_URL = process.env.RENDERER_URL || 'http://localhost:3001';
const RENDERER_API_KEY = process.env.RENDERER_API_KEY;

async function convertReactEmailToHtml(code: string): Promise<string> {
  let processedCode = code;

  processedCode = processedCode.replace(
    /import\s+.*?\s+from\s+['"][^'"]*tailwind\.config['"];?/g,
    `const tailwindConfig = ${JSON.stringify(BASE_TAILWIND_CONFIG)};`,
  );

  processedCode = processedCode.replace(/process\.env\.(\w+)/g, (match, envVar) => {
    return `(typeof process !== 'undefined' && process.env && process.env.${envVar}) || ''`;
  });

  const result = transformSync(processedCode, {
    presets: [
      [typescriptPreset, { isTSX: true, allExtensions: true }],
      [reactPreset, { runtime: 'classic' }],
    ],
    plugins: [[commonjsPlugin, { loose: true }]],
    filename: 'email.tsx',
  });

  if (!result?.code) {
    throw new Error('Failed to transform TSX code');
  }

  const requireFn = (id: string) => {
    if (id === 'react') return React;
    if (id === '@react-email/components') return EmailComponents;
    if (id.includes('tailwind.config')) return BASE_TAILWIND_CONFIG;
    throw new Error(
      `Cannot find module '${id}'. Only 'react' and '@react-email/components' are supported.`,
    );
  };

  const processEnv = {
    VERCEL_URL: process.env.VERCEL_URL || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
  };

  const moduleObj = { exports: {} };
  const exportsObj = moduleObj.exports;

  const processObj = { env: processEnv };

  const func = new Function(
    'require',
    'React',
    'EmailComponents',
    'module',
    'exports',
    'process',
    `${result.code}\nreturn module.exports.default || module.exports;`,
  );

  const Component = func(requireFn, React, EmailComponents, moduleObj, exportsObj, processObj);

  if (!Component || typeof Component !== 'function') {
    throw new Error('Code must export a default React component function');
  }

  const props = Component.PreviewProps || {};
  const html = await render(React.createElement(Component, props));
  return await pretty(html);
}

export async function renderReactEmail(reactEmailCode: string, clients: ClientId[]) {
  if (!reactEmailCode || typeof reactEmailCode !== 'string') {
    throw new Error("Missing or invalid 'reactEmailCode' field");
  }

  const jsxCode = reactEmailCode.trim();
  if (!jsxCode) {
    throw new Error('React Email code cannot be empty');
  }

  if (!clients || !Array.isArray(clients)) {
    throw new Error("Missing or invalid 'clients' field");
  }

  const invalidClients = clients.filter((id: unknown) => !ALL_CLIENTS.includes(id as ClientId));

  if (invalidClients.length > 0) {
    throw new Error(`Invalid client IDs: ${invalidClients.join(', ')}`);
  }

  let html: string;
  try {
    html = await convertReactEmailToHtml(jsxCode);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to convert React Email code');
  }

  if (!RENDERER_API_KEY) {
    throw new Error('RENDERER_API_KEY is not configured');
  }

  const response = await fetch(`${RENDERER_URL}/render`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RENDERER_API_KEY}`,
    },
    body: JSON.stringify({ html, clients }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Renderer error:', errorText);
    throw new Error('Render service error');
  }

  const data: RenderResponse = await response.json();

  return {
    ...data,
    convertedHtml: html,
  };
}
