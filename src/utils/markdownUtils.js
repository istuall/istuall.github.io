import { marked } from 'marked'
import hljs from 'highlight.js'

// 自定义渲染器
const renderer = new marked.Renderer()

// 代码高亮
renderer.code = function(code, language) {
  const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
  const highlighted = hljs.highlight(code, { language: validLanguage }).value
  return `<pre><code class="hljs language-${validLanguage}">${highlighted}</code></pre>`
}

// 标题ID生成
renderer.heading = function(text, level) {
  // 移除HTML标签，保留纯文本
  const rawText = text.replace(/<[^>]*>/g, '')
  const id = rawText.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
  return `<h${level} id="${id}">${text}</h${level}>`
}

// 图片渲染优化
renderer.image = function(href, title, text) {
  return `<div class="image-container">
    <img src="${href}" alt="${text}" title="${title || ''}" class="post-image" loading="lazy" />
    ${title ? `<span class="image-caption">${title}</span>` : ''}
  </div>`
}

marked.use({ renderer, breaks: true, gfm: true })

/**
 * 解析 Front Matter
 * @param {string} content - 原始 Markdown 内容
 * @returns {Object} - { metadata, content }
 */
export function parseFrontMatter(content) {
  const result = { metadata: {}, content: content }
  const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/
  const match = content.match(frontMatterRegex)

  if (match) {
    const yamlStr = match[1]
    result.content = content.replace(frontMatterRegex, '').trim()
    
    // 简单的 YAML 解析
    yamlStr.split(/\r?\n/).forEach(line => {
      const parts = line.split(':')
      if (parts.length >= 2) {
        const key = parts[0].trim()
        let value = parts.slice(1).join(':').trim()
        // 去除引号
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1)
        }
        result.metadata[key] = value
      }
    })
  }
  return result
}

/**
 * 解析Markdown内容
 * @param {string} content - Markdown内容
 * @returns {string} - 解析后的HTML内容
 */
export function parseMarkdown(content) {
  try {
    // 如果包含 Front Matter，先剥离
    const { content: cleanContent } = parseFrontMatter(content)
    return marked(cleanContent)
  } catch (e) {
    console.error('Markdown解析错误:', e)
    return content
  }
}

/**
 * 生成文章目录
 * @param {string} content - Markdown内容
 * @returns {Array} - 目录结构数组
 */
export function generateTOC(content) {
  const headings = []
  const tokens = marked.lexer(content)
  
  tokens.forEach(token => {
    if (token.type === 'heading' && token.depth >= 2 && token.depth <= 4) {
      const text = token.text.replace(/<[^>]*>/g, '')
      const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      headings.push({
        level: token.depth,
        text: text,
        id: id
      })
    }
  })
  
  return headings
}

/**
 * 计算阅读时间
 * @param {string} content - 文章内容
 * @returns {number} - 预计阅读时间（分钟）
 */
export function calculateReadingTime(content) {
  const text = content.replace(/<[^>]*>/g, '')
  const cnWords = (text.match(/[\u4e00-\u9fa5]/g) || []).length
  const enWords = (text.match(/[a-zA-Z0-9]+/g) || []).length
  const totalWords = cnWords + enWords
  const wordsPerMinute = 300 // 中文阅读速度稍快
  return Math.ceil(totalWords / wordsPerMinute) || 1
}

/**
 * 生成文章摘要
 * @param {Object} post - 文章对象
 * @returns {string} - 文章摘要
 */
export function generateExcerpt(post, content = '') {
  if (post.excerpt) return post.excerpt
  
  // 如果有内容，尝试从内容生成
  if (content) {
    // 移除 Markdown 符号，保留纯文本
    const text = content
      .replace(/^#+\s+(.*)/gm, '') // 移除标题
      .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片
      .replace(/\[.*?\]\(.*?\)/g, '$1') // 移除链接保留文本
      .replace(/`{3}[\s\S]*?`{3}/g, '') // 移除代码块
      .replace(/`(.+?)`/g, '$1') // 移除行内代码
      .replace(/(\*\*|__)(.*?)\1/g, '$2') // 移除加粗
      .replace(/(\*|_)(.*?)\1/g, '$2') // 移除斜体
      .replace(/\n/g, ' ') // 换行变空格
      .slice(0, 150)
    
    return text.length >= 150 ? text + '...' : text
  }
  
  return post.subtitle || '点击阅读全文...'
}
