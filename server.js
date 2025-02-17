const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const marked = require('marked');

const app = express();
const port = process.env.PORT || 8000;

// Configure marked options
marked.setOptions({
    highlight: function(code, lang) {
        return code;
    },
    gfm: true,
    breaks: true,
    headerIds: true,
    mangle: false
});

// Middleware to handle markdown files
app.get('**/*.md', async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, req.path);
        const content = await fs.readFile(filePath, 'utf-8');
        const htmlContent = marked.parse(content);

        // Basic HTML template with some styling
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${path.basename(req.path, '.md')}</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css">
                <style>
                    .markdown-body {
                        box-sizing: border-box;
                        min-width: 200px;
                        max-width: 980px;
                        margin: 0 auto;
                        padding: 45px;
                    }

                    @media (max-width: 767px) {
                        .markdown-body {
                            padding: 15px;
                        }
                    }

                    pre {
                        background-color: #f6f8fa;
                        border-radius: 6px;
                        padding: 16px;
                        overflow: auto;
                    }

                    code {
                        background-color: rgba(175,184,193,0.2);
                        border-radius: 6px;
                        padding: 0.2em 0.4em;
                        font-size: 85%;
                    }

                    pre code {
                        background-color: transparent;
                        padding: 0;
                    }
                </style>
            </head>
            <body>
                <article class="markdown-body">
                    ${htmlContent}
                </article>
            </body>
            </html>
        `;

        res.send(html);
    } catch (err) {
        next(err);
    }
});

// Serve static files
app.use(express.static('.'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 