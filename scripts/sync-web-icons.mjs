import { copyFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const generatedIcons = resolve(root, 'icons')
const publicIcons = resolve(root, 'public/icons')

await mkdir(publicIcons, { recursive: true })
for (const size of [48, 72, 96, 128, 192, 256, 512]) {
  await copyFile(resolve(generatedIcons, `icon-${size}.webp`), resolve(publicIcons, `icon-${size}.webp`))
}

await copyFile(
  resolve(root, 'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png'),
  resolve(root, 'public/apple-touch-icon.png'),
)

console.log('Synced PWA WebP icons and the Apple touch icon into public/.')
