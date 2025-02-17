const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const marked = require('marked');

const app = express();
const port = process.env.PORT || 8000;

// Serve static files
app.use(express.static('.'));

// Middleware to handle markdown files
app.use(async (req, res, next) => {
    if (!req.path.endsWith('.md')) {
        return next();
    }

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
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    pre {
                        background-color: #f6f8fa;
                        padding: 16px;
                        border-radius: 6px;
                        overflow-x: auto;
                    }
                    code {
                        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
                        font-size: 85%;
                        background-color: #f6f8fa;
                        padding: 0.2em 0.4em;
                        border-radius: 3px;
                    }
                    pre code {
                        background-color: transparent;
                        padding: 0;
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                    }
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        margin: 1em 0;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f6f8fa;
                    }
                    blockquote {
                        margin: 0;
                        padding-left: 1em;
                        border-left: 4px solid #ddd;
                        color: #666;
                    }
                </style>
            </head>
            <body>
                ${htmlContent}
            </body>
            </html>
        `;

        res.send(html);
    } catch (err) {
        next(err);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 