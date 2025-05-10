/* eslint-disable */

import * as fs from 'fs'
import * as path from 'path'

// Types
interface JapaneseLine {
  number: number
  content: string
  japanese: string
}

interface FileResult {
  file: string
  lines: JapaneseLine[]
}

// Japanese character ranges (Unicode)
const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/
// Comment patterns
const singleLineComment = /\/\/.*/g
const multiLineComment = /\/\*[\s\S]*?\*\//g

function removeComments(content: string): string {
  return content.replace(multiLineComment, '').replace(singleLineComment, '')
}

function findJapaneseInFile(filePath: string): FileResult {
  const content = fs.readFileSync(filePath, 'utf8')
  const contentWithoutComments = removeComments(content)
  const lines = contentWithoutComments.split('\n')
  const japaneseLines: JapaneseLine[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (japaneseRegex.test(line)) {
      const japanese = line.match(new RegExp(`[${japaneseRegex.source}]+`, 'g'))?.join('') || ''
      japaneseLines.push({
        number: i + 1,
        content: line.trim(),
        japanese,
      })
    }
  }

  return {
    file: filePath,
    lines: japaneseLines,
  }
}

function findTypeScriptFiles(dir: string): string[] {
  const files: string[] = []

  function scan(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)

      if (entry.isDirectory()) {
        // Skip node_modules and .git directories
        if (entry.name !== 'node_modules' && entry.name !== '.git') {
          scan(fullPath)
        }
      } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
        files.push(fullPath)
      }
    }
  }

  scan(dir)
  return files
}

// Main execution
const projectDir = process.argv[2] || '.'
const tsFiles = findTypeScriptFiles(projectDir)
const results: FileResult[] = []

for (const file of tsFiles) {
  const result = findJapaneseInFile(file)
  if (result.lines.length > 0) {
    results.push(result)
  }
}

// Output results
console.log('\nFiles containing Japanese characters (excluding comments):\n')

if (results.length === 0) {
  console.log('No Japanese characters found in code (excluding comments).')
} else {
  results.forEach((result) => {
    console.log(`\nFile: ${result.file}`)
    result.lines.forEach((line) => {
      console.log(`  Line ${line.number}: ${line.content}`)
      console.log(`  Japanese found: ${line.japanese}\n`)
    })
  })
}
