document.addEventListener('DOMContentLoaded', () => {
    const uploadInput = document.getElementById('upload');
    const downloadBtn = document.getElementById('download-btn');
    const previewContainer = document.getElementById('preview-container');

    // 默认配置 docx-preview
    const docxOptions = {
        className: "docx", // class name/prefix for default and document style classes
        inWrapper: true, // enables rendering of wrapper around document content
        ignoreWidth: false, // disables rendering width of page
        ignoreHeight: false, // disables rendering height of page
        ignoreFonts: false, // disables fonts rendering
        breakPages: true, // enables page breaking on page breaks
        ignoreLastRenderedPageBreak: true, // disables page breaking on lastRenderedPageBreak elements
        experimental: false, // enables experimental features (tab stops calculation)
        trimXmlDeclaration: true, // if true, xml declaration will be removed from xml documents before parsing
        useBase64URL: false, // if true, images, fonts, etc. will be converted to base 64 URL, otherwise URL.createObjectURL is used
        renderChanges: false, // enables experimental rendering of document changes (track changes)
        renderHeaders: true, // enables rendering of headers
        renderFooters: true, // enables rendering of footers
        renderFootnotes: true, // enables rendering of footnotes
        renderEndnotes: true, // enables rendering of endnotes
        debug: false, // enables additional logging
    };

    uploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) return;

        // 清空预览区域，移除之前的 placeholder 或文档
        previewContainer.innerHTML = '';
        
        // 使用 docx-preview 渲染
        // 注意：docx.renderAsync 接受 Blob/File, 容器元素, 样式元素(可选), 配置(可选)
        // 我们直接传入文件对象
        docx.renderAsync(file, previewContainer, null, docxOptions)
            .then(() => {
                downloadBtn.disabled = false;
                console.log("文档渲染完成");
            })
            .catch(handleError);
    });

    function handleError(err) {
        console.error(err);
        alert('文件解析失败，请检查文件格式。');
        previewContainer.innerHTML = '<div class="placeholder-text">解析出错，请重试</div>';
    }

    downloadBtn.addEventListener('click', () => {
        // docx-preview 会在 previewContainer 里面生成一个 .docx-wrapper 元素
        // 我们需要截取这个元素，或者里面的 .docx 元素
        // 通常截取 .docx-wrapper 可以包含背景等，但为了打印效果，我们可能只想截取 .docx (实际的纸张)
        // 但如果有多页，docx-preview 会生成多个 section.docx 或者在一个 wrapper 里。
        // docx-preview 默认是一个长滚动视图，但如果设置了 breakPages: true，它会有分页效果。
        
        // 为了最好的 PDF 效果，我们尝试截取整个 wrapper，让 html2pdf 处理分页
        const element = previewContainer.querySelector('.docx-wrapper') || previewContainer;
        
        // 配置 html2pdf 选项
        const opt = {
            margin:       [10, 10], // 上下左右边距
            filename:     'converted.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { 
                scale: 2, 
                useCORS: true,
                scrollY: 0,
                // 尝试解决空白问题：增加 logging 方便调试，去除背景色
                logging: true,
                backgroundColor: '#ffffff'
            },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
            // 智能分页
            pagebreak: { mode: ['css', 'legacy'] } 
        };

        // 显示正在处理的提示
        const originalText = downloadBtn.innerText;
        downloadBtn.innerText = '生成中...';
        downloadBtn.disabled = true;

        // 临时调整样式以适应打印
        const originalOverflow = element.style.overflow;
        const originalHeight = element.style.height;
        element.style.overflow = 'visible'; // 确保内容不被裁剪
        element.style.height = 'auto';

        html2pdf().set(opt).from(element).save().then(() => {
            downloadBtn.innerText = originalText;
            downloadBtn.disabled = false;
            // 恢复样式
            element.style.overflow = originalOverflow;
            element.style.height = originalHeight;
        }).catch(err => {
            console.error(err);
            alert('PDF 生成失败');
            downloadBtn.innerText = originalText;
            downloadBtn.disabled = false;
            // 恢复样式
            element.style.overflow = originalOverflow;
            element.style.height = originalHeight;
        });
    });
});
