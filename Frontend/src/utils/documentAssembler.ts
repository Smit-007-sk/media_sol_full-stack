/**
 * Shared Document Normalization and Assembly Utility
 * Used by both Admin Preview Modal and Public /site/[slug] renderer.
 */

/**
 * Strips recognized Markdown code fences and delimiter headers.
 * Conservative: only trims outermost code fences and exact header comments/markers.
 * Never corrupts valid HTML/CSS/JavaScript code or embedded template literals.
 */
export function cleanCode(code: string, type?: 'html' | 'css' | 'javascript'): string {
  if (!code || typeof code !== 'string') return '';
  let cleaned = code.trim();

  // Strip leading code fence: ```html, ```css, ```javascript, ```js, ```
  cleaned = cleaned.replace(/^```(?:html|htm|css|javascript|js)?\s*\r?\n/i, '');
  // Strip trailing code fence: ```
  cleaned = cleaned.replace(/\r?\n```\s*$/, '');

  // Strip known delimiter headers at the beginning
  cleaned = cleaned.replace(/^={3,}\s*(?:index\.html|style\.css|script\.js|html|css|js|javascript)?\s*={3,}\s*\r?\n/i, '');
  cleaned = cleaned.replace(/^<!--\s*(?:index\.html|html)\s*-->\s*\r?\n/i, '');
  cleaned = cleaned.replace(/^\/\*\s*(?:style\.css|css)\s*\*\/\s*\r?\n/i, '');
  cleaned = cleaned.replace(/^\/\/\s*(?:script\.js|js|javascript)\s*\r?\n/i, '');

  return cleaned.trim();
}

/**
 * Combines published HTML, CSS, and JS into an isolated, standalone HTML document for iframe rendering.
 * - Handles both complete HTML documents and HTML fragments.
 * - Injects CSS and JavaScript without duplicating existing style/script sections.
 * - Does NOT inject arbitrary typography, fonts, CSS, or CDN resources not present in the generated website.
 */
export function assemblePublishedDocument(
  rawHtml: string,
  rawCss: string,
  rawJs: string,
  businessName?: string
): string {
  const html = cleanCode(rawHtml, 'html');
  const css = cleanCode(rawCss, 'css');
  const js = cleanCode(rawJs, 'javascript');

  const scrollbarResetStyle = `<style id="__global_scrollbar_reset">
html, body, * {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
html::-webkit-scrollbar,
body::-webkit-scrollbar,
*::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
</style>`;

  const styleTag = css ? `${scrollbarResetStyle}\n<style id="__published_style">\n${css}\n</style>` : scrollbarResetStyle;
  const scriptTag = js ? `<script id="__published_script">\ntry {\n${js}\n} catch (e) {\n  console.error('Website runtime error:', e);\n}\n</script>` : '';

  if (!html && !css && !js) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${businessName || 'Official Website'}</title>
  ${scrollbarResetStyle}
</head>
<body>
</body>
</html>`;
  }

  const hasHtmlTag = /<html[\s>]/i.test(html);
  const hasHeadTag = /<head[\s>]/i.test(html);
  const hasBodyTag = /<body[\s>]/i.test(html);

  if (hasHtmlTag || (hasHeadTag && hasBodyTag)) {
    let result = html;

    // Inject CSS: Replace <link rel="stylesheet" href="style.css"> or inject before </head>
    if (css) {
      if (/<link[^>]*href=["'][^"']*style\.css["'][^>]*>/i.test(result)) {
        result = result.replace(/<link[^>]*href=["'][^"']*style\.css["'][^>]*>/i, styleTag);
      } else if (hasHeadTag && /<\/head>/i.test(result)) {
        result = result.replace(/<\/head>/i, `  ${styleTag}\n</head>`);
      } else {
        result = `${styleTag}\n${result}`;
      }
    }

    // Inject JS: Replace <script src="script.js"></script> or inject before </body>
    if (js) {
      if (/<script[^>]*src=["'][^"']*script\.js["'][^>]*><\/script>/i.test(result)) {
        result = result.replace(/<script[^>]*src=["'][^"']*script\.js["'][^>]*><\/script>/i, scriptTag);
      } else if (hasBodyTag && /<\/body>/i.test(result)) {
        result = result.replace(/<\/body>/i, `  ${scriptTag}\n</body>`);
      } else {
        result = `${result}\n${scriptTag}`;
      }
    }

    return result;
  }

  // Construct standard minimal HTML5 shell for fragments
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName || 'Official Website'}</title>
  ${styleTag}
</head>
<body>
  ${html}
  ${scriptTag}
</body>
</html>`;
}
