// One folder per client under src/clients/. Drop videos in a folder and they appear automatically.
// Optional: add client.json  { "title": "...", "description": "..." }  to a folder.
const videoFiles = import.meta.glob('./clients/*/*.{mp4,mov,webm,m4v}', { eager: true, query: '?url', import: 'default' })
const metaFiles = import.meta.glob('./clients/*/client.json', { eager: true, import: 'default' })

const pretty = (s) =>
  s.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
   .replace(/\b\w/g, (c) => c.toUpperCase())

const byFolder = {}
for (const [path, url] of Object.entries(videoFiles)) {
  const [, , folder, file] = path.split('/')
  ;(byFolder[folder] ||= []).push({ id: `${folder}/${file}`, url, file, title: pretty(file) })
}

const clients = Object.entries(byFolder)
  .map(([folder, videos]) => {
    const meta = metaFiles[`./clients/${folder}/client.json`] || {}
    videos.sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))
    const titles = meta.videoTitles || {}
    videos.forEach((v) => { if (titles[v.file]) v.title = titles[v.file] })
    return { folder, title: meta.title || pretty(folder), description: meta.description || '', order: meta.order ?? 99, videos }
  })
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))

export default clients
