# one-page-pdf

A tool to generate single page PDFs from URLs.

## Usage

```sh
npx one-page-pdf <url> <output>
```

## API

You can also use this package programmatically in your Node.js application.

### Example

```javascript
import { generateSinglePagePDF } from 'one-page-pdf';

const url = 'https://example.com';

const pdfData = generateSinglePagePDF(url) // returns Uint8Array
// do something with the pdfData? write to file or whatever you like...
```

## License

MIT

## Author

YCM Jason
