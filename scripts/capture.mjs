#!/usr/bin/env node
// Capture a deployed page in desktop and mobile viewports.
// Exit 75 for temporary browser/navigation infrastructure failures.
// Exit 1 for invalid arguments, HTTP 4xx, script errors, or rendering defects.
import { createRequire } from 'node:module'
import { readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

class CaptureError extends Error {
  constructor(message, code) {
    super(message)
    this.name = 'CaptureError'
    this.code = code
  }
}

const pageUrl = process.env.CAPTURE_URL
const outputDir = process.env.CAPTURE_DIR
if (!pageUrl) throw new CaptureError('CAPTURE_URL is not set.', 1)
if (!outputDir) throw new CaptureError('CAPTURE_DIR is not set.', 1)

let parsedUrl
try {
  parsedUrl = new URL(pageUrl)
} catch {
  throw new CaptureError(`CAPTURE_URL is not a valid URL: ${pageUrl}`, 1)
}
if (!/^https?:$/.test(parsedUrl.protocol)) {
  throw new CaptureError('CAPTURE_URL must use http or https.', 1)
}

const home = process.env.HOME || ''
const runtime = join(home, '.local/share/omgithub-playwright')
let chromium
let launchOptions
try {
  const require = createRequire(join(runtime, 'package.json'))
  chromium = require('playwright').chromium
  try {
    const config = JSON.parse(readFileSync(join(runtime, 'linux.json'), 'utf8'))
    launchOptions = config.browser.launchOptions
  } catch {
    launchOptions = {
      headless: true,
      args: ['--enable-gpu', '--ignore-gpu-blocklist', '--enable-unsafe-webgpu'],
    }
  }
  if (!process.env.DISPLAY) {
    try {
      process.env.DISPLAY = ':' + readFileSync(join(runtime, 'display'), 'utf8').trim()
    } catch {}
  }
} catch (error) {
  console.error(`[capture] browser runtime unavailable: ${error.message}`)
  process.exit(75)
}

async function timed(label, fn) {
  const began = Date.now()
  try {
    return await fn()
  } finally {
    console.log(`[capture] [timing] ${label}: ${Date.now() - began} ms`)
  }
}

function transient(error) {
  const message = String(error?.message || error)
  return (
    error?.name === 'TimeoutError' ||
    /net::ERR_|ECONNREFUSED|ECONNRESET|ETIMEDOUT|ENOTFOUND|EAI_AGAIN|socket hang up|Target closed|Browser closed|browser has been closed|crash/i.test(message)
  )
}

function sameOrigin(value) {
  try {
    return new URL(value).origin === parsedUrl.origin
  } catch {
    return false
  }
}

async function locateStart(page) {
  const selector = process.env.CAPTURE_START_SELECTOR || '#start-btn'
  const candidate = page.locator(selector).first()
  if (await candidate.count().catch(() => 0)) {
    if ((await candidate.isVisible().catch(() => false)) && (await candidate.isEnabled().catch(() => false))) {
      return candidate
    }
  }
  const generic = page.getByRole('button', { name: /^(?:start|play)(?:\s+(?:game|now))?$/i })
  if ((await generic.count().catch(() => 0)) === 1) return generic.first()
  return null
}

async function waitForRendered(page, name) {
  await timed(`${name} render-ready`, async () => {
    await page.locator('body').waitFor({ state: 'visible', timeout: 30000 })
    await page
      .waitForFunction(() => document.fonts?.status === 'loaded', null, { timeout: 15000 })
      .catch(() => {})
    await page.waitForFunction(
      () => Boolean(document.querySelector('#app canvas, canvas#scene, #start-btn')),
      null,
      { timeout: 20000 },
    )
  })
}

async function startGame(page, name) {
  if (process.env.CAPTURE_AUTO_START === 'false') {
    await page.waitForTimeout(700)
    return
  }
  await page.locator('#loading').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {})
  const control = await locateStart(page)
  if (!control) {
    console.log(`[capture] ${name}: no start control found, capturing current view`)
    await page.waitForTimeout(700)
    return
  }
  await timed(`${name} start`, async () => {
    let settled = false
    try {
      await control.click({ timeout: 8000, noWaitAfter: true })
      settled = true
    } catch (error) {
      // The intro click can land while the WebGL world is compiling and block
      // the action promise. Fall back to a direct DOM click below.
      if (!transient(error) && error.name !== 'TimeoutError') throw error
      console.log(`[capture] ${name}: click did not settle, dispatching directly`)
    }
    const started = () =>
      page
        .evaluate(
          () =>
            window.SAMURAI?.game?.started === true ||
            document.getElementById('intro')?.classList.contains('gone') === true,
        )
        .catch(() => false)
    if (!settled || !(await started())) {
      await control.evaluate((element) => element.click()).catch(() => {})
    }
    await page
      .waitForFunction(
        () =>
          window.SAMURAI?.game?.started === true ||
          document.getElementById('intro')?.classList.contains('gone') === true ||
          !document.getElementById('intro'),
        null,
        { timeout: 30000 },
      )
      .catch(() => {})
    await page.locator('#hud').waitFor({ state: 'visible', timeout: 8000 }).catch(() => {})
    await page.waitForTimeout(1800)
  })
}

