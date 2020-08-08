import merge from 'deepmerge'
import { createSpaConfig } from '@open-wc/building-rollup'
import postcss from 'rollup-plugin-postcss'
import atImport from 'postcss-import'

const baseConfig = createSpaConfig({
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: true,
})

export default [
  merge(baseConfig, {
    input: 'index.html'
  }),
  {
    input: 'src/styles/main.css',
    output: {
      dir: 'dist',
    },
    plugins: [
      postcss({
        extract: 'style.css',
        plugins: [
          atImport
        ]
      })
    ]
  }
]