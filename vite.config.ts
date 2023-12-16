import { readFileSync } from 'node:fs'
import { loadEnv, Plugin } from 'vite'
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import browserslistToEsbuild from 'browserslist-to-esbuild'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  setEnv(mode)
  return {
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
      envPlugin(),
      devServerPlugin(),
      sourcemapPlugin(),
      buildPathPlugin(),
      basePlugin(),
      importPrefixPlugin(),
      htmlPlugin(mode),
      browserslistPlugin(),
      setupProxyPlugin(),
      viTestPlugin()
    ],
  }
})

function setEnv(mode: string) {
  Object.assign(
    process.env,
    loadEnv(mode, '.', ['VITE_', 'NODE_ENV', 'PUBLIC_URL'])
  )
  process.env.NODE_ENV ||= mode
  const { homepage } = JSON.parse(readFileSync('package.json', 'utf-8'))
  process.env.PUBLIC_URL ||= homepage
    ? `${
        homepage.startsWith('http') || homepage.startsWith('/')
          ? homepage
          : `/${homepage}`
      }`.replace(/\/$/, '')
    : ''
}

// Expose `process.env` environment variables to your client code
// https://vitejs.dev/guide/env-and-mode.html#env-variables
function envPlugin(): Plugin {
  return {
    name: 'env-plugin',
    config(_, { mode }) {
      const env = loadEnv(mode, '.', ['VITE_', 'NODE_ENV', 'PUBLIC_URL'])
      return {
        define: Object.fromEntries(
          Object.entries(env).map(([key, value]) => [
            `process.env.${key}`,
            JSON.stringify(value),
          ])
        ),
      }
    },
  }
}

// Setup HOST, PORT
// https://vitejs.dev/config/server-options.html#server-host
// https://vitejs.dev/config/server-options.html#server-port
function devServerPlugin(): Plugin {
  return {
    name: 'dev-server-plugin',
    config(_, { mode }) {
      const { HOST, PORT } = loadEnv(mode, '.', ['HOST', 'PORT'])
      return {
        server: {
          host: HOST || 'localhost',
          port: parseInt(PORT || '3000', 10),
          open: true,
        },
      }
    },
  }
}

// https://vitejs.dev/config/build-options.html#build-sourcemap
function sourcemapPlugin(): Plugin {
  return {
    name: 'sourcemap-plugin',
    config(_, { mode }) {
      const { GENERATE_SOURCEMAP } = loadEnv(mode, '.', ['GENERATE_SOURCEMAP'])
      return {
        build: {
          sourcemap: GENERATE_SOURCEMAP === 'true',
        },
      }
    },
  }
}

// https://vitejs.dev/config/build-options.html#build-outdir
function buildPathPlugin(): Plugin {
  return {
    name: 'build-path-plugin',
    config(_, { mode }) {
      const { BUILD_PATH } = loadEnv(mode, '.', ['BUILD_PATH'])
      return {
        build: {
          outDir: BUILD_PATH || 'build',
        },
      }
    },
  }
}

// https://vitejs.dev/config/shared-options.html#base
function basePlugin(): Plugin {
  return {
    name: 'base-plugin',
    config(_, { mode }) {
      const { PUBLIC_URL } = loadEnv(mode, '.', ['PUBLIC_URL'])
      return {
        base: PUBLIC_URL || '',
      }
    },
  }
}

// To resolve modules from node_modules, you can prefix paths with ~
// https://create-react-app.dev/docs/adding-a-sass-stylesheet
// https://vitejs.dev/config/shared-options.html#resolve-alias
function importPrefixPlugin(): Plugin {
  return {
    name: 'import-prefix-plugin',
    config() {
      return {
        resolve: {
          alias: [{ find: /^~([^/])/, replacement: '$1' }],
        },
      }
    },
  }
}

// Configuring the Proxy Manually
// https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
// https://vitejs.dev/guide/api-plugin.html#configureserver
function setupProxyPlugin(): Plugin {
  return {
    name: 'setup-proxy-plugin',
    config(_, { mode }) {
      const { VITE_API_BASE_URL } = loadEnv(mode, '.', ['VITE_API_BASE_URL'])
      const apiUrl = VITE_API_BASE_URL || 'http://localhost:8000'
      return {
        server: {
          proxy: {
            '/api': {
              target: apiUrl,
              secure: false,
              changeOrigin: true,
              configure: (proxy) => {
                proxy.on('proxyReq', (proxyReq) => {
                  proxyReq.setHeader('origin', apiUrl.replace('/server/', ''))
                })
              },
            },
          },
        },
      }
    },
  }
}

// Replace %ENV_VARIABLES% in index.html
// https://vitejs.dev/guide/api-plugin.html#transformindexhtml
function htmlPlugin(mode: string): Plugin {
  const env = loadEnv(mode, '.', ['VITE_', 'NODE_ENV', 'PUBLIC_URL'])
  return {
    name: 'html-plugin',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html) {
        return html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match)
      },
    },
  }
}

function browserslistPlugin(): Plugin {
  return {
    name: 'browser-list-plugin',
    config() {
      return {
        build: {
          target: browserslistToEsbuild([
            '>0.2%',
            'not dead',
            'not op_mini all',
            'not safari < 10',
            'not chrome < 51',
            'not android < 5',
            'not ie < 12',
          ]),
        },
      }
    },
  }
}

function viTestPlugin(): Plugin {
  return {
    name: 'vitest-plugin',
    config() {
      return {
        test: {
          globals: true,
          environment: 'happy-dom',
          setupFiles: './src/setupTests.ts',
        },
      }
    },
  }
}
