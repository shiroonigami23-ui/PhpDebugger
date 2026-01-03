import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')
const distDir = path.join(projectRoot, '..', 'dist')
const outputDir = path.join(projectRoot, '.output', 'public')

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

// Copy built files from .output/public to dist
if (fs.existsSync(outputDir)) {
  console.log('Copying Nuxt output to dist...')
  fs.cpSync(outputDir, distDir, { recursive: true, force: true })
  console.log('✓ Extension assets ready in dist/')
} else {
  console.warn('⚠ Nuxt output not found. Running: nuxi generate')
  console.log('Create minimal dist files for now...')

  // Create minimal placeholder files
  const htmlTemplate = (title) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; }
    .container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .content { max-width: 600px; background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 20px; }
    h1 { font-size: 20px; margin-bottom: 10px; }
    p { font-size: 14px; color: #cbd5e1; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <h1>${title}</h1>
      <p>This is a placeholder. Run <code>npm run build</code> to generate the full UI.</p>
    </div>
  </div>
</body>
</html>`

  fs.writeFileSync(path.join(distDir, 'devtools.html'), htmlTemplate('PHP Debugger Devtools'))
  fs.writeFileSync(path.join(distDir, 'popup.html'), htmlTemplate('PHP Debugger Popup'))
  fs.writeFileSync(path.join(distDir, 'background.js'), '// Service worker placeholder')
  console.log('✓ Placeholder files created in dist/')
}
