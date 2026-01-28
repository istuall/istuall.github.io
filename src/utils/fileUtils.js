import { parseFrontMatter, generateExcerpt } from './markdownUtils'

// 自动导入所有 Markdown 文件 (eager: true 表示立即加载内容)
const markdownFiles = import.meta.glob('/blog/posts/*.md', { eager: true, query: '?raw', import: 'default' })

/**
 * 加载文章列表
 * @returns {Promise<Array>} - 文章列表
 */
export async function loadPosts() {
  const posts = []
  
  for (const path in markdownFiles) {
    const content = markdownFiles[path]
    const { metadata, content: cleanContent } = parseFrontMatter(content)
    
    // 从路径提取文件名 (例如 /blog/posts/example.md -> example.md)
    const fileName = path.split('/').pop()
    
    // 只有包含必要元数据的文章才会被添加
    if (metadata.title) {
      posts.push({
        title: metadata.title,
        subtitle: metadata.subtitle || '未分类',
        date: metadata.date || new Date().toISOString().split('T')[0],
        file: fileName,
        excerpt: metadata.excerpt || generateExcerpt({}, cleanContent),
        ...metadata // 包含其他元数据
      })
    }
  }
  
  // 按日期降序排序
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

/**
 * 加载文章内容
 * @param {string} fileName - 文章文件名
 * @returns {Promise<string>} - 文章内容
 */
export async function loadPostContent(fileName) {
  // 尝试直接匹配文件名
  const path = `/blog/posts/${fileName}`
  if (markdownFiles[path]) {
    return markdownFiles[path]
  }
  
  // 如果传入的是完整路径
  if (markdownFiles[fileName]) {
    return markdownFiles[fileName]
  }
  
  throw new Error(`文章 ${fileName} 未找到`)
}
