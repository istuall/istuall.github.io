/**
 * 为代码块添加复制按钮
 */
export function addCopyButtonsToCodeBlocks() {
  setTimeout(() => {
    // 兼容 .markdown-body 和 .post-body
    const codeBlocks = document.querySelectorAll('.markdown-body pre, .post-body pre')
    codeBlocks.forEach(block => {
      // 避免重复添加
      if (block.parentElement.classList.contains('code-wrapper')) return
      if (block.querySelector('.copy-btn')) return

      // 创建包装器以便定位按钮
      const wrapper = document.createElement('div')
      wrapper.className = 'code-wrapper'
      block.parentNode.insertBefore(wrapper, block)
      wrapper.appendChild(block)

      const copyBtn = document.createElement('button')
      copyBtn.className = 'copy-btn'
      copyBtn.innerHTML = '📋' // 使用图标更简洁
      copyBtn.title = '复制代码'
      
      copyBtn.onclick = () => {
        const code = block.querySelector('code')?.textContent || block.textContent
        navigator.clipboard.writeText(code).then(() => {
          copyBtn.innerHTML = '✅'
          setTimeout(() => {
            copyBtn.innerHTML = '📋'
          }, 2000)
        }).catch(err => {
          console.error('复制代码失败:', err)
          copyBtn.innerHTML = '❌'
        })
      }
      wrapper.appendChild(copyBtn)
    })
  }, 200)
}

/**
 * 初始化代码高亮 (已弃用，高亮在 markdown解析时处理)
 */
export function initCodeHighlighting() {
  console.log('代码高亮已集成在 Markdown 解析器中')
}