const views = [
  { name: 'desktop', width: 1280, height: 800, mobile: false },
  { name: 'mobile', width: 390, height: 844, mobile: true },
]

const defects = []
let exitCode = 0
let browser

try {
  browser = await timed('browser launch', () =>
    chromium.launch({ ...launchOptions, timeout: 30000 }),
  )
} catch (error) {
  console.error(`[capture] browser launch failed: ${error.message}`)
  process.exit(75)
}

for (const view of views) {
  let context
  const viewDefects = []
  try {
    context = await timed(`${view.name} context`, () =>
      browser.newContext({
        viewport: { width: view.width, height: view.height },
        deviceScaleFactor: 1,
        isMobile: view.mobile,
        hasTouch: view.mobile,
      }),
    )
    const page = await timed(`${view.name} page`, () => context.newPage())
    page.setDefaultTimeout(30000)
    page.on('pageerror', (error) => {
      console.error(`[capture] ${view.name} page error: ${error.message}`)
      viewDefects.push(`page error: ${error.message}`)
    })
    page.on('response', (response) => {
      if (response.status() >= 400 && sameOrigin(response.url()) && !/favicon/i.test(response.url())) {
        viewDefects.push(`HTTP ${response.status()}: ${response.url()}`)
      }
    })

    let response
    try {
      response = await timed(`${view.name} navigate`, () =>
        page.goto(pageUrl, { waitUntil: 'load', timeout: 45000 }),
      )
    } catch (error) {
      throw new CaptureError(
        `navigation failed: ${error.message}`,
        transient(error) ? 75 : 1,
      )
    }
    if (!response) throw new CaptureError('navigation returned no response.', 75)
    if (!response.ok()) {
      const status = response.status()
      const temporary = status === 408 || status === 429 || status >= 500
      throw new CaptureError(`HTTP ${status} loading ${pageUrl}`, temporary ? 75 : 1)
    }

    await waitForRendered(page, view.name)
    await startGame(page, view.name)

    const file = join(outputDir, `final-${view.name}.png`)
    try {
      await timed(`${view.name} screenshot`, () =>
        page.screenshot({ path: file, timeout: 30000 }),
      )
    } catch (error) {
      throw new CaptureError(
        `screenshot failed: ${error.message}`,
        transient(error) || !browser.isConnected() ? 75 : 1,
      )
    }
    const size = statSync(file).size
    if (!size) throw new CaptureError(`screenshot is empty: ${file}`, 1)
    console.log(`[capture] ${view.name}: ${file} (${size} bytes)`)

    if (viewDefects.length) defects.push(...viewDefects.map((item) => `${view.name}: ${item}`))
  } catch (error) {
    const code = error instanceof CaptureError ? error.code : transient(error) ? 75 : 1
    console.error(`[capture] ${view.name} failed: ${error.message}`)
    if (exitCode === 0) exitCode = code
    await context?.close().catch(() => {})
    if (code === 75) break
    continue
  }
  await timed(`${view.name} close`, () => context.close()).catch(() => {})
}

await timed('browser close', () => browser.close()).catch((error) => {
  if (!exitCode) exitCode = transient(error) ? 75 : 1
})

if (!exitCode && defects.length) {
  console.error(`[capture] rendering defects: ${defects.join('; ')}`)
  exitCode = 1
}

console.log(`[capture] exit ${exitCode}`)
process.exit(exitCode)
