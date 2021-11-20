import fs from 'fs'
import path from 'path'
import url from 'url'

async function getTitle(file) {
  const content = await fs.promises.readFile(file, 'utf8')
  const [firstLine] = content.trim().split('\n')
  if (firstLine.startsWith('# ')) {
    return firstLine.slice(2)
  }

  throw new Error(`${file} 的开头并不是 #`)
}

async function buildSection(prefix, id) {
  const currentPath = path.join(prefix, id)
  const stat = await fs.promises.stat(currentPath)

  if (stat.isFile()) {
    if (!id.endsWith('.md')) {
      console.log(`发现文件 ${currentPath}, 但是不是 .md 后缀，忽略`)
      return;
    }

    return {
      id: id.slice(0, -3),
      title: await getTitle(currentPath)
    }
  }

  if (stat.isDirectory()) {
    const children = []
    const files = await fs.promises.readdir(currentPath)

    for (const child of files) {
      if (child === 'index.md') { continue }
      children.push(await buildSection(currentPath, child))
    }

    return {
      id,
      title: await getTitle(path.join(currentPath, 'index.md')),
      children: children.filter(Boolean).sort((a, b) => a.id.localeCompare(b.id)),
    }
  }

  throw new Error(`${prefix}/${id} 不存在`)
}

const prefix = path.join(url.parse(import.meta.url).pathname, '../../public/sections')
const files = await fs.promises.readdir(prefix)
const json = []
for (const file of files) {
  json.push(await buildSection(prefix, file))
}

const results = json.filter(Boolean).sort((a, b) => a.id.localeCompare(b.id))
const resultString = JSON.stringify(results)

await fs.promises.writeFile(path.join(prefix, '../sections.json'), resultString)
