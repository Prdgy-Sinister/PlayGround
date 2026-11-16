import { defineConfig } from 'vite'

// The deployed preview is reached through a public tunnel hostname, so the
// preview server must accept Host headers other than localhost.
export default defineConfig({
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
})
