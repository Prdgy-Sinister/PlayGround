import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'

function previewHost() {
  try {
    const configuredUrl = process.env.APP_URL || readFileSync(`${process.env.OPENCODE_WEB_DIR}/app-url`, 'utf8').trim()
    return [new URL(configuredUrl).hostname]
  } catch {
    return []
  }
}

export default defineConfig({
  preview: {
    allowedHosts: previewHost(),
  },
})
