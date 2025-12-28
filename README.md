# Istuall's Website

This project is a personal website hosted on GitHub Pages.

## Directory Structure

- **assets/**: Static assets.
  - `config/`: Configuration files (JSON).
  - `fonts/`: Font files.
  - `images/`: Images and icons.
- **components/**: Web Components (Custom Elements).
  - `navbar.js`: Main navigation bar.
  - `toolbar.js`: Floating toolbar (Music, Video, etc.).
  - `home-toolbar.js`: Back-to-home navigation for sub-projects.
  - `video-background.js`: Background video component.
- **pages/**: Main website pages.
  - `about/`: About page.
  - `blog/`: Blog pages.
  - `home/`: Home page styles (HTML is at root `index.html`).
  - `papers/`: Exhibition/Gallery pages.
- **works/**: Standalone sub-projects.
  - `web-origin/`: Web起源.
  - `casio-calculator/`: Gasio计算器.
  - `little-tay/`: 小Tay.
  - `orange-christmas/`: 橘子和圣诞树.
  - `form-embed/`: 表单嵌入.
  - `page-layout/`: 页面布局.

## Development

This is a static site. You can serve it with any static file server.

```bash
# Example with python
python -m http.server
```

## Refactoring Notes

- Consolidated `about-toolbar.js` and `papers-toolbar.js` into `toolbar.js`. Use `<tool-bar mode="simple">` for restricted features.
- Standardized directory naming (kebab-case).
- Used absolute paths for assets to ensure links work from any depth.
